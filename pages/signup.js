import Image from 'next/image'
import { useState } from 'react'
import { ArrowLeftIcon} from '@heroicons/react/24/solid'
import {XCircleIcon} from '@heroicons/react/24/outline'
import Swal from 'sweetalert2'

export default function Signup() {
  const [phoneNumber, setPhoneNumber] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [dob, setDob] = useState('')

  const formatDOB = (input) => {
    // Remove non-numeric characters from the input
    const numericInput = input.replace(/[^0-9/]/g, '')

    // Apply your desired format
    const formattedDOB = numericInput.replace(
      /(\d{2})(\d{2})(\d{4})/,
      '$1/$2/$3',
    )

    return formattedDOB
  }

  const handleDOBInputChange = (e) => {
    const input = e.target.value
    const formattedDOB = formatDOB(input)
    setDob(formattedDOB)
  }

  const formatPhoneNumber = (input) => {
    const numericInput = input.replace(/\D/g, '')

    const formattedNumber = numericInput.replace(
      /(\d{3})(\d{3})(\d{4})/,
      '$1-$2-$3',
    )

    return formattedNumber
  }

  const handleTelInputChange = (e) => {
    const input = e.target.value
    const formattedNumber = formatPhoneNumber(input)
    setPhoneNumber(formattedNumber)
  }

  const handleSignUp = async () => {
    const fullname = firstName + ' ' + lastName
    try {
      const response = await fetch(process.env.NEXT_PUBLIC_CREATE_USER_API, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ phoneNumber, fullname, email, password, dob }),
      })
      const result = await response.json()
      Swal.fire({
        title: 'Successful',
        text: 'Your signup successful',
        icon: 'success',
        confirmButtonText: "Ok",
      }).then((result) => {
        if (result.isConfirmed){
          window.location.href = '/';
        }
      })
    } catch (error) {
      Swal.fire({
        title: 'Sign up failed',
        text: 'Please wait a minute and try again',
        icon: 'error',
        confirmButtonText: "Ok",
      }).then((result) => {
        if (result.isConfirmed){
          window.location.href = '/';
        }
      }) 
      console.error('Error during create user', error)
    }
  }

  return (
    <div className=" w-full h-screen bg-gray-200 flex items-center justify-center">
      <div className="w-3/5 bg-white flex rounded-lg">
        <a href="/" className="flex justify-end absolute cursor-pointer m-1">
          <XCircleIcon className=" h-6 w-6 mr-1" />
        </a>
        <div className="w-full my-8 mx-8 space-y-5">
          <div className="text-3xl font-bold">Sign Up</div>
          <div className="flex justify-between space-x-3">
            <div className="w-full">
              <input
                type="text"
                placeholder="First Name"
                className="h-11 w-full pl-5 pr-4 border-b border-gray-600 rounded-lg drop-shadow outline-none"
                onChange={(e) => setFirstName(e.target.value)}
              ></input>
            </div>
            <div className=" w-full">
              <input
                type="text"
                placeholder="Last Name"
                className="h-11 w-full pl-5 pr-4 border-b border-gray-600 rounded-lg drop-shadow outline-none"
                onChange={(e) => setLastName(e.target.value)}
              ></input>
            </div>
          </div>
          <div className="">
            <input
              type="text"
              placeholder="Email"
              className="h-11 w-full pl-5 pr-4 border-b border-gray-600 rounded-lg drop-shadow outline-none"
              onChange={(e) => setEmail(e.target.value)}
            ></input>
          </div>
          <div className="">
            <input
              type="password"
              placeholder="Password"
              className="h-11 w-full pl-5 pr-4 border-b border-gray-600 rounded-lg drop-shadow outline-none"
              onChange={(e) => setPassword(e.target.value)}
            ></input>
          </div>
          <div className="flex justify-between space-x-3">
            <div className=" w-3/4">
              <input
                type="text"
                placeholder="Contact - Tel"
                className="h-11 w-full pl-5 pr-4 border-b border-gray-600 rounded-lg drop-shadow outline-none"
                value={phoneNumber}
                onChange={handleTelInputChange}
              ></input>
            </div>
            <div className=" w-full">
              <input
                type="text"
                placeholder="Date of Birth (DD/MM/YYYY)"
                className="h-11 w-full pl-5 pr-4 border-b border-gray-600 rounded-lg drop-shadow outline-none"
                value={dob}
                onChange={handleDOBInputChange}
              />
            </div>
          </div>
          <div className="flex space-x-4">
            <div
              className="text-sm cursor-pointer w-2/6 h-11 bg-cyan-600 hover:bg-cyan-700 duration-500 flex justify-center items-center text-white rounded-lg"
              onClick={handleSignUp}
            >
              Sign Up
            </div>
            <div>
              <a
                href="/signin"
                className="text-sm w-full justify-center flex mt-4 cursor-pointer underline"
              >
                Already have account? Sign In
              </a>
            </div>
          </div>
        </div>
        <div className=" w-4/5 container relative">
          <Image
            src={'/Image/SignUpImg.jpg'}
            alt="SignUp Image"
            fill
            style={{ objectFit: 'cover' }}
          ></Image>
        </div>
      </div>
    </div>
  )
}
