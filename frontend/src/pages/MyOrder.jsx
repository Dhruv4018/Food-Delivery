import React, { useEffect } from 'react'
import { IoIosArrowRoundBack } from 'react-icons/io'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import UserOrderCart from '../components/UserOrderCart'
import OwnerOrderCart from '../components/OwnerOrderCart'
import { setMyOrders, updateRealtimeOrderStatus } from '../redux/userSlice'

const MyOrder = () => {
  const navigate = useNavigate()
  const { userData, myOrders, socket } = useSelector(state => state.user)

  const dispatch = useDispatch()


  useEffect(() => {
    socket?.on('newOrder', (data) => {
      if (data.shopOrders?.owner._id == userData._id) {
        dispatch(setMyOrders([data, ...myOrders]))
      }
    })

    socket?.on('update-status', ({ orderId, shopId, status, userId }) => {
      if (userId == userData._id) {
        dispatch(updateRealtimeOrderStatus({ orderId, shopId, status }))
      }
    })

    return () => {
      socket?.off('newOrder')
      socket?.off('update-status')
    }
  }, [socket])




  return (
    <div className='w-full main-h-screen bg-[#fff9f6] flex justify-center px-4'>
      <div className='w-full max-w-[800px] p-4'>
        <div className='flex items-center gap-[20px] mb-6 '>
          <div className=' top-[20px] left-[20px] z-[10 ] cursor-pointer' onClick={() => navigate("/")}>
            <IoIosArrowRoundBack size={35} className='text-[#ff4d2d]' />
          </div>
          <h1 className='text-2xl font-bold text-start'>My Orders</h1>
        </div>
        <div className='space-y-6'>
          {/* {userData.role == "user" && } */}
          {myOrders?.map((order, index) => (
            userData.role == "user" ? (
              <UserOrderCart data={order} key={index} />
            ) : userData.role == "owner" ? (
              <OwnerOrderCart data={order} key={index} />
            ) :
              null
          ))}
        </div>

      </div>
    </div>
  )
}

export default MyOrder