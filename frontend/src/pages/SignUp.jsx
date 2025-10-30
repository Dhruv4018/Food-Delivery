import React, { useState } from 'react'
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa'
import { FcGoogle } from "react-icons/fc"
import { useNavigate } from 'react-router-dom';
import axios from "axios"
import { serverUrl } from '../App';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from '../../firebase';
import { ClipLoader } from "react-spinners"
import { useDispatch } from 'react-redux';
import { setUserData } from '../redux/userSlice';
const SignUp = () => {
    const primaryColor = "#ff4d2d";
    const bgColor = "#fff9f6";
    const borderColor = "#ddd";
    const [showPassword, setShowPassword] = useState(false)
    const [role, setRole] = useState("user")
    const navigate = useNavigate()
    const [fullName, setFullName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [mobile, setMobile] = useState("")
    const [err, setErr] = useState("")
    const [loading, setLoading] = useState(false)
    const dispatch = useDispatch()
    const handleSignUp = async () => {
        setLoading(true)
        try {
            const result = await axios.post(`${serverUrl}/api/auth/signup`, {
                fullName, email, password, mobile, role
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
        if (!mobile) {
            return setErr("Mobile no is required")
        }
        const provider = new GoogleAuthProvider()
        const result = await signInWithPopup(auth, provider)
        try {
            const { data } = await axios.post(`${serverUrl}/api/auth/google-auth`, {
                fullName: result.user.displayName,
                email: result.user.email,
                role,
                mobile
            }, { withCredentials: true })
            dispatch(setUserData(data))
            setErr("")
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
                    Create your account to get started delicious food deliveries
                </p>
                {/* Full Name */}
                <div className="mb-4">
                    <label
                        htmlFor="fullName"
                        className="block text-gray-700 font-medium mb-1"
                    >
                        Full Name
                    </label>
                    <input
                        type="text"
                        className="w-full border rounded-lg px-3 py-2 focus:outline-none"
                        placeholder="Enter your Name"
                        style={{ border: `1px solid ${borderColor}` }}
                        required
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}

                    />
                </div>
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
                {/* MOBLIC */}
                <div className="mb-4">
                    <label
                        htmlFor="mobile"
                        className="block text-gray-700 font-medium mb-1"
                    >
                        Mobile
                    </label>
                    <input
                        type="number"
                        className="w-full border rounded-lg px-3 py-2 focus:outline-none"
                        placeholder="Enter your Mobile Number"
                        style={{ border: `1px solid ${borderColor}` }}
                        required
                        value={mobile}
                        onChange={(e) => setMobile(e.target.value)}

                    />
                </div>
                {/* Password */}
                <div className='mb-4'>
                    <label htmlFor="password" className='block text-gray-700 font-medium mb-1'>
                        Password
                    </label>
                    <div className='relative'>
                        <input type={`${showPassword ? "text" : "password"}`} className='w-full border rounded-lg px-3 py-2 focus:outline-none ' placeholder='Enter your password' style={{ border: `1px solid ${borderColor}` }} onChange={(e) => setPassword(e.target.value)} value={password} required />
                        <button className='absolute cursor-pointer  right-3 top-[15px] text-gray-500' onClick={() => setShowPassword(prev => !prev)}>{!showPassword ? <FaRegEye /> : <FaRegEyeSlash />}</button>
                    </div>

                </div>
                {/* Role */}
                <div className='mb-4'>
                    <label htmlFor="Role" className='block text-gray-700 font-medium mb-1'>
                        Role
                    </label>
                    <div className='flex gap-2'>
                        {["user", "owner", "deliveryBoy"].map((r) => (
                            <button className='flex-1 border rounded-lg px-3 py-2 text-center font-medium 
                            transition-colors cursor-pointer'
                              key={r}
                                onClick={() => setRole(r)}
                                style={
                                    role == r ?
                                        { backgroundColor: primaryColor, color: "white" } : { border: ` 1px solid ${primaryColor}`, color: primaryColor }
                                }>{r}</button>
                        ))}

                    </div>
                    <div>
                        <button className={`w-full mt-4 flex font-semibold items-center cursor-pointer justify-center gap-2 border rounded-lg px-4 py-2 transition duration-200 bg-[#ff4d2d] text-white hover:bg-[#e64323] `} style={{ backgroundColor: primaryColor, color: "white" }}
                            onClick={handleSignUp}
                            disabled={loading}
                        >
                            {loading ? <ClipLoader size={20} color='white' /> : " Sign Up"}

                        </button >
                        {err && <p className='text-red-500 text-center my-[10px]'>*{err}</p>}
                        <button className='w-full mt-4 flex items-center justify-center gap-2 border rounded-lg px-4 py-2 transition duration duration-200 border-gray-500 cursor-pointer hover:bg-gray-200 '
                            onClick={handleGoogleAuth}
                        >
                            <FcGoogle size={20} />
                            <span>Sign Up With Google</span>
                        </button>
                        <p className='text-center mt-6 cursor-pointer' onClick={() => navigate("/signin")}>Already Have an Account ? <span className='text-[#ff4d2d]'>Sign in</span></p>
                    </div>

                </div>




            </div>

        </div>
    )
}

export default SignUp