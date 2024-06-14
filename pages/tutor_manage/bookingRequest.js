import React, { useEffect, useState, useCallback, useRef } from 'react'
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
  const [reviewText, setReviewText] = useState('')
  const [type, setType] = useState('hourly')

  const fetchData = async (selectedType) => {
    console.log('type:', selectedType)
    try {
      // Check if tutorName is not an empty string before making the second API call
      if (tutorName) {
        const IDresponse = await fetch(
          `${process.env.NEXT_PUBLIC_TUTOR_BOOKING_ID}/${tutorName.user_info.user_data.name}/${selectedType}`,
          {
            method: 'POST', // Specify the HTTP method
          },
        )
        const IDResult = await IDresponse.json()
        setID(IDResult)
        console.log('Booking ID response:', IDResult)
      }

      // Handle the result as needed
    } catch (error) {
      console.error('Error fetching tutors data:', error)
    }
  }

  const handleUpdateList = useCallback(() => {
    fetchData('hourly')
    setType('hourly')
  }, [fetchData])

  useEffect(() => {
    const storedUserData = JSON.parse(localStorage.getItem('userData'))
    if (storedUserData) {
      setTutorName(storedUserData)
    }
  }, [setTutorName])

  const typeRef = useRef(type)

  useEffect(() => {
    typeRef.current = type
  }, [type])

  useEffect(() => {
    fetchData(typeRef.current)

    // const intervalId = setInterval(() => {
    //   fetchData(typeRef.current)
    // }, 10000)

    // return () => clearInterval(intervalId)
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
    {type !== 'group' ? setStudentName(data.students) : setStudentName(data)}
    
  }

  const handleCloseChat = () => {
    setOpenChat(false)
  }

  const handleReviewTextChange = (event) => {
    setReviewText(event.target.value)
  }

  const submitReview = (bookingId) => {
    // Submit review logic here
    console.log('Review submitted:', reviewText)
    // Clear the review text area after submission
    setReviewText('')
  }

  const handleSetType = (selectedType) => {
    console.log('type : ', selectedType)
    setType(selectedType)
    fetchData(selectedType)
  }

  let studentlist

  if(type !== 'group'){
    studentlist = JSON.parse(studentName)
  }

  console.log(studentlist)
  console.log(studentName)

  return (
    <div className="h-screen">
      <Navbar />
      <div className="w-full flex justify-center bg-gradient-to-t from-emerald-800 to-green-400 mb-6 ">
        <div className=" pt-14 w-3/4 h-full text-black">
          <div className=" flex items-center mb-4 space-x-7">
            <div
              className={`p-4 cursor-pointer rounded-xl text-nowrap border border-gray-600 ${
                type === 'hourly' ? 'bg-yellow-500 scale-110 duration-200' : 'bg-white' // Adjust the background color or any other styles as needed
              }`}
              onClick={() => handleSetType('hourly')}
            >
              Hourly Class
            </div>
            <div
              className={`p-4 cursor-pointer rounded-xl text-nowrap border border-gray-600 ${
                type === 'individual' ? 'bg-yellow-500 scale-110 duration-200' : 'bg-white' // Adjust the background color or any other styles as needed
              }`}
              onClick={() => handleSetType('individual')}
            >
              Individual Course
            </div>
            <div
              className={`p-4 cursor-pointer rounded-xl text-nowrap border border-gray-600 ${
                type === 'group' ? 'bg-yellow-500 scale-110 duration-200' : 'bg-white' // Adjust the background color or any other styles as needed
              }`}
              onClick={() => handleSetType('group')}
            >
              Group Course
            </div>
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
              className={`p-4 cursor-pointer rounded-xl text-nowrap border border-gray-600 w-1/2 ${
                openRequest == true &&
                'text-md bg-emerald-800 text-white duration-200 scale-110'
              }`}
              onClick={handleOpenRequest}
            >
              {ID && ID.filtered_data.bookingPending_id
                ? ID.filtered_data.bookingPending_id.length
                : 0}{' '}
              Request
            </div>
            <div
              className={`p-4 cursor-pointer rounded-xl text-nowrap border border-gray-600 w-1/2 ${
                openConfirmed == true &&
                'text-md bg-emerald-800 text-white scale-110 duration-200'
              }`}
              onClick={handleOpenConfirmed}
            >
              {ID && ID.filtered_data.bookingConfirmed_id
                ? ID.filtered_data.bookingConfirmed_id.length
                : 0}{' '}
              Confirmed
            </div>
            <div
              className={`p-4 cursor-pointer rounded-xl text-nowrap border border-gray-600 w-1/2 ${
                openCompleted == true &&
                'text-md bg-emerald-800 text-white scale-110 duration-200'
              }`}
              onClick={handleOpenCompleted}
            >
              {ID && ID.filtered_data.bookingCompleted_id
                ? ID.filtered_data.bookingCompleted_id.length
                : 0}{' '}
              Completed
            </div>
          </div>
          <div className="w-full">
            <div className="w-full">
              {ID &&
                ID.filtered_data.bookingPending_id &&
                openRequest == true &&
                Object.entries(ID.filtered_data.bookingPending_id).map(
                  ([IDindex, IDdata]) => (
                    <div key={IDindex} className="mb-5">
                      <RequestBookingCard
                        tutorData={IDdata.bookingRequestId}
                        status={'pending_booking_create'}
                        updateList={handleUpdateList}
                        userData={
                          tutorName && tutorName.user_info.user_data.class
                        }
                        openChat={handleOpenChat}
                      />
                    </div>
                  ),
                )}
            </div>
            <div className="w-full">
              {ID &&
                ID.filtered_data.bookingConfirmed_id &&
                openConfirmed == true &&
                Object.entries(ID.filtered_data.bookingConfirmed_id).map(
                  ([IDindex, IDdata]) => (
                    <div key={IDindex} className="mb-5">
                      <RequestBookingCard
                        tutorData={IDdata.bookingConfirmedId}
                        status={'confirmed_booking_create'}
                        updateList={handleUpdateList}
                        userData={
                          tutorName && tutorName.user_info.user_data.class
                        }
                        openChat={handleOpenChat}
                      />
                    </div>
                  ),
                )}
            </div>
            <div className="w-full">
              {ID &&
                ID.filtered_data.bookingCompleted_id &&
                openCompleted == true &&
                Object.entries(ID.filtered_data.bookingCompleted_id).map(
                  ([IDindex, IDdata]) => (
                    <div key={IDindex} className="mb-5">
                      <RequestBookingCard
                        tutorData={IDdata.bookingCompletedId}
                        status={'completed_booking_create'}
                        updateList={handleUpdateList}
                        userData={
                          tutorName && tutorName.user_info.user_data.class
                        }
                        openChat={handleOpenChat}
                      />
                    </div>
                  ),
                )}
            </div>
          </div>
        </div>
      </div>
      {openChat === true && type !== 'group' &&(
        <div className="fixed bottom-0 w-1/3 right-10">
          <Chat
            tutor={tutorName}
            student={studentlist[0].StudentName}
            from={'tutor'}
            closeChat={handleCloseChat}
          />
        </div>
      )}
      {openChat === true && type === 'group' &&(
        <div className="fixed bottom-0 w-1/3 right-10">
          <Chat
            tutor={tutorName}
            student={studentName.StudentName}
            from={'tutor'}
            closeChat={handleCloseChat}
          />
        </div>
      )}
    </div>
  )
}

export default Tutor
