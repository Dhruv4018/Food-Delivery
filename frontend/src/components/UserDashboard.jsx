import React, { useEffect, useRef, useState } from 'react'

import Nav from './Nav'
import CategoryCard from './CategoryCard'
import { categories } from '../category'
import { FaCircleChevronLeft, FaCircleChevronRight } from 'react-icons/fa6'
import { useSelector } from 'react-redux'
import FoodCard from './FoodCard'
import { useNavigate } from 'react-router-dom'



const UserDashboard = () => {
  const navigate = useNavigate()

  const { currentcity, shopInMyCity, itemsInMyCity, searchItems } = useSelector(state => state.user)

  const cateScrollleftRef = useRef()
  const [updatedItemsList, setUpdatedItemsList] = useState([])
  const ShopScrollRef = useRef()
  const [showCateLeftButton, setShowCateLeftButton] = useState(false)
  const [showCateRightButton, setShowCateRightButton] = useState(false)
  const [showShopLeftButton, setShowShopLeftButton] = useState(false)
  const [showShopRightButton, setShowShopRightButton] = useState(false)


  const handleFilterByCategory = (category) => {
    if (category == "All") {
      setUpdatedItemsList(itemsInMyCity)
    } else {
      const filterList = itemsInMyCity?.filter(i => i.category === category)
      setUpdatedItemsList(filterList)
    }
  }





  useEffect(() => {
    setUpdatedItemsList(itemsInMyCity)
  }, [itemsInMyCity])



  const updateButton = (ref, setLeftButton, setRightButton) => {
    const element = ref.current
    if (element) {
      setLeftButton(element.scrollLeft > 0)
      setRightButton(element.scrollLeft + element.clientWidth < element.scrollWidth)
    }
  }

  const scrollHandler = (ref, direction) => {
    if (ref.current) {
      ref.current.scrollBy({
        left: direction === "left" ? -200 : 200,
        behavior: "smooth"
      })
    }
  }

  useEffect(() => {
    const cateHandler = () => updateButton(cateScrollleftRef, setShowCateLeftButton, setShowCateRightButton)
    const shopHandler = () => updateButton(ShopScrollRef, setShowShopLeftButton, setShowShopRightButton)

    if (cateScrollleftRef.current) {
      updateButton(cateScrollleftRef, setShowCateLeftButton, setShowCateRightButton)
      updateButton(ShopScrollRef, setShowShopLeftButton, setShowShopRightButton)

      cateScrollleftRef.current.addEventListener('scroll', cateHandler)
      ShopScrollRef.current.addEventListener('scroll', shopHandler)
    }

    return () => {
      cateScrollleftRef?.current?.removeEventListener("scroll", cateHandler)
      ShopScrollRef.current?.removeEventListener("scroll", shopHandler)
    }
  }, [])

  return (
    <div className='w-screen min-h-screen flex flex-col gap-5 items-center bg-[#fff9f6] overflow-auto'>
      <Nav />

      {searchItems && searchItems.length > 0 && <div className='w-full max-w-6xl flex flex-col gap-5 items-start p-5 bg-white shadow-md rounded-2xl mt-4'>
        <h1 className='text-gray-900 text-2xl sm:text-3xl font-semibold border-b border-gray-200 pb-2'>
          Search Results
        </h1>
        <div className='w-full h-auto flex flex-wrap gap-6 justify-center'>
          {searchItems.map((item) => (
            <FoodCard data={item} key={item._id} />
          ))}
        </div>
      </div>}

      {/* Categories Section */}
      <div className='w-full max-w-6xl flex flex-col gap-5 items-start p-[10px]'>
        <h1 className='text-gray-800 text-2xl sm:text-3xl'>Inspiration for your first order</h1>
        <div className='w-full relative'>
          {showCateLeftButton &&
            <button
              className='absolute left-0 top-1/2 -translate-y-1/2 bg-[#ff4d2d] text-white p-2 rounded-full shadow-lg hover:bg-[#e64528] z-10 cursor-pointer'
              onClick={() => scrollHandler(cateScrollleftRef, "left")}
            >
              <FaCircleChevronLeft />
            </button>}

          <div className='w-full flex overflow-x-auto gap-4 pb-2' ref={cateScrollleftRef}>
            {categories?.map((cate, index) => (
              <CategoryCard key={index} name={cate.category} image={cate.image} onClick={() => handleFilterByCategory(cate.category)} />
            ))}
          </div>

          {showCateRightButton &&
            <button
              className='absolute right-0 top-1/2 -translate-y-1/2 bg-[#ff4d2d] text-white p-2 rounded-full shadow-lg hover:bg-[#e64528] z-10 cursor-pointer'
              onClick={() => scrollHandler(cateScrollleftRef, "right")}
            >
              <FaCircleChevronRight />
            </button>}
        </div>
      </div>

      {/* Shops Section */}
      <div className='w-full max-w-6xl flex flex-col gap-5 items-start p-[10px]'>
        <h1 className='text-gray-800 text-2xl sm:text-3xl'>Best Shop in {currentcity}</h1>
        <div className='w-full relative'>
          {showShopLeftButton &&
            <button
              className='absolute left-0 top-1/2 -translate-y-1/2 bg-[#ff4d2d] text-white p-2 rounded-full shadow-lg hover:bg-[#e64528] z-10 cursor-pointer'
              onClick={() => scrollHandler(ShopScrollRef, "left")}
            >
              <FaCircleChevronLeft />
            </button>}

          <div className='w-full flex overflow-x-auto gap-4 pb-2' ref={ShopScrollRef}>
            {shopInMyCity?.map((shop, index) => (
              <CategoryCard key={index} name={shop.name} image={shop.image} onClick={() => navigate(`/shop/${shop._id}`)} />
            ))}
          </div>

          {showShopRightButton &&
            <button
              className='absolute right-0 top-1/2 -translate-y-1/2 bg-[#ff4d2d] text-white p-2 rounded-full shadow-lg hover:bg-[#e64528] z-10 cursor-pointer'
              onClick={() => scrollHandler(ShopScrollRef, "right")}
            >
              <FaCircleChevronRight />
            </button>}
        </div>
      </div>

      {/* Products  Section*/}
      <div className='w-full max-w-6xl flex flex-col gap-5 items-start p-[10px]'>
        <h1 className='text-gray-800 text-2xl sm:text-3xl'>Suggested Food Items</h1>

        <div className='w-full h-auto flex flex-wrap gap-[20px] justify-center'>
          {updatedItemsList?.map((item, index) => (
            <FoodCard key={index} data={item} />
          ))}
        </div>
      </div>

    </div>
  )
}

export default UserDashboard
