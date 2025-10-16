import express from "express"
import cors from "cors"
import cookieParser from 'cookie-parser'
const app = express()


// configuration of cors

// lear more about is using documentation
app.use(cors({
    origin:process.env.CORS_ORIGIN,
    credentials:true
}))


// when we need to accept the html body, forms etc 
// pahle body parser ka use karte the 
app.use(express.json({limit:'16kb'}))


// url  में जब हम Space  आदि देते है तो उसके अड्रेस में %20 एस आता है इसए सॉल्वे करने के लिए 
// हम इसका उपयोग करते है 

app.use(express.urlencoded({extended:true,limit:'16kb'}))

// file like images, pdf ko store krne ke liye folder public bna dete hei 
app.use(express.static)

// cookis par crud operation karne ke liye cookie parser ka use kate hei 

app.use(cookieParser())

export { app }