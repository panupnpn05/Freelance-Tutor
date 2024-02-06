import Signin from '../signin'
import React, { useState, useEffect } from 'react'
import Image from 'next/image'

export default function Navbar() {
  const [ProfileClick, setProfileClick] = useState(false)
  const [loginPageClicked, setLoginPageClicked] = useState(false)
  const [user, setUser] = useState([])

  const handleLoginPage = () => {
    setLoginPageClicked(!loginPageClicked)
  }

  const handleLogout = () => {
    // Clear the user state
    setUser([])

    // Clear the 'userData' from localStorage
    localStorage.removeItem('userData')
  }

  const handleUserLogin = (userData) => {
    setUser(userData)
    setLoginPageClicked(false) // Close the Signin component after login
    localStorage.setItem('userData', JSON.stringify(userData))
  }

  const handleSigninClose = () => {
    setLoginPageClicked(false)
  }

  const handleProfileClick = () => {
    setProfileClick(!ProfileClick)
  }

  useEffect(() => {
    if (loginPageClicked) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'auto'
    }
    setUser(JSON.parse(localStorage.getItem('userData')))
    // Cleanup effect on component unmount
    return () => {
      document.body.style.overflow = 'auto'
    }
  }, [loginPageClicked])

  useEffect(() => {
    const handleStorageChange = () => {
      const storedUserData = JSON.parse(localStorage.getItem('userData'))
      setUser(storedUserData || {})
    }
    window.addEventListener('storage', handleStorageChange)
    return () => {
      window.removeEventListener('storage', handleStorageChange)
    }
  }, [])

  console.log(user)
  return (
    <div>
      <div className="flex justify-center items-center w-full h-20 static">
        <div className="w-3/4 flex justify-between items-center text-lg">
          <a className="text-3xl font-bold text-green-900" href="/">
          <Image
              src="/Image/image-removebg-preview.png"
              alt="Logo"
              width={120} 
              height={120}
              style={{ objectFit: 'cover' }}
          />
          </a>
          <a className="" href="/alltutor">
            ติวเตอร์ทั้งหมด
          </a>
          {(user && Object.keys(user).length === 0) || user === null ? (
            <div className="space-x-4 flex justify-between items-center cursor-pointer">
              <div className="w-full" onClick={handleLoginPage}>
                เข้าสู่ระบบ
              </div>
              <a
                className="w-full h-1/2 rounded-lg p-2 border border-green-600 hover:border-9 hover:bg-green-600 hover:text-white duration-300 whitespace-nowrap"
                href="/signup"
              >
                สมัครเข้าใช้งาน
              </a>
            </div>
          ) : (
            <div>
              <div
                className="h-5 bg-red-200 p-4 flex items-center rounded-lg font-semibold cursor-pointer"
                onClick={handleProfileClick}
              >
                {user.user_info.name}
              </div>
              {ProfileClick == true && (
                <div className='absolute bg-blue-200'>
                  <div className=" cursor-pointer" onClick={handleLogout}>
                    signout
                  </div>
                  {user.user_info.name === 'Admin Admin' && <a className=' cursor-pointer' href='/CreateTutor'>Add tutor</a>}
                  
                </div>
              )}
            </div>
          )}
        </div>
        {loginPageClicked && (
          <div className=" absolute w-full top-0 z-50">
            {' '}
            <Signin onUserLogin={handleUserLogin} onClose={handleSigninClose} />
          </div>
        )}
      </div>
    </div>
  )
}