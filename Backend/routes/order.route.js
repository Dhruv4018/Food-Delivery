import express from "express"
import isAuth from "../middlewares/isAuth.js";
import { acceptOrder, getCurrentOrder, getDeliveryAssignment, getMyOrders, getOrderById, getTodayDeliveries, placeOrder, sendDeliveryOTP, updateOrderStatus, verifyDeliveryOtp, verifyPayment } from "../controllers/order.controller.js";
const orderRouter = express.Router()

orderRouter.post("/place-order", isAuth, placeOrder)
orderRouter.post("/verify-payment", isAuth, verifyPayment)

orderRouter.get("/my-orders", isAuth, getMyOrders)
orderRouter.post("/send-delivery-otp", isAuth, sendDeliveryOTP)
orderRouter.post("/verify-delivery-otp", isAuth, verifyDeliveryOtp)
orderRouter.get("/get-assignments", isAuth, getDeliveryAssignment)

orderRouter.post("/update-status/:orderId/:shopId", isAuth, updateOrderStatus)
orderRouter.get('/accept-order/:assignmentId', isAuth, acceptOrder)
orderRouter.get('/get-current-order', isAuth, getCurrentOrder)


orderRouter.get('/get-order-by-id/:orderId', isAuth, getOrderById)
orderRouter.get('/get-today-deliveries', isAuth, getTodayDeliveries)




export default orderRouter;