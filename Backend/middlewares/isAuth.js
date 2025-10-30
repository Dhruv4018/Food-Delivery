import jwt from "jsonwebtoken"
const isAuth = (req, res, next) => {
    try {
        const token = req.cookies.token
        if (!token) {
            return res.status(400).json({ message: "Token not found" })
        }
        const decodeToken = jwt.verify(token, process.env.JWT_SECRET)
        if (!decodeToken) {
            return res.status(400).json({ message: "token not verify" })
        }
        
        req.userId = decodeToken.userId
        next()
    } catch (error) {
        return res.status(500).json({ message: "Token error " })

    }

}

export default isAuth