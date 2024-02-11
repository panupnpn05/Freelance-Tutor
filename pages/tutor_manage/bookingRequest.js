import { React, useEffect, useState } from 'react'
import { storage } from '../api/getimage'
import { ref , getDownloadURL } from 'firebase/storage'
import Navbar from '../component/Navbar'
import RequestBookingCard from '../component/bookingCard'

const Tutor = () => {
  const [tutorsData, setTutorsData] = useState(null)
  const [tutorName, setTutorName] = useState('')
  const [ID , setID] = useState()

  console.log(tutorsData)

  const tutorsCount = tutorsData ? Object.entries(tutorsData).length : 0

  const fetchData = async () => {
    try {
      const response = await fetch(process.env.NEXT_PUBLIC_GET_TUTOR_CREATE_PENDING);
  
      if (response.ok) {
        const result = await response.json();
        setTutorsData(result.Tutors_data);
  
        // Check if tutorName is not an empty string before making the second API call

          const IDresponse = await fetch(`${process.env.NEXT_PUBLIC_TUTOR_BOOKING_ID}/${tutorName.user_info.user_data.name}`, {
            method: 'POST', // Specify the HTTP method
          });
          const IDResult = await IDresponse.json();
          setID(IDResult)
          console.log("Booking ID response:", IDResult);
          // Handle the result as needed
      } else {
        console.error('Failed to fetch tutors data');
      }
    } catch (error) {
      console.error('Error fetching tutors data:', error);
    }
  };


  const handleUpdateList = () =>{
    fetchData()
  }
  
  useEffect(() => {
    const storedUserData = JSON.parse(localStorage.getItem('userData'));
    setTutorName(storedUserData);
  }, []);
  
  useEffect(() => {
    console.log(tutorName);
    fetchData();
  }, [tutorName]);
  

  return (
    <div className='h-screen'>
      <Navbar/>
      <div className="w-full flex justify-center bg-gradient-to-t from-emerald-800 to-green-400 mb-6 ">
        <div className=" pt-14 w-3/4 h-full text-white">
          <div>
            <div className="mb-4 font-bold text-3xl">
                {tutorsCount} Booking
            </div>
            {/* <div className="text-xl mb-8">
              <h1>
                Find the best tutors in Bangkok. Get personalized one-on-one
                learning to boost your grades with our skilled Bangkok tutors.
                Get Test Prep and Homework assistance too.
              </h1>
            </div> */}
            
          </div>
          <div className="pb-8">

            </div>
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
          <div className="w-1/3">
            <div className=' w-1/2 bg-red-200 p-3'>
              Request
            </div>
            <div>
              Upcoming
            </div>
            <div>
              Completed
            </div>
          </div>
          <div className='w-full'>
            {ID &&
              Object.entries(ID.pending_id).map(([IDindex, IDdata]) => (
                <div key={IDindex} className="mb-5">
                  <RequestBookingCard tutorData={IDdata} updateList={handleUpdateList} />
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Tutor
