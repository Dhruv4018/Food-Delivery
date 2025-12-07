import express from "express"
import dotenv from "dotenv"
dotenv.config()
import cors from "cors"
import connectDB from "./config/db.js"
import authRouter from "./routes/auth.route.js"
import cookieParser from "cookie-parser"
import userRouter from "./routes/user.routes.js"
import shopRouter from "./routes/shop.route.js"
import itemRouter from "./routes/item.route.js"
import orderRouter from "./routes/order.route.js"
import http from "http"
import { Server } from "socket.io"
import { socketHandler } from "./socket.js"

const app = express()
const server = http.createServer(app)


const io = new Server(server, {
    cors:{
    origin: "http://localhost:5173",
    credentials: true,
    methods:["POST","GET"]

}
})


app.set("io",io)





app.use(cors({
    origin: "http://localhost:5173",
    credentials: true

}))
const port = process.env.PORT || 5000
app.use(express.json())
app.use(cookieParser())

app.use("/api/auth", authRouter)
app.use("/api/user", userRouter)
app.use("/api/shop", shopRouter)
app.use("/api/item", itemRouter)
app.use("/api/order",orderRouter)

app.get("/", (req, res) => {
    res.json("hello bahi")
})
 socketHandler(io)
server.listen(port, () => {
    connectDB()
    console.log("server is running ", port);

})
