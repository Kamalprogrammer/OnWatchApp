import express from "express"
import cors from "cors"
import cookieParser from 'cookie-parser'
import userRouter from "./routes/user.routes.js"
const app = express()


// configuration of cors

// Hear more about is using documentation
app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))

app.use(express.json({ limit: '16kb' }))
app.use(express.urlencoded({ extended: true, limit: '16kb' }))
app.use(express.static("public"))
app.use(cookieParser())


// import routes 
console.log(" Routes mounted: /api/v1/users");
console.log("✅ userRouter registered");
// routes declaration only 
app.use("/api/v1/users", userRouter);
export { app }

app.get("/", (req, res) => {
  res.send("✅ Backend is running successfully!");
});


// sample Url: http://localhost:8000//api/v1/users/register























// import express from "express"
// import cors from "cors"
// import cookieParser from 'cookie-parser'
// const app = express()


// app.use(cors({
//     origin: process.env.CORS_ORIGIN,
//     credentials: true
// }))


// app.use(express.json({ limit: '16kb' }))
// app.use(express.urlencoded({ extended: true, limit: '16kb' }))
// app.use(express.static("public"))
// app.use(cookieParser())


// // routes import
// import userRouter from './routes/user.routes.js'


// app.use("/api/v1/users", userRouter)
// app.get("/", (req, res) => {
//   res.send("✅ Backend is running successfully!");
// });
// export { app }