import { React, useEffect, useState } from 'react'
import { storage } from '../api/getimage'
import { ref, getDownloadURL } from 'firebase/storage'
import Navbar from '../component/Navbar'
import RequestBookingCard from '../component/bookingCard'
import Chat from '../component/chat'

const Tutor = () => {
  const [studentName, setStudentName] = useState(null)
  const [tutorName, setTutorName] = useState('')
  const [openRequest, setOpenRequest] = useState(true)
  const [openConfirmed, setOpenConfirmed] = useState(false)
  const [openCompleted, setOpenCompleted] = useState(false)
  const [openChat, setOpenChat] = useState(false)
  const [ID, setID] = useState()

  console.log(ID)


  const fetchData = async () => {
    try {

        // Check if tutorName is not an empty string before making the second API call

        const IDresponse = await fetch(
          `${process.env.NEXT_PUBLIC_STUDENT_BOOKING_ID}/${tutorName.user_info.user_data.name}`,
          {
            method: 'POST', // Specify the HTTP method
          },
        )
        const IDResult = await IDresponse.json()
        setID(IDResult)
        console.log('Booking ID response:', IDResult)
        // Handle the result as needed
    } catch (error) {
      console.error('Error fetching tutors data:', error)
    }
  }

  const handleUpdateList = () => {
    fetchData()
  }

  useEffect(() => {
    const storedUserData = JSON.parse(localStorage.getItem('userData'))
    setTutorName(storedUserData)
  }, [])

  useEffect(() => {
    console.log(tutorName)
    fetchData()

    // Set up a fetch interval of 5 seconds
    const intervalId = setInterval(() => {
        fetchData()
      }, 10000)
  
      // Clear the interval when the component unmounts
      return () => clearInterval(intervalId)
  }, [tutorName])

  const handleOpenConfirmed = () => {
    setOpenRequest(false)
    setOpenCompleted(false)
    setOpenConfirmed(true)
  }
  const handleOpenCompleted = () => {
    setOpenRequest(false)
    setOpenCompleted(true)
    setOpenConfirmed(false)
  }

  const handleOpenRequest = () => {
    setOpenRequest(true)
    setOpenCompleted(false)
    setOpenConfirmed(false)
  }


  const handleOpenChat = (data) => {
    console.log(data)
    setOpenChat(!openChat)
    setStudentName(data)
  }

  const handleCloseChat = () =>{
    setOpenChat(false)
  }


  return (
    <div className="h-screen">
      <Navbar />
      <div className="w-full flex justify-center bg-gradient-to-t from-emerald-800 to-green-400 mb-6 ">
        <div className=" pt-14 w-3/4 h-full text-white">
          <div>
            <div className="mb-4 font-bold text-3xl">Booking Manage</div>
            {/* <div className="text-xl mb-8">
              <h1>
                Find the best tutors in Bangkok. Get personalized one-on-one
                learning to boost your grades with our skilled Bangkok tutors.
                Get Test Prep and Homework assistance too.
              </h1>
            </div> */}
          </div>
          <div className="pb-8"></div>
        </div>
      </div>
      <div className="flex w-full justify-center">
        <div className="w-3/4  flex space-x-5">
          {/* <div className="w-1/3 ">
          </div> */}
          {/* <div className="w-full font-semibold text-gray-500 mt-4 mb-3">
            {tutorsCount} Tutors Create Request
          </div> */}
        </div>
      </div>
      <div className="flex w-full justify-center">
        <div className="w-3/4  flex space-x-5">
          <div className=" w-1/3 space-y-5">
            <div
              className={`p-4 cursor-pointer rounded-xl text-nowrap border border-gray-600 w-1/2 ${openRequest == true && 'text-md bg-emerald-800 text-white'}`}
              onClick={handleOpenRequest}
            >
              {ID && ID.pending_id.length} Request
            </div>
            <div
              className={`p-4 cursor-pointer rounded-xl text-nowrap border border-gray-600 w-1/2 ${openConfirmed == true && 'text-md bg-emerald-800 text-white '}`}
              onClick={handleOpenConfirmed}
            >
              {ID && ID.confirmed_id.length} Confirmed
            </div>
            <div
              className={`p-4 cursor-pointer rounded-xl text-nowrap border border-gray-600 w-1/2 ${openCompleted == true && 'text-md bg-emerald-800 text-white'}`}
              onClick={handleOpenCompleted}
            >
              {ID && ID.completed_id.length} Completed
            </div>
          </div>
          <div className='w-full'>
            <div className="w-full">
              {ID &&
                openRequest == true &&
                Object.entries(ID.pending_id).map(([IDindex, IDdata]) => (
                  <div key={IDindex} className="mb-5">
                    <RequestBookingCard
                      tutorData={IDdata.bookingRequestId}
                      status={'pending_booking_create'}
                      updateList={handleUpdateList}
                      userData={tutorName && tutorName.user_info.user_data.class}
                      openChat={handleOpenChat}
                      />
                  </div>
                ))}
            </div>
            <div className="w-full">
              {ID &&
                openConfirmed == true &&
                Object.entries(ID.confirmed_id).map(([IDindex, IDdata]) => (
                  <div key={IDindex} className="mb-5">
                    <RequestBookingCard
                      tutorData={IDdata.bookingConfirmedId}
                      status={'confirmed_booking_create'}
                      updateList={handleUpdateList}
                      userData={tutorName && tutorName.user_info.user_data.class}
                      openChat={handleOpenChat}

                      />
                  </div>
                ))}
            </div>
            <div className="w-full">
              {ID &&
                openCompleted == true &&
                Object.entries(ID.completed_id).map(([IDindex, IDdata]) => (
                  <div key={IDindex} className="mb-5">
                    <RequestBookingCard
                      tutorData={IDdata.bookingCompletedId}
                      status={'completed_booking_create'}
                      updateList={handleUpdateList}
                      userData={tutorName && tutorName.user_info.user_data.class}
                      openChat={handleOpenChat}

                      />
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
      {openChat === true && 
      <div className="fixed bottom-0 w-1/3 right-10">
        <Chat tutor={studentName.TutorName} student={tutorName} from={'student'} closeChat={handleCloseChat}/>
      </div>} 
    </div>
  )
}

export default Tutor
