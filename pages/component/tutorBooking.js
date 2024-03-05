import Navbar from './Navbar'
import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import Image from 'next/image'
import CustomCalendar from './calendar'
import { format, parse } from 'date-fns'
import {
  UserGroupIcon,
  UserIcon,
  MapPinIcon,
  ComputerDesktopIcon,
  CheckBadgeIcon,
  BriefcaseIcon,
  EnvelopeIcon,
  BookOpenIcon,
  ClockIcon,
} from '@heroicons/react/24/solid'

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

    const {tutorData}  = router.query
    if (tutorData) {
      const parsedTutorData = JSON.parse(tutorData)
      setBookingData(parsedTutorData)
      console.log(parsedTutorData)
    }
  }, [router.query])

  const handleDateClick = () => {
    setShowCalendar(!showCalendar)
  }

  const handleDateSelection = (date) => {
    setSelectedDate(format(date, 'dd/MM/yyyy'))
    setShowCalendar(false)
  }

  const handleCreate = async () => {
    FormData = {
      tutorFullname: bookingData.TutorName,
      tutorEmail: bookingData.TutorEmail,
      tutorClasses: bookingData.TutorClass,
      tutorCost: bookingData.Cost,
      tutorDescription: bookingData.Description,
      tutorCourse: bookingData.Course,
      studentFullname: userData.user_info.user_data.name,
      studentEmail: userData.user_info.user_data.email,
      studentAge: userData.user_info.user_data.age,
      studentPhone: userData.user_info.user_data.phoneNumber,
      studentSchool: userData.user_info.user_data.school,
      type: bookingData.Type,
      courseId: bookingData.Courseid,
      duration: bookingData.Duration,
      participants: bookingData.Participants,
      startTime:bookingData.StartTime,
      endTime:bookingData.EndTime,
      location: bookingData.Location,
      days: bookingData.Days
    }

    if (bookingData.Type == 'group'){
      FormData.date = "12/12/2012"
    } else{
      FormData.date = selectedDate

    }

    if (bookingData.bookingId) {
      FormData.bookingRequestId = bookingData.bookingId;
    } else {
      FormData.bookingRequestId = "";
    }

    console.log(FormData,bookingData)
    try {
      const response = await fetch(
        process.env.NEXT_PUBLIC_CREATE_REQUEST_BOOKING_API,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(FormData),
        },
      )
      const result = await response.json()
      // window.location.href = '/student_manage/bookingManage'
      console.log(result)
    } catch (error) {
      console.error('Error during create user', error)
    }
  }

  console.log(bookingData, userData)
  return (
    <div>
      <Navbar />
      {bookingData && (
        <div className=" h-full w-full">
          <div className="bg-gradient-to-t from-emerald-800 to-green-400">
            <div className="text-base font-semibold overflow-y-auto w-full flex justify-center">
              <div className="my-10 space-y-2 w-1/4">
                {bookingData.Type === 'hourly' || bookingData.Type ==='individual' ? <div><div className="text-white text-xl">Study Date</div>
                <input
                  type="text"
                  className="w-full text-center text-lg px-4 py-2 border border-gray-300 focus:outline-none rounded-full focus:border-blue-500"
                  placeholder="Select Date"
                  onClick={handleDateClick}
                  value={
                    selectedDate
                      ? format(
                          parse(selectedDate, 'dd/MM/yyyy', new Date()),
                          'dd MMMM yyyy',
                        )
                      : ''
                  }
                /></div> : <div className="text-white text-xl text-center">Booking Request Confirm</div>}
                
                {showCalendar && (
                  <div className="absolute w-1/4">
                    <CustomCalendar onSelect={handleDateSelection} />
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
                <div className="w-full">
                  <div className="flex justify-between">
                    <div>
                      <div className="text-2xl font-semibold">
                        {bookingData.Course}
                      </div>
                      <div className="text-lg text-gray-600 ">
                        {bookingData.TutorName}
                      </div>
                      <div className="text-gray-600 mt-1">
                        Bangkok, Thailand
                      </div>
                      <div className="flex space-x-3 mt-2">
                        <div className=" text-md text-gray-600 flex items-center ">
                          <BookOpenIcon className=" w-3 mr-1" /> :{' '}
                          {bookingData.Type}
                        </div>
                        <div className="text-gray-600 flex items-center mt-1">
                          <BriefcaseIcon className=" w-3 mr-1" /> :{' '}
                          {bookingData.TutorClass}
                        </div>
                      </div>

                      <div className="text-gray-600 flex items-center">
                        <EnvelopeIcon className=" w-3 mr-1" /> :{' '}
                        {bookingData.TutorEmail}
                      </div>
                      <div className="text-gray-600">
                        Teach {bookingData.Location}
                      </div>
                    </div>
                    <div className="w-1/2">
                      <div className="text-right text-2xl font-semibold flex justify-end">
                        ฿{bookingData.Cost}
                        {bookingData.Type === 'hourly' && <div>/hr</div>}
                      </div>
                      {bookingData.Type !== 'hourly' && (
                        <div className="flex justify-end">
                          Duration : {bookingData.Duration} Weeks
                        </div>
                      )}

                      <div className="flex justify-end">
                        {bookingData.Type !== 'hourly' ? (
                          <div>Teaching time :</div>
                        ) : (
                          <div>Available time :</div>
                        )}
                        <div className="ml-1">
                          {bookingData.StartTime} - {bookingData.EndTime}
                        </div>{' '}
                      </div>
                      <div className="flex justify-end mt-2">
                        {Object.entries(JSON.parse(bookingData.Days)).map(([day, isOpen]) => (
                          <div key={day} className=" text-center">
                            {isOpen && (
                              <div className="border border-emerald-300 w-14 py-2 rounded-lg bg-emerald-200 ml-1">
                                {' '}
                                {day.substring(0, 3)}
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                      <div className="flex justify-end mt-2 ">
                        {bookingData.Type === 'group' ? (
                          <div className="flex text-xl font-medium items-center border border-emerald-300 px-3 bg-emerald-200 p-1 text-gray-600 rounded-lg">
                            <div className="w-8 mr-2">
                              <UserGroupIcon />
                            </div>
                            <div className="flex">
                              {bookingData.students ? (
                                <div>{bookingData.students}</div>
                              ) : (
                                <div className="mr-1">0</div>
                              )}
                              / {bookingData.Participants}
                            </div>
                          </div>
                        ) : (
                          <div></div>
                        )}{' '}
                      </div>
                    </div>
                  </div>

                  <div className="text-xl font-semibold mt-5">
                    {bookingData.Description}
                  </div>
                  {/* <p className="text-gray-600 mt-2">
              John is a software engineer with over 10 years of experience in
              developing web and mobile applications. He is skilled in
              JavaScript, React, and Node.js.
            </p> */}
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
