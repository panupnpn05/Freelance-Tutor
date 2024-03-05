import Image from 'next/image'
import { useState, useEffect } from 'react'
import { storage } from '../api/getimage'
import { ref, getDownloadURL } from 'firebase/storage'
import userImg from '@/public/Image/userImg.jpeg'
import TimeRangePicker from './timePicker'
import format from 'date-fns/format'
import Review from './review'
import Ratingstar from './ratingstar'
import { UserGroupIcon } from '@heroicons/react/24/solid'

export default function RequestBookingCard({
  tutorData,
  status,
  updateList,
  userData,
  openChat,
  type,
  sendReview,
}) {
  const [imageUrl, setImageUrl] = useState('')
  const [Data, setData] = useState([])
  const [TutorName, setTutorName] = useState([])
  const [startTime, setStartTime] = useState([])
  const [endTime, setEndTime] = useState([])
  const [Timepicker, setTimePicker] = useState(false)
  const [studentsList, setStudentsList] = useState(false)
  const [rating, setRating] = useState(false)
  const [comment, setComment] = useState('')
  const [reviewstart, setReviewStart] = useState()
  const handleCreate = async () => {
    if (Data.Type == 'hourly') {
      setTimePicker(!Timepicker)
    } else {
      handleApply()
    }
  }

  const handleStartTime = (startTime) => {
    setStartTime(startTime)
  }

  const handleEndTime = (endTime) => {
    setEndTime(endTime)
  }

  const calculateHours = () => {
    if (startTime instanceof Date && endTime instanceof Date) {
      const startTimeMs = startTime.getTime()
      const endTimeMs = endTime.getTime()

      if (!isNaN(startTimeMs) && !isNaN(endTimeMs)) {
        const millisecondsDifference = endTimeMs - startTimeMs
        const hoursDifference = millisecondsDifference / (1000 * 60 * 60)
        return hoursDifference
      }
    }

    return null
  }

  if (Data) {
    FormData = {
      tutorFullname: Data.TutorName,
      tutorEmail: Data.TutorEmail,
      tutorAge: Data.TutorAge,
      tutorClasses: Data.TutorClass,
      tutorCost: Data.TutorCost,
      tutorDescription: Data.TutorDescription,
      tutorCourse: Data.TutorCourse,
      students: Data.students,
      date: Data.Date,
      type: Data.Type,
      id: tutorData,
      participants: Data.Participants,
      days: Data.Days,
      courseId: Data.CourseId,
    }
  }

  const handleApply = async () => {
    if (Data.Type == 'hourly') {
      try {
        const response = await fetch(
          process.env.NEXT_PUBLIC_CREATE_CONFIRMED_BOOKING,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              ...FormData,
              startTime: format(startTime, 'HH:mm'),
              endTime: format(endTime, 'HH:mm'),
              total: (calculateHours() * Data.TutorCost).toString(),
              hours: calculateHours().toString(),
              // review,
              // rating,
            }),
          },
        )
        const result = await response.json()
        console.log(result)
        updateList()
      } catch (error) {
        console.error('Error during create user', error)
      }
    } else if (Data.Type == 'individual') {
      try {
        const response = await fetch(
          process.env.NEXT_PUBLIC_CREATE_CONFIRMED_BOOKING,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              ...FormData,
              startTime: Data.StartTime,
              endTime: Data.EndTime,
              total: Data.TutorCost,
              hours: '1',
              // review,
              // rating,
            }),
          },
        )
        const result = await response.json()
        console.log(result)
        updateList()
      } catch (error) {
        console.error('Error during create user', error)
      }
    } else {
      try {
        const response = await fetch(
          process.env.NEXT_PUBLIC_CREATE_CONFIRMED_BOOKING,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              ...FormData,
              startTime: Data.StartTime,
              endTime: Data.EndTime,
              total: Data.TutorCost,
              date: '12/12/2012',
              hours: '1',
              // review,
              // rating,
            }),
          },
        )
        const result = await response.json()
        console.log(result)
        updateList()
      } catch (error) {
        console.error('Error during create user', error)
      }
    }
  }

  const handleConfirm = async () => {
    FormData.startTime = Data.StartTime
    FormData.endTime = Data.EndTime
    FormData.total = Data.Total
    FormData.hours = Data.Hours
    try {
      const response = await fetch(
        process.env.NEXT_PUBLIC_CREATE_COMPLETE_BOOKING,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(FormData),
        },
      )
      const result = await response.json()
      console.log(result)
    } catch (error) {
      console.error('Error during create user', error)
    }
    updateList()
  }

  const handleDelete = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_DELETE_REQUEST_ID}/${status}/${Data.StudentName}/${Data.TutorName}/${tutorData}`,
        {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
        },
      )
      const result = await response.json()
      console.log(result)
      updateList()
    } catch (error) {
      console.error('Error during create user', error)
    }
  }

  useEffect(() => {
    const fetchImage = async () => {
      try {
        const storedUserData = JSON.parse(localStorage.getItem('userData'))
        if (storedUserData) {
          setTutorName(storedUserData.user_info.user_data)
          const response = await fetch(
            `${process.env.NEXT_PUBLIC_GET_BOOKING_ID}/${status}/${tutorData}`,
            {
              method: 'GET',
            },
          )
          const Result = await response.json()
          console.log(Result)
          setData(Result.pending_id)

          const url = await getDownloadURL(
            ref(storage, `${Result.pending_id.TutorCourse}.jpg`),
          )
          setImageUrl(url)
        }
      } catch (error) {
        console.error('Error fetching image:', error)
      }
    }

    fetchImage()
  }, [tutorData])

  const handlelOpenChat = () => {
    openChat(Data)
  }

  const handleOpenReview = () => {
    setRating(!rating)
  }

  const handleReview = (review) => {
    setComment(review)
  }

  const handleStars = (index) => {
    setReviewStart(index)
  }

  const handleOpenStudents = () => {
    setStudentsList(!studentsList)
  }

  const handleSubmitReview = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_CREATE_REVIEW}/${Data.TutorName}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({course: Data.TutorCourse , reviewer:userData.name, star:reviewstart, comment:comment}),
        },
      )
      console.log(JSON.stringify({course: Data.TutorCourse , reviewer:userData.name, star:reviewstart, comment:comment}))
      const result = await response.json()
      console.log(result)
    } catch (error) {
      console.error('Error during create user', error)
    }
    updateList()
  }

  FormData.bookingRequestId = ''

  let students
  let daysData

  if (Data.students) {
    students = JSON.parse(Data.students)
  }

  if (Data.Type == 'group') {
    daysData = JSON.parse(Data.Days)
  }
  console.log(Data)

  return (
    <div>
      {Data && Data.detail != `No ${type} booking found` && (
        <div className="relative">
          <div className="bg-white shadow-xl  rounded-xl overflow-hidden">
            <div className="flex pt-5 space-x-8 px-6">
              <div className=" w-32 h-32 rounded-full overflow-hidden relative grow-0 shrink-0">
                <Image
                  src={imageUrl != '' ? imageUrl : userImg}
                  fill
                  style={{ objectFit: 'cover' }}
                />
              </div>
              <div className=" w-full">
                <div className="flex justify-between">
                  {Data.Type == 'hourly' && (
                    <div className="text-2xl font-semibold">{Data.Date}</div>
                  )}
                </div>
                {Data.Type != 'group' ? (
                  <div className="">
                    <div className="text-2xl font-semibold">
                      {Data.TutorCourse}
                    </div>
                    <div className="text-lg font-semibold">
                      {Data.students && TutorName.class
                        ? students[0].StudentName
                        : Data.TutorName}
                    </div>
                    <div className="text-gray-600 mt-5">
                      {startTime.length != 0 && endTime.length != 0 && (
                        <div>
                          <div>
                            {format(startTime, 'HH:mm')} -{' '}
                            {format(endTime, 'HH:mm')}{' '}
                          </div>
                          <p>Teach Hours : {calculateHours()} hours</p>
                          <div>
                            Total : {calculateHours() * Data.TutorCost}฿
                          </div>
                        </div>
                      )}
                    </div>
                    {/* <div>
                  {Data.StartTime} - {Data.EndTime}{' '}
                </div>
                <p>Teach Hours : {Data.Hours} hours</p>
                <div>Total : {Data.Total}฿</div> */}
                    <div className=" flex mt-5">
                      <p className="text-gray-600">
                        Email :{' '}
                        {TutorName.class && Data.students
                          ? students[0].StudentEmail
                          : Data.TutorEmail}
                      </p>
                      <p
                        className=" text-emerald-700 font-semibold cursor-pointer ml-1"
                        onClick={handlelOpenChat}
                      >
                        {' '}
                        send message
                      </p>
                    </div>
                    <div className="text-gray-600 mt-5">
                      {TutorName.class && Data.students
                        ? `Phone: ${students[0].StudentPhone}`
                        : ''}
                    </div>
                    {/* <div className="text-gray-600 mt-5">
                  Age : {TutorName.class ? Data.StudentAge : Data.TutorAge}
                </div> */}
                    <div className="text-gray-600 mt-5">
                      {TutorName.class
                        ? `Learning : ${Data.TutorClass}`
                        : `Teaching : ${Data.TutorClass}`}
                    </div>
                  </div>
                ) : (
                  <div className="flex w-full ">
                    <div className="w-2/3">
                      <div className="text-2xl font-semibold">
                        {Data.TutorCourse}
                      </div>
                      <div className="text-lg font-semibold">
                        {Data.TutorName}
                      </div>
                      <div className="text-gray-600 mt-5">
                        <div>
                          <div>
                            {Data.StartTime} - {Data.EndTime}{' '}
                          </div>
                          <div>Total : {students.length * Data.TutorCost}฿</div>
                        </div>
                      </div>
                      <div className=" flex mt-5">
                        <p className="text-gray-600">
                          Email : {Data.TutorEmail}
                        </p>
                        <p
                          className=" text-emerald-700 font-semibold cursor-pointer ml-1"
                          onClick={handlelOpenChat}
                        >
                          {' '}
                          send message
                        </p>
                      </div>
                      <div className="text-gray-600 mt-5">
                        Teaching : {Data.TutorClass}
                      </div>
                    </div>
                    <div className=" w-1/2">
                      <div className="text-right text-2xl font-semibold flex justify-end">
                        ฿{Data.TutorCost}
                      </div>
                      <div className="flex justify-end">
                        Duration : {Data.Duration} Weeks
                      </div>

                      <div className="flex justify-end">
                        <div>Teaching time :</div>
                        <div className="ml-1">
                          {Data.StartTime} - {Data.EndTime}
                        </div>{' '}
                      </div>
                      <div className="flex justify-end mt-2">
                        {Object.entries(daysData).map(([day, isOpen]) => (
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
                        {Data.Type === 'group' ? (
                          <div
                            className="flex text-xl font-medium items-center border border-emerald-300 px-3 bg-emerald-200 p-1 text-gray-600 rounded-lg"
                            onClick={handleOpenStudents}
                          >
                            <div className="w-8 mr-2">
                              <UserGroupIcon />
                            </div>
                            <div className="flex">
                              {students.length}/ {Data.Participants}
                            </div>
                          </div>
                        ) : (
                          <div></div>
                        )}{' '}
                      </div>
                    </div>
                  </div>
                )}

                {rating && (
                  <div className=" border rounded-xl overflow-hidden mt-5">
                    <div className="bg-gray-400 text-white text-lg py-1 text-center">
                      Review
                    </div>
                    <div className=" my-1 mx-1">
                      <Ratingstar sendReview={handleStars} />
                    </div>
                    <div className="border px-1">
                      <Review sendReview={handleReview} />
                    </div>
                    <button
                      className=" bg-green-500 text-white px-4 py-2 w-full hover:bg-green-700 duration-300 whitespace-nowrap"
                      onClick={() => handleSubmitReview()}
                    >
                      Submit Review
                    </button>
                  </div>
                )}
              </div>
            </div>
            <div className="flex w-full mt-5 border-gray-700">
              <div className=" w-full">
                {Data.Status == 'pending' && userData !== undefined && (
                  <button
                    className=" bg-green-500 text-white px-4 py-2 w-full hover:bg-green-700 duration-300 whitespace-nowrap"
                    onClick={handleCreate}
                  >
                    Confirm Booking
                  </button>
                )}
                {Data.Status == 'confirmed' && userData !== undefined && (
                  <button
                    className=" bg-green-500 text-white px-4 py-2 w-full hover:bg-green-700 duration-300 whitespace-nowrap"
                    onClick={
                      Data.Status === 'confirmed' ? handleConfirm : handleCreate
                    }
                  >
                    Confirm Completed
                  </button>
                )}
              </div>
              <div className=" w-full">
                {Data.Status != 'completed' && userData !== undefined && (
                  <button
                    className=" bg-red-500 text-white px-4 py-2 w-full hover:bg-red-700 duration-300 whitespace-nowrap"
                    onClick={handleDelete}
                  >
                    Cancle Booking
                  </button>
                )}
              </div>
            </div>
            <div className=" w-full">
              {Data.Status == 'completed' && userData.school && (
                <button
                  className=" bg-red-500 text-white px-4 py-2 w-full hover:bg-red-700 duration-300 whitespace-nowrap"
                  onClick={handleOpenReview}
                >
                  Review This Tutor
                </button>
              )}
            </div>
          </div>

          {Timepicker && (
            <div className="absolute w-1/2 p-2 rounded-xl border-2 border-gray-400 bg-gray-100">
              <TimeRangePicker
                onStartTimeChange={handleStartTime}
                onEndTimeChange={handleEndTime}
              />
              <div
                className=" p-3 text-center bg-green-300 cursor-pointer"
                onClick={handleApply}
              >
                Apply
              </div>
            </div>
          )}
          {studentsList && (
            <div className="absolute w-1/2 p-2 rounded-xl border-2 border-gray-400 bg-gray-100">
              {students.map((student, index) => (
                <div key={index}>
                  {console.log(index, student.StudentName)}
                  {/* Render the student details */}
                  <div className="flex items-center bg-green-200 rounded-xl mt-2 border h-full">
                    <div className=" border bg-red-200 w-5/6 ">
                      <p>Name: {student.StudentName}</p>
                      <p>Email: {student.StudentEmail}</p>
                      <p>Phone: {student.StudentPhone}</p>
                      {/* Include other student details as needed */}
                    </div>
                    <div className="flex justify-center w-1/6 cursor-pointer bg-red-500 hover:bg">
                      <div className="">Delete</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  )
}
