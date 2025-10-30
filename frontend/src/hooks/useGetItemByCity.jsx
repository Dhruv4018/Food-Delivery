import axios from 'axios'
import React, { useEffect } from 'react'
import { serverUrl } from '../App'
import { useDispatch, useSelector } from 'react-redux'
import { setItemsInMyCity } from '../redux/userSlice'

const useGetItemByCity = () => {
    const dispatch = useDispatch()
    const { currentcity } = useSelector(state => state.user)
    useEffect(() => {
        const fetchItems = async () => {
            try {
                const result = await axios.get(`${serverUrl}/api/item/get-by-city/${currentcity}`,
                    { withCredentials: true })
                dispatch(setItemsInMyCity(result.data))
                console.log(result.data);
            } catch (error) {
                console.log(error);

            }
        }
       fetchItems()
    }, [currentcity])
}


export default useGetItemByCity