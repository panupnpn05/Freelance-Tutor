import { React, useEffect, useState } from 'react'
import { storage } from './api/getimage'
import { ref , getDownloadURL } from 'firebase/storage'
import SearchBar from './component/SearchBar'
import Element from './component/element'
import Navbar from './component/Navbar'
import Tutorcard from './component/tutorcard'

const Tutor = () => {
  const [tutorsData, setTutorsData] = useState(null)
  const handleSearch = (searchText) => {
    console.log('ค้นหา: ', searchText)
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          'http://127.0.0.1:8000/get_all_tutors_with_classes',
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
    <div>
      <Navbar />
      <div className="w-full flex justify-center">
        <div className="pt-32 w-3/4 bg-green-200">
          <div>
            <div className="mb-4 font-bold text-3xl">
              <h1>Tutors in Bangkok</h1>
            </div>
            <div className="text-xl mb-8">
              <h1>
                Find the best tutors in Bangkok. Get personalized one-on-one
                learning to boost your grades with our skilled Bangkok tutors.
                Get Test Prep and Homework assistance too.
              </h1>
            </div>
            <div className="mb-8">
              <SearchBar onSearch={handleSearch} />
            </div>
          </div>
        </div>
      </div>
      <div className="flex w-full justify-center">
        <div className="w-3/4 bg-red-200 flex">
          <div className="w-1/3 bg-orange-200">
            <Element />
          </div>
          <div>
            {tutorsData &&
              Object.entries(tutorsData).map(([tutorName, tutorData]) => (
                <div key={tutorName} className='mb-5'>
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
