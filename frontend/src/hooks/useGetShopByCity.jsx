import axios from 'axios'
import React, { useEffect } from 'react'
import { serverUrl } from '../App'
import { useDispatch, useSelector } from 'react-redux'
import { setShopMyCity } from '../redux/userSlice'

const useGetShopByCity = () => {
    const dispatch = useDispatch()
    const { currentcity } = useSelector(state => state.user)
    useEffect(() => {
        const fetchShops = async () => {
            try {
                const result = await axios.get(`${serverUrl}/api/shop/get-by-city/${currentcity}`,
                    { withCredentials: true })
                dispatch(setShopMyCity(result.data))
                console.log(result.data);
            } catch (error) {
                console.log(error);

            }
        }
        fetchShops()
    }, [currentcity])
}


export default useGetShopByCity