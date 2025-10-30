import React, { useState } from 'react'
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa'
import { FcGoogle } from "react-icons/fc"
import { useNavigate } from 'react-router-dom';
import axios from "axios"
import { serverUrl } from '../App';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from '../../firebase';
import { ClipLoader } from 'react-spinners';
import { useDispatch } from 'react-redux';
import { setUserData } from '../redux/userSlice';
const SignIn = () => {
  const primaryColor = "#ff4d2d";
  const bgColor = "#fff9f6";
  const borderColor = "#ddd";
  const [showPassword, setShowPassword] = useState(false)
  const [err, setErr] = useState("")
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const dispatch = useDispatch()


  const handleSignIn = async () => {
    setLoading(true)
    try {
      const result = await axios.post(`${serverUrl}/api/auth/signin`, {
        email, password
      }, { withCredentials: true })
      dispatch(setUserData(result.data))
      setErr("")
      setLoading(false)

    } catch (error) {
      setErr(error?.response?.data?.message)
      setLoading(false)

    }
  }
  const handleGoogleAuth = async () => {

    const provider = new GoogleAuthProvider()
    const result = await signInWithPopup(auth, provider)
    try {
      const { data } = await axios.post(`${serverUrl}/api/auth/google-auth`, {

        email: result.user.email,

      }, { withCredentials: true })
       dispatch(setUserData(data))
    } catch (error) {
      setErr(error?.response?.data?.message)

    }
  }

  return (
    <div className="min-h-screen w-full flex items-center justify-center p-4" style={{ backgroundColor: bgColor, }}>
      <div className={`bg-white rounded-xl shadow-lg w-full max-w-md p-8 border-[1px] border-[${borderColor}]`}>
        <h1 className={`text-3xl font-bold mb-2 `} style={{ color: primaryColor, }}>
          Gold Food
        </h1>
        <p className="text-gray-600 mb-8">
          Sign in your account to get started delicious food deliveries
        </p>


        {/* Email */}
        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-gray-700 font-medium mb-1"
          >
            Email
          </label>
          <input
            type="email"
            className="w-full border rounded-lg px-3 py-2 focus:outline-none"
            placeholder="Enter your Email"
            style={{ border: `1px solid ${borderColor}` }}
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>


        {/* Password */}
        <div className='mb-4'>
          <label htmlFor="password" className='block text-gray-700 font-medium mb-1'>
            Password
          </label>
          <div className='relative'>
            <input type={`${showPassword ? "text" : "password"}`} className='w-full border rounded-lg px-3 py-2 focus:outline-none ' placeholder='Enter your password' style={{ border: `1px solid ${borderColor}` }}
              onChange={(e) => setPassword(e.target.value)}
              value={password} required />
            <button className='absolute cursor-pointer  right-3 top-[15px] text-gray-500' onClick={() => setShowPassword(prev => !prev)}>{!showPassword ? <FaRegEye /> : <FaRegEyeSlash />}</button>
          </div>

        </div>
        <div className='text-right mb-4 text-[#ff4d2d] cursor-pointer'
          onClick={() => navigate("/forgot-password")}
        >
          Forget password
        </div>



        <button className={`w-full mt-4 flex font-semibold items-center cursor-pointer justify-center gap-2 border rounded-lg px-4 py-2 transition duration-200 bg-[#ff4d2d] text-white hover:bg-[#e64323] `} style={{ backgroundColor: primaryColor, color: "white" }}
          onClick={handleSignIn}
          disabled={loading}
        >
          {loading ? <ClipLoader size={20} color='white' /> : "Sign In"}

        </button >
        {err && <p className='text-red-500 text-center my-[10px]'>*{err}</p>}

        <button className='w-full mt-4 flex items-center justify-center gap-2 border rounded-lg px-4 py-2 transition duration duration-200 border-gray-500 cursor-pointer hover:bg-gray-200 '
          onClick={handleGoogleAuth}
        >
          <FcGoogle size={20} />
          <span>Sign In With Google</span>
        </button>
        <p className='text-center mt-6 cursor-pointer' onClick={() => navigate("/signup")}>Want to create a new account ? <span className='text-[#ff4d2d]'>Sign Up</span></p>





      </div>

    </div>
  )
}

export default SignIn