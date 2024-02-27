import { React, useEffect, useState } from 'react'
import { storage } from './api/getimage'
import { ref, getDownloadURL } from 'firebase/storage'
import SearchBar from './component/SearchBar'
import Element from './component/element'
import Navbar from './component/Navbar'
import Tutorcard from './component/tutorcard'

const Tutor = () => {
  const [tutorsData, setTutorsData] = useState(null)
  const handleSearch = (searchText) => {
    console.log('ค้นหา: ', searchText)
  }
  const tutorsCount = tutorsData ? Object.entries(tutorsData).length : 0

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          process.env.NEXT_PUBLIC_GET_TUTOR,
        )

        if (response.ok) {
          const result = await response.json()
          setTutorsData(result.Tutors_data)
        } else {
          console.error('Failed to fetch tutors data')
        }
      } catch (error) {
        console.error('Error fetching tutors data:', error)
      }
    }

    fetchData()
  }, [])

  console.log(tutorsData)

  return (
    <div className=''>
      <Navbar />
      <div className="w-full flex justify-center bg-gradient-to-t from-cyan-600 to-green-400">
        <div className=" pt-14 w-3/4 h-full text-white">
          <div>
            <div className="mb-4 font-bold text-3xl">
              <h1>Find the best Tutor</h1>
            </div>
            <div className="text-xl mb-8">
              <h1>
                Find the best tutors in Bangkok. Get personalized one-on-one
                learning to boost your grades with our skilled Bangkok tutors.
                Get Test Prep and Homework assistance too.
              </h1>
            </div>
            
          </div>
          <div className="pb-8">

            </div>
        </div>
      </div>
      <div className="flex w-full justify-center bg-gray-50">
        <div className="w-3/4  flex space-x-5">
          <div className="w-1/3 ">
          </div>
          <div className="w-full font-semibold text-gray-500 mt-4 mb-3">
            {tutorsCount} Tutors Found
          </div>
        </div>
      </div>
      <div className="flex w-full justify-center bg-gray-50">
        <div className="w-3/4  flex space-x-5">
          <div className="w-1/3">
            <Element />
          </div>
          <div className='w-full'>
            {tutorsData &&
              Object.entries(tutorsData).map(([tutorName, tutorData]) => (
                <div key={tutorName} className="mb-5">
                  <Tutorcard tutorData={tutorData} />
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Tutor
