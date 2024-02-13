import Navbar from './Navbar'
import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import Image from 'next/image'
import CustomCalendar from './calendar'
import format from 'date-fns/format'

export default function Booking({ data }) {
  const [showCalendar, setShowCalendar] = useState(false)
  const [selectedDate, setSelectedDate] = useState(null)
  const [bookingData, setBookingData] = useState()
  const [userData, setUserData] = useState()
  const router = useRouter()

  // Use useEffect to update the state when router.query changes
  useEffect(() => {
    const storedUserData = JSON.parse(localStorage.getItem('userData'))

    if (storedUserData) {
      setUserData(storedUserData)
    }

    const { tutorData } = router.query
    if (tutorData) {
      const parsedTutorData = JSON.parse(tutorData)
      setBookingData(parsedTutorData)
    }
  }, [router.query])

  const handleDateClick = () => {
    setShowCalendar(!showCalendar)
  }

  const handleDateSelection = (date) => {
    setSelectedDate(date)
    setShowCalendar(false)
  }

  const handleCreate = async () =>{
    FormData = {
        tutorFullname: bookingData.name,
        tutorEmail: bookingData.email,
        tutorAge: bookingData.age,
        tutorClasses: bookingData.class,
        tutorCost: bookingData.cost,
        tutorDescription: bookingData.description,
        studentFullname: userData.user_info.user_data.name,
        studentEmail: userData.user_info.user_data.email,
        studentAge: userData.user_info.user_data.age,
        studentPhone: userData.user_info.user_data.phoneNumber,
        studentSchool: userData.user_info.user_data.school

    }

    console.log(FormData)
    try {
        const response = await fetch(process.env.NEXT_PUBLIC_CREATE_REQUEST_BOOKING_API, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(FormData),
        })
        const result = await response.json()
        console.log(result)
      } catch (error) {
        console.error('Error during create user', error)
      }
  }

  return (
    <div>
      <Navbar/>
      {bookingData && (
        <div className=" h-full w-full">
          <div className="bg-gradient-to-t from-emerald-800 to-green-400">
            <div className="text-base font-semibold overflow-y-auto w-full flex justify-center">
              <div className="my-10 space-y-2 w-1/4">
                <div className="text-white text-xl">Study Date</div>
                <input
                  type="text"
                  className="w-full text-center text-lg px-4 py-2 border border-gray-300 focus:outline-none rounded-full focus:border-blue-500"
                  placeholder="Select Date"
                  onClick={handleDateClick}
                  value={
                    selectedDate ? format(selectedDate, 'dd MMMM yyyy') : ''
                  }
                />
                {showCalendar && (
                  <div className="absolute w-1/4">
                    <CustomCalendar
                      onSelect={handleDateSelection}
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="w-full flex justify-center bg-gray-100 h-screen ">
            <div className="bg-white h-min shadow-xl w-3/4 rounded-xl overflow-hidden mt-5 p-5">
              <div className="flex pt-5 space-x-8 px-6">
                <div className=" w-32 h-32 rounded-full overflow-hidden relative grow-0 shrink-0">
                  <Image
                    src={bookingData.imageUrl}
                    fill
                    style={{ objectFit: 'cover' }}
                  />
                </div>
                <div>
                  <div className="flex justify-between">
                    <div>
                      <div className="text-2xl font-semibold">
                        {bookingData.name}
                      </div>
                    </div>
                    <div>
                      <div className="text-right text-2xl font-semibold">
                        ฿{bookingData.cost}/hr
                      </div>
                    </div>
                  </div>
                  <div className="text-gray-600 mt-5">
                    Email : {bookingData.email}
                  </div>
                  <div className="text-gray-600 mt-5">
                    Age : {bookingData.age}
                  </div>
                  <div className="text-gray-600 mt-5">
                    Teaching : {bookingData.class}
                  </div>

                  <div className="text-base font-semibold mt-5 h-2/6 overflow-y-auto">
                    {bookingData.description}
                  </div>
                </div>
              </div>

              <div className="flex w-full mt-5 border-gray-700">
                <div className=" w-full">
                  <button
                    className=" bg-green-500 text-white px-4 py-2 w-full hover:bg-green-700 duration-300 whitespace-nowrap"
                    onClick={handleCreate}
                  >
                    Confirm Create Request
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
