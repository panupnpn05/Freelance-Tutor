import Image from 'next/image'
import { useState, useEffect } from 'react'
import { storage } from '../api/getimage'
import { ref, getDownloadURL } from 'firebase/storage'
import { useRouter } from 'next/router'
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
  StarIcon,
} from '@heroicons/react/24/solid'

export default function Tutorcard({ tutorData }) {
  const [imageUrl, setImageUrl] = useState('')
  const [rating, setRating] = useState()
  const [review, setReview] = useState()
  const [opencourse, setOpencourse] = useState(false)

  useEffect(() => {
    const fetchImage = async () => {
      try {
        const url = await getDownloadURL(
          ref(storage, `${tutorData.Course}.jpg`),
        )
        setImageUrl(url)

        const response = await fetch(
          `${process.env.NEXT_PUBLIC_GET_RATING}/${tutorData.TutorName}`,
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
          },
        )
        const result = await response.json()
        setRating(result.average_rating)
      } catch (error) {
        console.error('Error fetching image:', error)
      }
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_GET_REVIEW}/${tutorData.TutorName}/reviews`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        },
      )
      const result = await response.json()
      setReview(result)
    }
    fetchImage()
  }, [tutorData])

  const router = useRouter()

  const handleBooking = (tutorData) => {
    if (review) {
      tutorData.review = review.reviews;
    }
    tutorData.imageUrl = imageUrl;
    router.push({
      pathname: '/component/tutorBooking',
      query: { tutorData: JSON.stringify(tutorData) },
    });
  };

  const daysData = JSON.parse(tutorData.Days)

  const handleOpenCourse = () => {
    setOpencourse(!opencourse)
  }

  console.log(rating)
  return (
    <>
      <div
        className="bg-white shadow-xl  rounded-xl overflow-hidden w-full hover:bg-slate-100 duration-200 cursor-pointer"
        onClick={() => handleBooking(tutorData)}
        >
        <div className="flex pt-5 space-x-8 px-6">
          <div className=" w-32 h-32 rounded-full overflow-hidden relative grow-0 shrink-0">
            <Image src={imageUrl} fill style={{ objectFit: 'cover' }} />
          </div>
          <div className="w-full">
            <div className="flex justify-between">
              <div>
                <div className="text-2xl font-semibold">{tutorData.Course}</div>
                <div className="text-lg text-gray-600 ">
                  {tutorData.TutorName}
                </div>
                <div className="text-gray-600 mt-1">Bangkok, Thailand</div>
                <div className="flex space-x-3 mt-2">
                  <div className=" text-md text-gray-600 flex items-center ">
                    <BookOpenIcon className=" w-3 mr-1" /> : {tutorData.Type}
                  </div>
                  <div className="text-gray-600 flex items-center mt-1">
                    <BriefcaseIcon className=" w-3 mr-1" /> :{' '}
                    {tutorData.TutorClass}
                  </div>
                </div>

                <div className="text-gray-600 flex items-center">
                  <EnvelopeIcon className=" w-3 mr-1" /> :{' '}
                  {tutorData.TutorEmail}
                </div>
                <div className="text-gray-600">Teach {tutorData.Location}</div>
              </div>
              <div className="w-1/2">
                <div className="text-right text-2xl font-semibold flex justify-end">
                  ฿{tutorData.Cost}
                  {tutorData.Type === 'hourly' && <div>/hr</div>}
                </div>
                {tutorData.Type !== 'hourly' && (
                  <div className="flex justify-end">
                    Duration : {tutorData.Duration} Weeks
                  </div>
                )}

                <div className="flex justify-end">
                  {tutorData.Type !== 'hourly' ? (
                    <div>Teaching time :</div>
                  ) : (
                    <div>Available time :</div>
                  )}
                </div>
                <div className="flex flex-col items-end mt-2">
                  {Object.entries(daysData).map(([day, timeData]) => (
                    <div key={day} className="text-center">
                      {timeData && timeData.startTime && timeData.endTime && (
                        <div className="border border-emerald-300 w-44 py-2 rounded-lg bg-emerald-200 font-medium mt-1">
                          {`${day.substring(0, 3)} : ${timeData.startTime} - ${
                            timeData.endTime
                          }`}
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                <div className="flex justify-end mt-2 ">
                  {tutorData.Type === 'group' ? (
                    <div className="flex text-xl font-medium items-center border border-emerald-300 px-3 bg-emerald-200 p-1 text-gray-600 rounded-lg">
                      <div className="w-8 mr-2">
                        <UserGroupIcon />
                      </div>
                      <div className="flex">
                        {tutorData.students ? (
                          <div>{tutorData.students}</div>
                        ) : (
                          <div className="mr-1">0</div>
                        )}
                        / {tutorData.Participants}
                      </div>
                    </div>
                  ) : (
                    <div></div>
                  )}{' '}
                </div>
              </div>
            </div>

            <div className="text-xl font-semibold mt-5">
              {tutorData.Description}
            </div>
            {/* <p className="text-gray-600 mt-2">
              John is a software engineer with over 10 years of experience in
              developing web and mobile applications. He is skilled in
              JavaScript, React, and Node.js.
            </p> */}
          </div>
        </div>

        <div className="flex mt-5">
          <div className="border-t border-dashed border-gray-300  w-full items-center px-4 flex justify-between">
            <div className="flex space-x-2">
              <CheckBadgeIcon className=" w-6 text-gray-600" />
              {tutorData.Type === 'group' ? (
                <UserGroupIcon className="w-6 text-gray-600" />
              ) : tutorData.Type === 'individual' ? (
                <UserIcon className="w-6 text-gray-600" />
              ) : (
                <ClockIcon className="w-6 text-gray-600" />
              )}
              {tutorData.Location === 'online' ? (
                <ComputerDesktopIcon className=" w-6 text-gray-600 " />
              ) : (
                <MapPinIcon className=" w-6 text-gray-600 " />
              )}
            </div>
            <div className="flex items-center spa">
              <StarIcon className="w-6 ml-1 text-yellow-500" />
              {rating}
            </div>
          </div>
          <div className=" w-1/3 flex">
            <button
              className=" bg-green-500 w-full text-white px-4 py-2 hover:bg-green-700 duration-300 whitespace-nowrap"
              onClick={() => handleBooking(tutorData)}
            >
              Booking
            </button>
          </div>
        </div>
      </div>
    </>
  )
}
