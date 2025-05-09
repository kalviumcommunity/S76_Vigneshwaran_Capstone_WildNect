import React, { useState } from 'react'
import { Eye, EyeOff } from 'lucide-react'
import nature from '../assets/images/nature.gif'
import butterfly from '../assets/images/butterfly.gif'

const SignUP = () => {
  const [showPassword, setShowPassword] = useState(false)

  const togglePassword = () => setShowPassword((prev) => !prev)

  return (
    <div className="flex justify-center items-center h-screen w-screen relative overflow-hidden">
      {/* Background */}
      <img
        src={nature}
        alt="nature"
        className="w-full h-full object-cover absolute inset-0 z-0"
      />

      {/* Form Card */}
      <div className="flex flex-col items-center justify-center w-[450px] h-[520px] bg-white/70 backdrop-blur-md rounded-xl z-10 relative">
        {/* Butterfly */}
        <img
          src={butterfly}
          alt="butterfly"
          className="absolute w-[150px] h-[150px] -top-20 right-[-40px]"
        />

        {/* Heading */}
        <h1
          className="text-5xl sm:text-6xl md:text-4xl font-bold text-green-600 uppercase mb-8"
          style={{ textShadow: '2px 3px 1px black' }}
        >
          Sign In
        </h1>

        {/* Form Fields */}
        <div className="flex flex-col gap-4 w-80">
          <div className="flex flex-col gap-2">
            <label htmlFor="username" className="text-black text-xl">
              Username:
            </label>
            <input
              id="username"
              type="text"
              className="w-full h-10 p-2 text-black text-lg rounded-md bg-white border-2"
              placeholder="Enter your username"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="email" className="text-black text-xl">
              Email:
            </label>
            <input
              id="email"
              type="email"
              className="w-full h-10 p-2 text-black text-lg rounded-md bg-white border-2"
              placeholder="Enter your email"
            />
          </div>

          <div className="flex flex-col gap-2 relative ">
            <label htmlFor="password" className="text-black text-xl">
              Password:
            </label>
            <input
              id="password"
              type={showPassword ? 'text' : 'password'}
              className="w-full h-10 p-2 text-black text-lg rounded-md pr-10 bg-white border-2"
              placeholder="Enter your password"
            />
            <div
              className="absolute right-2 top-[44px] cursor-pointer text-gray-700 flex items-center justify-center"
              onClick={togglePassword}
            >
              {showPassword ? <EyeOff size={24} /> : <Eye size={24} />}
            </div>
          </div>

          <button className="mt-4 h-12 w-full bg-green-600 hover:bg-green-700 text-white text-xl font-semibold rounded-md transition duration-300">
            Sign In
          </button>

          <p>Don't have an account?<span> <a href="/signup" className="text-green-600 font-bold underline">Sign Up</a></span></p>
        </div>
      </div>
    </div>
  )
}

export default SignUP