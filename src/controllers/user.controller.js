import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js"
import { User } from "../modles/user.model.js"
import { uploadOnCludinary } from "../utils/cloudinary.js"
import { ApiResponse } from "../utils/ApiResponse.js"

import jwt from "jsonwebtoken"

const generateAccessAndRefreshTokens = async (userId) => {
    try {
        const user = await User.findById(userId)
        // these are all methods
        const accessToken = user.generateAccessToken()
        const refreshToken = user.generateRefreshToken()

        // saving refreshToken to db
        user.refreshToken = refreshToken
        await user.save({ validateBeforeSave: false })

        return { accessToken, refreshToken }

    } catch (err) {
        throw new ApiError(500, "something went wrong while generating refresh and acess tokens")
    }
}





// register user 
const registerUser = asyncHandler(async (req, res) => {
    // res.status(200).json({
    //     message: "Kamal Vishwakarma"
    // })


    // registering user steps : 
    // 1. get Information from frontend (Data Model Mei check karna )
    // 2.Validation on data - Not Empty (Validation on daat )
    // 3. check if User already exists (userName, Email se )
    // 4 check Images, Check for Avatar 
    // 5. Upload them to cloudinary, avatar 
    // 
    // 6. create userObject - create Entry in DB(data object mei bnakar db mei enter krna )
    // After Registration User Information will be provided ot front end (Without Password, refresh token)
    // check for User Creation (Null or Not Created )
    // return Response 


    // url, form, body
    const { fullName, userName, email, password } = req.body
    // console.log("email : ", email);

    // 2. Validation in Input Fields 
    // simpel way 
    // if(fullName ===""){
    //     throw new ApiError(400,"Full Name is Requird")
    // }

    // efficient way 
    if (
        [fullName, email, userName, password].some((field) =>
            field?.trim() === "")
    ) {
        throw new ApiError(400, "All fields are mendatory")
    }



    // 3. Check User is registerd before or not 
    const existedUser = await User.findOne({
        $or: [{ userName }, { email }]
    })
    // console.log(existedUser)
    if (existedUser) {
        throw new ApiError(409, "User Email or UserName already exists")
    }

    // 4. Checking file 
    const avatarLocalPath = req.files?.avatar?.[0]?.path;
    // const coverImageLocalPath = req.files?.coverImg?.[0]?.path;
    // better way from this 
    let coverImageLocalPath;
    if (req.files && Array.isArray(req.files.coverImg) && req.files.coverImg.length > 0) {
        coverImageLocalPath = req.files.coverImg[0].path;
    }


    // console.log(req.files)
    //    minimum ke to honachaahiey 
    if (!avatarLocalPath) {
        throw new ApiError(400, "Avavtar File is requird")
    }


    // 5. Upload it On the Cloudinary 
    const avatar = await uploadOnCludinary(avatarLocalPath);
    const coverImg = await uploadOnCludinary(coverImageLocalPath);
    if (!avatar) {
        throw new ApiError(400, "Avatar file is Requird ")
    }

    // upload file into db 

    const user = await User.create({
        fullName,
        avatar: avatar.url,
        coverImg: coverImg?.url || "",
        email,
        password,
        userName: userName.toLowerCase()
    })
    // hm data se poochh rhe hei ye user bna hei ya nahi 
    const createdUser = await User.findById(user._id).select(
        "-password -refreshToken " //jo hme nahi chahiye 
    )

    if (!createdUser) {
        throw new ApiError(500, "Something went wrong while registering the user")
    }


    // response Return
    return res.status(201).json(
        new ApiResponse(200, createdUser, "User Registerd Successfully Woyaa")
    )
    // console.log("FILES:", req.files);
    // console.log("BODY:", req.body);

})





// steps for Login user: 
// 1. Get Data From User 
// 2. Encrpt it 
// 3. Save into database 
// 4. hash using jwt 
// 5. now send it to the front end using cookie Parser 
// 6. Compare it with the saved one 
// 7. Assign Page where we want to take user 




// 1. req.body
// 2. username or email se login karwana 
// 3. find the user 
// 4.. chceck the passowrd - nahi to notice 
// 5. access or refres token share krna 
// 6. send them into the front end in cookies (secure cokies)
// 7. send a response
// 8. set riute for it 


const loginUser = asyncHandler(async (req, res) => {
    const { email, username, password } = req.body
    console.log(email)
    // usign uername and email login
    // if(!email)
    // if (!username || !email)
    if (!username && !email) {
        throw new ApiError(400, "usernameor email is requird")
    }

    // check it into database (inmei se koi bhi mile )
    const user = await User.findOne({
        $or: [{ username }, { email }]
    })

    if (!user) {
        throw new ApiError(404, "User Does not exists")
    }

    // check our own user credentials 
    const isPasswordValid = await user.isPasswordCorrect(password)
    if (!isPasswordValid) {
        throw new ApiError(401, "Invalid User Credentials")
    }

    // now after this create Access And refresh token in seprate methode
    const { refreshToken, accessToken } = await generateAccessAndRefreshTokens(user._id)

    const loggedInUser = await User.findById(user._id).select("-password -refreshToken")

    const options = {
        httpOnly: true,
        secure: true
    }

    return res
        .status(200)
        .cookie("accessToken", accessToken, options)
        .cookie("refreshToken", refreshToken, options)
        .json(
            {
                //     200, {
                //     user: loggedInUser, accessToken, refreshToken
                // },
                //     "userLogged In Successfully"
                status: "success",
                message: "User Logged In Successfully",
                user: loggedInUser, accessToken, refreshToken
            });

})



// 1. remove cookeies 
// 2. refresh token ko remove karna 
const logoutUser = asyncHandler(async (req, res) => {
    User.findByIdAndUpdate(
        req.user._id,
        {
            $set: {
                refreshToken: undefined
            }
        },
        {
            new: true
            // ab ye isi nai velue ko return karega na ki purani jismeidata hoga 
        }
    )
    const options = {
        httpOnly: true,
        secure: true
    }

    return res
        .status(200)
        .clearCookie("accessToken", options)
        .clearCookie("refreshToken", options)
        .json(new ApiResponse(200, {}, "User Logged Out"))
})


//  3. getAgainSessionToken
const refreshAccessToken = asyncHandler(async (req, res) => {
    const icomenignRefreshToken = req.cookies.refreshToken || req.body.refreshToken

    if (!icomenignRefreshToken) {
        throw new ApiError(401, "Unauthorisied Request While Acessing Refresh Token")
    }

    // verify Token
    try {
        const decodedToken = jwt.verify(
            icomenignRefreshToken,
            process.env.REFRESH_TOKEN_SECRET
        )

        // get user 
        const user = await User.findById(decodedToken?._id)
        if (!user) {
            throw new ApiError(401, "Invalid refresh token, While Checking User through ID")
        }

        if (icomenignRefreshToken !== user?.refreshToken) {
            throw new ApiError(401, "Refresh Token Expired or Used")
        }

        // when both matched 

        const options = {
            httpOnly: true,
            secure: true
        }
        const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(user._id)
        return res
            .status(200)
            .cookie("accessToken", accessToken, options)
            .cookie("refreshToken", newRefreshToken, options)
            .json(
                200,
                { accessToken, refreshToken: newRefreshToken },
                "Access Token Refreshed"
            )
    } catch (error) {
        throw new ApiError(401, error?.message || "Invalid Refresh Token")
    }
})



export {
    registerUser,
    loginUser,
    logoutUser,
    refreshAccessToken
};

