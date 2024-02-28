import Image from 'next/image'
import { useState, useEffect } from 'react'
import { storage } from '../api/getimage'
import { ref, getDownloadURL } from 'firebase/storage'
import userImg from '@/public/Image/userImg.jpeg';
import TimeRangePicker from './timePicker'
import format from 'date-fns/format'
import Acceptbutton from './acceptbutton';
import Rejectbutton from './rejectbutton';

export default function RequestApprovecard({
  tutorData,
  status,
  updateList,
  userData,
  openChat,
}) 
{
  const [imageUrl, setImageUrl] = useState('')
  const [Data, setData] = useState([])
  const [TutorName, setTutorName] = useState([])
  const [startTime, setStartTime] = useState([])
  const [endTime, setEndTime] = useState([])
  const [Timepicker, setTimePicker] = useState(false)

  console.log(startTime.length, endTime.length)
  const handleCreate = async () => {
    setTimePicker(!Timepicker)
  }

  const handleStartTime = (startTime) => {
    setStartTime(startTime)
  }
  const handleEndTime = (endTime) => {
    setEndTime(endTime)
  }

  const calculateHours = () => {
    console.log(startTime)
    console.log(endTime)
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
  let FormData = {}; // Initialize FormData here

  if (Data) {
    FormData = {
      tutorFullname: Data.TutorName,
      tutorEmail: Data.TutorEmail,
      tutorAge: Data.TutorAge,
      tutorClasses: Data.TutorClass,
      tutorCost: Data.TutorCost,
      tutorDescription: Data.TutorDescription,
      studentFullname: Data.StudentName,
      studentEmail: Data.StudentEmail,
      studentAge: Data.StudentAge,
      studentPhone: Data.StudentPhone,
      studentSchool: Data.StudentSchool,
      date: Data.Date,
      id: tutorData,
    }
  }

  const handleApply = async () => {
    FormData.startTime = format(startTime, 'HH:mm')
    FormData.endTime = format(endTime, 'HH:mm')
    ;(FormData.total = (calculateHours() * Data.TutorCost).toString()),
      (FormData.hours = calculateHours().toString())
    try {
      const response = await fetch(
        'https://testapi-test-1.fly.dev/create_confirmed_booking',
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

  const handleConfirm = async () => {
    FormData.startTime = Data.StartTime
    FormData.endTime = Data.EndTime
    FormData.total = Data.Total
    FormData.hours = Data.Hours
    try {
      const response = await fetch(
        'https://testapi-test-1.fly.dev/create_completed_booking',
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
        `https://testapi-test-1.fly.dev/delete_request_id/${status}/${Data.StudentName}/${Data.TutorName}/${tutorData}`,
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
            `https://testapi-test-1.fly.dev/get_booking_id/${status}/${tutorData}`,
            {
              method: 'GET',
            },
          )
          const Result = await response.json()
          console.log(Result)
          setData(Result.pending_id)

          if (storedUserData) {
            if (storedUserData.user_info.user_data.class) {
              const url = await getDownloadURL(
                ref(storage, `${Result.pending_id.StudentName}.jpg`),
              )
              setImageUrl(url)
            } else if (storedUserData.user_info.user_data.school) {
              const url = await getDownloadURL(
                ref(storage, `${Result.pending_id.TutorName}.jpg`),
              )
              setImageUrl(url)
            }
          }
        }
      } catch (error) {
        console.error('Error fetching image:', error)
      }
    }

    fetchImage()
  }, [tutorData])

  const handleOpenChat = () =>{
    openChat(Data)
  }

  return (
    <div>
      {Data && (
        <div className="relative">
          <div className="bg-white shadow-xl  rounded-xl overflow-hidden">
            <div className="flex pt-5 space-x-8 px-6">
              <div className=" w-32 h-32 rounded-full overflow-hidden relative grow-0 shrink-0">
                <Image src={imageUrl != '' ? imageUrl : userImg} fill style={{ objectFit: 'cover' }} />
              </div>
              <div className=" w-full">
                <div className="flex justify-between">
                  <div className="text-2xl font-semibold">
                    {TutorName.class ? Data.StudentName : Data.TutorName}
                  </div>
                  <div className="text-2xl font-semibold">{Data.Date}</div>
                </div>
                <div className="text-gray-600 mt-5">
                  {startTime.length != 0 && endTime.length != 0 && (
                    <div>
                      <div>
                        {format(startTime, 'HH:mm')} -{' '}
                        {format(endTime, 'HH:mm')}{' '}
                      </div>
                      <p>Teach Hours : {calculateHours()} hours</p>
                      <div>Total : {calculateHours() * Data.TutorCost}฿</div>
                    </div>
                  )}
                </div>
                <div>
                  {Data.StartTime} - {Data.EndTime}{' '}
                </div>
                <p>Teach Hours : {Data.Hours} hours</p>
                <div>Total : {Data.Total}฿</div>
                <div className=' flex mt-5'>
                <p className="text-gray-600">
                  Email :{' '}
                  {TutorName.class ? Data.StudentEmail : Data.TutorEmail}
                  {' '}/{" "}
                </p>
                <p className=' text-emerald-700 font-semibold cursor-pointer ml-1' onClick={handleOpenChat}>{" "}send message</p>
                </div>
                <div className="text-gray-600 mt-5">
                  {TutorName.class ? `Phone: ${Data.StudentPhone}` : ''}
                </div>
                <div className="text-gray-600 mt-5">
                  Age : {TutorName.class ? Data.StudentAge : Data.TutorAge}
                </div>
                <div className="text-gray-600 mt-5">
                  {TutorName.class
                    ? `Learning : ${Data.TutorClass}`
                    : `Teaching : ${Data.TutorClass}`}
                </div>
              </div>
            </div>
            <div>
            <div className="flex mt-5">
          <div className="border-t border-dashed border-gray-300  w-full"></div>
          <div className=" w-1/3 flex">
          <Acceptbutton/>
          <Rejectbutton/>
          </div>
        </div>
            </div>

            <div className="flex w-full mt-5 border-gray-700">
              <div className=" w-full">
              </div>
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
        </div>
      )}
    </div>
  );
};

