import Image from 'next/image'
import { useState, useEffect } from 'react'
import { storage } from '../api/getimage'
import { ref, getDownloadURL } from 'firebase/storage'

export default function RequestBookingCard({ tutorData, updateList }) {
  const [className, setClassName] = useState('')
  const [classInfo, setClassInfo] = useState([])
  const [imageUrl, setImageUrl] = useState('')
  const [Data, setData] = useState([])
  const [TutorName, setTutorName] = useState([])

//   useEffect(() => {
//     const storedUserData = JSON.parse(localStorage.getItem('userData'));
//     setTutorName(storedUserData);
//   }, []);

  FormData = {
    fullname: tutorData.name,
    email: tutorData.email,
    password: tutorData.password,
    dob: tutorData.dob,
    classes: tutorData.class,
    cost: tutorData.cost,
    description: tutorData.description
  }
  console.log(TutorName)
  
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

  const handleDelete = async () =>{
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_DELETE_REQUEST}/${FormData.fullname}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
        })
        const result = await response.json()
        console.log(result)
        updateList()
      } catch (error) {
        console.error('Error during create user', error)
      }
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_DELETE_IMAGE}/${FormData.fullname}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
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
        const storedUserData = JSON.parse(localStorage.getItem('userData'));
        if (storedUserData) {
          setTutorName(storedUserData.user_info.user_data);
          const response = await fetch(`http://127.0.0.1:8000/get_booking_pending/${tutorData.bookingRequestId}`, {
            method: 'GET',
          });
          const Result = await response.json();
          console.log(Result);
          setData(Result.pending_id);

          if (storedUserData) {
            if (storedUserData.user_info.user_data.class) {
              const url = await getDownloadURL(ref(storage, `${Result.pending_id.StudentName}.jpg`));
              setImageUrl(url);
            } else if (storedUserData.user_info.user_data.school) {
              const url = await getDownloadURL(ref(storage, `${Result.pending_id.TutorName}.jpg`));
              setImageUrl(url);
            }
          }
        }
      } catch (error) {
        console.error('Error fetching image:', error);
      }
    };

    fetchImage();

    const firstClass = tutorData.Classes_data
      ? Object.entries(tutorData.Classes_data)[0]
      : null;

    if (firstClass) {
      const [initialClassName, initialClassInfo] = firstClass;
      setClassName(initialClassName);
      setClassInfo(initialClassInfo);
    }
  }, [tutorData]);

  console.log(Data)
  // console.log(tutorData.name, imageUrl)
  return (
    <>
      <div className="bg-white shadow-xl  rounded-xl overflow-hidden">
        <div className="flex pt-5 space-x-8 px-6">
          <div className=" w-32 h-32 rounded-full overflow-hidden relative grow-0 shrink-0">
            <Image src={imageUrl} fill style={{ objectFit: 'cover' }} />
          </div>
          <div className=' w-full'>
            <div className="flex justify-between">
                <div className="text-2xl font-semibold">{TutorName.class ? Data.StudentName : Data.TutorName }</div>
                <div className="text-2xl font-semibold">
                  ฿{Data.TutorCost}/hr
                </div>
            </div>
            <div className="text-gray-600 mt-5">
                  ฿{Data.TutorCost}/hr
                </div>
            <div className="text-gray-600 mt-5">Email : {TutorName.class ? Data.StudentEmail : Data.TutorEmail}</div>
            <div className="text-gray-600 mt-5">Age : {TutorName.class ? Data.StudentAge : Data.TutorAge}</div>
            <div className="text-gray-600 mt-5">
            {TutorName.class ? `Learning : ${Data.TutorClass}` : `Teaching : ${Data.TutorClass}`}
            </div>
          </div>
        </div>

        <div className="flex w-full mt-5 border-gray-700">
          <div className=" w-full">
            <button className=" bg-green-500 text-white px-4 py-2 w-full hover:bg-green-700 duration-300 whitespace-nowrap" onClick={handleCreate}>
              Confirm Request
            </button>
          </div>
          <div className=" w-full">
            <button className=" bg-red-500 text-white px-4 py-2 w-full hover:bg-red-700 duration-300 whitespace-nowrap" onClick={handleDelete}>
              Cancle Request
            </button>
          </div>
        </div>
      </div>
    </>
  )
}
