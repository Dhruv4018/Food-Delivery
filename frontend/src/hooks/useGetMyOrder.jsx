import axios from 'axios'
import React, { useEffect } from 'react'
import { serverUrl } from '../App'
import { useDispatch, useSelector } from 'react-redux'


import { setMyOrders } from '../redux/userSlice'


const useGetMyOrder = () => {
    const dispatch = useDispatch()
    const { userData } = useSelector(state => state.user)
    useEffect(() => {
        const fetchOrder = async () => {
            try {
                const result = await axios.get(`${serverUrl}/api/order/my-orders`,
                    { withCredentials: true })
                dispatch(setMyOrders(result.data))
                console.log(result.data);


            } catch (error) {
                console.log(error);

            }
        }
        fetchOrder()
    }, [userData])
}


export default useGetMyOrder