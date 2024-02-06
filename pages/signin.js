import { useState, useEffect } from 'react'
import Image from 'next/image'
import { EnvelopeIcon, KeyIcon } from '@heroicons/react/24/solid'
import { XCircleIcon } from '@heroicons/react/24/outline'
import Navbar from './component/Navbar'

export default function Signin({ onUserLogin, onClose }) {
  const [isChecked, setChecked] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [userData, setUserData] = useState([])
  const handleCheckboxChange = () => {
    setChecked(!isChecked)
  }

  const handleClose = () => {
    // Call the onClose callback passed from Navbar
    if (onClose) {
      onClose()
    }
    // Additional logic for closing the Signin component
  }

  const handleLogin = async () => {
    console.log(JSON.stringify({ email, password }))
    try {
      const response = await fetch(process.env.NEXT_PUBLIC_LOGIN_API, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      })
      const result = await response.json()
      setUserData(result)
      if(result.detail){
        console.log("please signin again")
      }else {
        onUserLogin(result)
      }
    } catch (error) {
      console.error('Error during login:', error)
    }
  }

  return (
    <>
      <div className="flex w-full h-screen bg-gray-200 items-center justify-center">
        <div className="flex-col w-3/5 bg-white justify-between space-x-10 container relative rounded-lg">
          <div
            className="flex items-center m-1 w-full cursor-pointer text-sm"
            onClick={handleClose}
          >
            <XCircleIcon className=" h-6 w-6 mr-1" />
          </div>
          <div className="flex space-x-10 mb-11 mx-11 mt-8">
            <div className="w-full flex-col">
              <div className=" w-full h-5/6 container relative object-cover">
                <Image
                  src={'/Image/LoginImg.jpeg'}
                  alt="Image in Login Page"
                  fill
                  style={{ objectFit: 'cover' }}
                  className=" rounded-md"
                />
              </div>
              <a
                href="/signup"
                className="text-sm w-full justify-center flex mt-4 cursor-pointer underline"
              >
                Don't have account? Sign Up
              </a>
            </div>
            <div className=" w-full">
              <div className=" text-4xl font-bold">Sign In</div>
              <div className=" mt-10 space-y-6">
                <div className="flex items-center">
                  <EnvelopeIcon className="absolute w-5 h-5 z-10 ml-2 " />
                  <input
                    type="text"
                    placeholder="Email"
                    className="h-11 w-5/6 pl-10 pr-4 border-b border-gray-600 rounded-lg drop-shadow outline-none"
                    onChange={(e) => setEmail(e.target.value)}
                  ></input>
                </div>
                <div className="flex items-center">
                  <KeyIcon className="absolute w-5 h-5 z-10 ml-2 " />
                  <input
                    type="password"
                    placeholder="Password"
                    className="h-11 w-5/6 pl-10 pr-4 border-b border-gray-600 rounded-lg drop-shadow outline-none"
                    onChange={(e) => setPassword(e.target.value)}
                  ></input>
                </div>
              </div>
              <div className=" pl-4 flex space-x-3 mt-6 border-gray-500">
                <input
                  type="checkbox"
                  checked={isChecked}
                  onChange={handleCheckboxChange}
                  className=""
                />
                <div className=" text-sm text-gray-700">Remember me</div>
              </div>
              <div className="flex mt-10 items-center space-x-7 w-5/6">
                <div
                  className="text-sm cursor-pointer w-2/6 h-11 bg-cyan-600 hover:bg-cyan-700 duration-500 flex justify-center items-center text-white rounded-lg"
                  onClick={handleLogin}
                >
                  Sign In
                </div>

                <div className=" text-sm underline cursor-pointer hover:text-red-500 duration-300">
                  Forget your password?
                </div>
              </div>
            </div>
          </div>
          <div className=""></div>
        </div>
      </div>
    </>
  )
}
