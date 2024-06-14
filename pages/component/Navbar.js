import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import Notifications from './notification'
import { BellIcon, BellAlertIcon } from '@heroicons/react/24/outline'
import Chat from './chat'
import { useRouter } from 'next/router';

export default function Navbar() {
  const [ProfileClick, setProfileClick] = useState(false)
  const [loginPageClicked, setLoginPageClicked] = useState(false)
  const [newMessage, setNewMessage] = useState([])
  const [openChat, setOpenChat] = useState(false)
  const [openNoti, setOpenNoti] = useState(false)
  const [user, setUser] = useState([])
  const [selectedMessage, setSelectedMessage] = useState(null)
  const router = useRouter();

  const handleOpenChat = (data) => {
    console.log(user)
    if (user.user_info.user_data.school) {
      setSelectedMessage({
        tutor: data.sender,
        from: 'student',
        student: user,
      })
    } else if (user.user_info.user_data.class) {
      setSelectedMessage({
        tutor: user,
        from: 'tutor',
        student: data.sender,
      })
    }
    const updatedMessages = newMessage.filter(message => message.id !== data.id);
 setNewMessage(updatedMessages);
    setOpenChat(!openChat)
  }

const handleCloseChat = () =>[
  setOpenChat(!openChat)
]

  const handleLogout = () => {
    // Clear the 'userData' from localStorage
    localStorage.removeItem('userData')
    // Update the user state and force a re-render
    setUser(null)
    setProfileClick(false)
    window.location.href = '/'
  }

  const handleOpenNotifications = () => {
    setOpenNoti(!openNoti)
  }

  const shakeAnimationStyle = {
    animation: 'shake 2s cubic-bezier(.36,.07,.19,.97) both infinite',
  }

  const handleNewMessage = (data) => {
    console.log(data)
    setNewMessage((prevMessages) => [...prevMessages, data])
  }

  const handleUserLogin = (userData) => {
    console.log(userData)
    setUser(userData)
    setLoginPageClicked(false) // Close the Signin component after login
    localStorage.setItem('userData', JSON.stringify(userData))
    window.dispatchEvent(new CustomEvent('local-storage-change'))
  }

  const handleSigninClose = () => {
    setLoginPageClicked(false)
  }

  const handleProfileClick = () => {
    setProfileClick(!ProfileClick)
  }

  console.log(newMessage)

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

// const Sendname = (path) =>{
//   router.push(`${path}?user=${encodeURIComponent(JSON.stringify(user))}`);
// }
  return (
    <div className="shadow-lg bg-white">
      <div className="flex justify-center items-center w-full h-15 static">
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
          <div className="flex items-center">
            <a className="text-red-500 mx-4" href="/">
              Home
            </a>
            {!user?.user_info?.user_data?.class && (
              <div>
                <a className="mx-4" href="/allcourse">
                  Find a Course
                </a>
                <a className="mx-4" href="/alltutor">
                  Find a Tutor
                </a>
                <a className="mx-4" href="/CreateTutor">
                  Become a Tutor
                </a>
              </div>
            )}

            {user !== null &&
            user.user_info &&
            user.user_info.user_data &&
            user.user_info.user_data.class ? (
              <div>
                {' '}
                <a
                  className="mx-4"
                  href="/tutor_manage/bookingRequest"
                  // onClick={() => user && Sendname(`/tutor_manage/bookingRequest`)}
                  >
                  Manage Booking
                </a>
                <a
                  className="mx-4"
                  href="/tutor_manage/courseCreate"
                  // onClick={() => user && Sendname(user)}
                  >
                  Create course
                </a>
                <a
                  className="mx-4"
                  href="/tutor_manage/coursemanage"
                  // onClick={() => user && Sendname(user)}
                  >
                  Course Manage
                </a>
              </div>
            ) : (
              ''
            )}
          </div>
          <div className="flex items-center">
            {(user && Object.keys(user).length === 0) || user === null ? (
              <div className="space-x-4 flex items-center cursor-pointer">
                <a className="w-full" href="/signin">
                  Login
                </a>
                <a
                  className="w-full h-1/2 rounded-lg p-2 border border-green-600 hover:border-9 hover:bg-green-600 hover:text-white duration-300 whitespace-nowrap"
                  href="/signup"
                >
                  Signup
                </a>
              </div>
            ) : (
              <div className="">
                <div className="flex justify-center space-x-3">
                  <div
                    className="flex justify-center pt-2 cursor-pointer hover:scale-110 duration-200"
                    style={newMessage.length !== 0 ? shakeAnimationStyle : {}}
                    onClick={handleOpenNotifications}
                  >
                    {newMessage.length !== 0 && (
                      <div className=" absolute mt-1 flex justify-center bg-red-500 h-3 w-3 rounded-full ml-4"></div>
                    )}
                    {newMessage.length === 0 ? (
                      <BellIcon className=" w-9 h-9 " />
                    ) : (
                      <BellAlertIcon className="w-9 h-9" />
                    )}
                  </div>
                  <div
                    className=" border border-emerald-600 p-2 px-6 bg-emerald-600 text-white hover:bg-white duration-200 hover:text-emerald-600 flex items-center rounded-lg font-semibold cursor-pointer"
                    onClick={handleProfileClick}
                  >
                    {user.user_info.user_data.name}
                  </div>
                </div>
                {openNoti && (
                  <div
                    className="absolute w-1/4 mt-2 rounded-xl border border-gray-300 overflow-hidden"
                    style={{}}
                  >
                    <div className=" text-base px-4 py-1 bg-gray-200">
                      {newMessage.length} news messages
                    </div>
                    <div>
                      {newMessage.map((message, index) => (
                        <div
                          key={index}
                          className="border border-gray-300 bg-white px-4 py-2 cursor-pointer"
                          onClick={() => handleOpenChat(message)}
                        >
                          <div className=" text-base font-semibold">
                            {message.sender}
                          </div>
                          <div className=" text-sm">{message.text}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {ProfileClick == true && (
                  <div className="absolute bg-gray-200 border-2 ml-12 border-gray-400 rounded-xl space-y-3 p-3 w-1/6 z-50">
                    {user.user_info.user_data.name === 'Admin Admin' ? (
                      <div className="flex flex-col">
                        <a
                          className="cursor-pointer py-1 border pl-4 bg-white rounded-lg text-emerald-800 border-emerald-500"
                          href="/admin_manage/tutorCreatePage"
                        >
                          Manage Request
                        </a>
                      </div>
                    ) : user.user_info.user_data.class ? (
                      <div className="flex flex-col">
                        <a
                          className="cursor-pointer py-1 border pl-4 bg-white rounded-lg text-emerald-800 border-emerald-500"
                          href="/CreateProfile"
                          // onClick={() => user && Sendname(user)}
                          >
                          Profile
                        </a>
                      </div>
                    ) : (
                      <div className="flex flex-col space-y-1">
                        <a
                          className="cursor-pointer py-1 border pl-4 bg-white rounded-lg text-emerald-800 border-emerald-500"
                          href="/student_manage/bookingManage"
                          // onClick={() => user && Sendname(user)}
                          >
                          Manage Booking
                        </a>
                      </div>
                    )}
                    <div
                      className=" cursor-pointer border border-red-500 py-1 bg-red-500 hover:text-red-500 hover:bg-white duration-300 text-center text-white rounded-md"
                      onClick={handleLogout}
                    >
                      signout
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
          <div className=" absolute w-full left-0 top-0 z-50"> </div>
        </div>
      </div>
      {openChat && (
        <div className='fixed bottom-0 w-1/3 right-1 z-50'>
        <Chat tutor={selectedMessage.tutor} student={selectedMessage.student} from={selectedMessage.from} closeChat={handleCloseChat}/>
        </div>
      )}
      <Notifications sendNewMessage={handleNewMessage} />
    </div>
  )
}
