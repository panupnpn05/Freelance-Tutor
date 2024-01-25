import { useState } from "react"
import Image from "next/image";
import {EnvelopeIcon, KeyIcon, ArrowLeftIcon} from '@heroicons/react/24/solid'

export default function Signin() {
    const [isChecked, setChecked] = useState(false);
    const handleCheckboxChange = () => {
        setChecked(!isChecked);
      };

    const loginbtn = () => {
        console.log("this is btn")
    }

  return (
    <div className="flex w-full h-screen bg-gray-200 items-center justify-center">
      <div className="w-3/5 h-3/5">
      <div className="flex w-full h-full bg-white justify-between p-12 space-x-10">
        <div className="w-full flex-col">
          <div className=" w-full h-5/6 container relative object-cover">
            <Image src={"/Image/LoginImg.jpg"} alt="Image in Login Page" fill style={{objectFit: "cover"}} className=" rounded-md"/>
          </div>
          <div className="text-sm w-full justify-center flex mt-4 cursor-pointer underline">
            Don't have account? Sign Up
          </div>
        </div>
        <div className=" w-full">
          <div className=" text-4xl font-bold">Log In</div>
          <div className=" mt-10 space-y-6">
            <div className="flex items-center">
                <EnvelopeIcon className="absolute w-5 h-5 z-10 ml-2 "/>
              <input
                placeholder="Email"
                className="h-11 w-5/6 pl-10 pr-4 border-b border-gray-600 rounded-lg drop-shadow outline-none"
              ></input>
            </div>
            <div className="flex items-center">
                <KeyIcon className="absolute w-5 h-5 z-10 ml-2 "/>
              <input
                placeholder="Password"
                className="h-11 w-5/6 pl-10 pr-4 border-b border-gray-600 rounded-lg drop-shadow outline-none"
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
                <div className="text-sm cursor-pointer w-2/6 h-11 bg-cyan-600 hover:bg-cyan-700 duration-500 flex justify-center items-center text-white rounded-lg" onClick={loginbtn}>
            Log In
          </div>
          
          <div className=" text-sm underline cursor-pointer hover:text-red-500 duration-300">
            Forget your password?
          </div>
            </div>
          
        </div>
      </div>
      <div className="flex items-center justify-end mt-1 cursor-pointer text-sm">

      <ArrowLeftIcon className=" h-4 w-4 mr-1"/>
        Back to Home
      </div>
      </div>
      
    </div>
  )
}
