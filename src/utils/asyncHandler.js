const asyncHandler = (requesHandler)=>{
    (req,res,next)=>{
        Promise.resolve(requesHandler(res,res,next)).
        catch((err)=>next(err))
    }
}

export {asyncHandler}

// const asyncHandler=()=>{}
// const asyncHandler = (fn)=>{()=>{}}

// const asyncHandler=(fn)=> async(req,res,next) =>{
//     try{
//         await fn(req,res,next)
//     }catch(error){
//         res.status(err.code || 500).json({
//             success:false,
//             message:err.message
//         })
//     }
// }