import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js"
import { User } from "../modles/user.model.js"
import { uploadOnCludinary } from "../utils/cloudinary.js"
import { ApiResponse } from "../utils/ApiResponse.js"
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
    console.log("email : ", email);

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



    // 3. Check User is regiiterd before or not 
    const existedUser = User.findOne({
        $or: [{ userName }, { email }]
    })
    // console.log(existedUser)
    if (existedUser) {
        throw new ApiError(409, "User Email or UserName already exists")
    }

    // 4. Checking file 
    const avatarLocalPath = req.files?.avatar[0]?.path;
    const coverImageLocalPath = req.files?.coverImage[0]?.path;

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
    const createdUser = await user.findById(user._id).select(
        "-password -refreshToken " //jo hme nahi chahiye 
    )

    if (!createdUser) {
        throw new ApiError(500, "Something went wrong while registering the user")
    }


    // response Return
    return res.status(201).json(
        new ApiResponse(200, createdUser, "User Registerd Successfully Woyaa")
    )

})

export { registerUser };

