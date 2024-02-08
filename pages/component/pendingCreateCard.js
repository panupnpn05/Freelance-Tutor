import Image from 'next/image'
import { useState, useEffect } from 'react'
import { storage } from '../api/getimage'
import { ref, getDownloadURL } from 'firebase/storage'

export default function CreatePendingCard({ tutorData, updateList }) {
  const [className, setClassName] = useState('')
  const [classInfo, setClassInfo] = useState([])
  const [imageUrl, setImageUrl] = useState('')

  FormData = {
    fullname: tutorData.name,
    email: tutorData.email,
    password: tutorData.password,
    dob: tutorData.dob,
    classes: tutorData.class,
    cost: tutorData.cost,
    description: tutorData.description
  }
  console.log(FormData)
  
  const handleCreate = async () =>{
    try {
        const response = await fetch(process.env.NEXT_PUBLIC_CREATE_TUTOR_API, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(FormData),
        })
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
        const url = await getDownloadURL(ref(storage, `${tutorData.name}.jpg`))
        setImageUrl(url)
      } catch (error) {
        console.error('Error fetching image:', error)
      }
    }
    fetchImage()

    const firstClass = tutorData.Classes_data
      ? Object.entries(tutorData.Classes_data)[0]
      : null

    if (firstClass) {
      const [initialClassName, initialClassInfo] = firstClass
      setClassName(initialClassName)
      setClassInfo(initialClassInfo)
    }
  }, [tutorData])

  console.log(className, classInfo)
  // console.log(tutorData.name, imageUrl)
  return (
    <>
      <div className="bg-white shadow-xl  rounded-xl overflow-hidden">
        <div className="flex pt-5 space-x-8 px-6">
          <div className=" w-32 h-32 rounded-full overflow-hidden relative grow-0 shrink-0">
            <Image src={imageUrl} fill style={{ objectFit: 'cover' }} />
          </div>
          <div>
            <div className="flex justify-between">
              <div>
                <div className="text-2xl font-semibold">{tutorData.name}</div>
              </div>
              <div>
                <div className="text-right text-2xl font-semibold">
                  ฿{tutorData.cost}/hr
                </div>
              </div>
            </div>
            <div className="text-gray-600 mt-5">Email : {tutorData.email}</div>
            <div className="text-gray-600 mt-5">
              Date of Birth : {tutorData.dob}
            </div>
            <div className="text-gray-600 mt-5">Age : {tutorData.age}</div>
            <div className="text-gray-600 mt-5">
              Teaching : {tutorData.class}
            </div>

            <div className="text-base font-semibold mt-5">
              {tutorData.description}
            </div>
          </div>
        </div>

        <div className="flex w-full mt-5 border-gray-700">
          <div className=" w-full">
            <button className=" bg-green-500 text-white px-4 py-2 w-full hover:bg-green-700 duration-300 whitespace-nowrap" onClick={handleCreate}>
              Confirm Create Request
            </button>
          </div>
          <div className=" w-full">
            <button className=" bg-red-500 text-white px-4 py-2 w-full hover:bg-red-700 duration-300 whitespace-nowrap">
              Cancle Create Request
            </button>
          </div>
        </div>
      </div>
    </>
  )
}
