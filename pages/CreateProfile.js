import { useState } from 'react'
import { useEffect } from 'react'
import { getDownloadURL } from 'firebase/storage'
import { ref } from 'firebase/storage'
import { storage } from './api/getimage'
import Swal from 'sweetalert2'
import Navbar from './component/Navbar'

const AddProfilePage = () => {
  const [fullName, setFullName] = useState()
  const [oldName, setOldName] = useState()
  const [bio, setBio] = useState()
  const [teachingMethodology, setTeachingMethodology] = useState('')
  const [teachingStyle, setTeachingStyle] = useState([])
  const [profileImage, setProfileImage] = useState(null)
  const [email, setEmail] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [subject, setSubject] = useState('')
  const [tutorName, setTutorName] = useState('')
  const [file, setFile] = useState({
    courseImage: null,
    imagePreview: null,
  })

  const handleFileChange = (e) => {
    const file = e.target.files[0]
    setFile((prevData) => ({
      ...prevData,
      courseImage: file,
      imagePreview: URL.createObjectURL(file),
    }))
  }

  const openFileInput = () => {
    document.getElementById('fileInput').click()
  }

  useEffect(() => {
    const fetchProfileImage = async () => {
      try {
        if (tutorName) {
          const url = await getDownloadURL(
            ref(storage, `${tutorName.user_info.user_data.name}.jpg`),
          )
          console.log(url)
          setProfileImage(url)
        }
      } catch (error) {
        console.error('Error fetching profile image:', error)
      }
    }

    fetchProfileImage()
  }, [tutorName])

  console.log(tutorName)
  useEffect(() => {
    const storedUserData = JSON.parse(localStorage.getItem('userData'))
    setTutorName(storedUserData)
    setFullName(storedUserData.user_info.user_data.name)
    setBio(storedUserData.user_info.user_data.description)
    setSubject(storedUserData.user_info.user_data.class)
    setEmail(storedUserData.user_info.user_data.email)
    setOldName(storedUserData.user_info.user_data.name)
    if(storedUserData.user_info.user_data.phoneNumber && storedUserData.user_info.user_data.teachMethod){
      setTeachingMethodology(storedUserData.user_info.user_data.teachMethod)
      setPhoneNumber(storedUserData.user_info.user_data.phoneNumber)
    }
  }, [])
  const handleFullNameChange = (event) => {
    setFullName(event.target.value)
  }

  const handleBioChange = (event) => {
    setBio(event.target.value)
  }

  const handleTeachingMethodologyChange = (event) => {
    setTeachingMethodology(event.target.value)
  }

  const handleTeachingStyleChange = (event) => {
    setTeachingStyle(event.target.value)
  }

  console.log(fullName)
  console.log(profileImage)

  console.log(tutorName);
  console.log(profileImage);

  const handleImageChange = (event) => {
    const imageFile = event.target.files[0]
    setProfileImage(imageFile)
  }

  const handleEmailChange = (event) => {
    setEmail(event.target.value)
  }

  const handlePhoneNumberChange = (event) => {
    setPhoneNumber(event.target.value)
  }

  const handleSubjectChange = (event) => {
    setSubject(event.target.value)
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    // Upload image and send data to the database
  }
  const [course, setCourse] = useState('')

  const handleTypeChange = (event) => {
    setCourse(event.target.value)
  }

  const handleSaveChange = async () => {
    try {
      bio
      const formData = new FormData()

      // formData.append('Fullname', fullName)
      formData.append('Class', subject)
      formData.append('Description', bio)
      formData.append('TeachMethod', teachingMethodology)
      formData.append('PhoneNumber', phoneNumber)

      // Make a POST request to the /update_tutor/{old_name} endpoint
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_UPDATE_TUTOR}/${oldName}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(Object.fromEntries(formData)),
        },
      )
      console.log(JSON.stringify(FormData))
      console.log(response)
      if (!response.ok) {
        throw new Error('Network response was not ok')
      }

      const data = await response.json()
      console.log(data) // Log the response data
      if (file.courseImage !== null) {
        try {
          // Make the second request to upload the image
          formData.delete('file') // Remove previous 'file' entry
          formData.append('file', file.courseImage)

          const uploadResponse = await fetch(
            `${process.env.NEXT_PUBLIC_UPLOAD_TUTOR_PROFILE}/${fullName}`,
            {
              method: 'POST',
              body: formData,
            },
          )

          if (uploadResponse.ok) {
            const uploadData = await uploadResponse.json()
            console.log(uploadData)
            localStorage.removeItem('userData')
            Swal.fire({
              title: 'Edit profile successful',
              text: 'Please signin again',
              icon: 'success',
              confirmButtonText: "Ok",
            }).then((result) => {
              if (result.isConfirmed){
                window.location.href = '/';
              }
            })
          } else {
            console.error('Error uploading image')
            Swal.fire({
              title: 'Sign up failed',
              text: 'Please wait a minute and try again',
              icon: 'error',
              confirmButtonText: "Ok",
            }).then((result) => {
              if (result.isConfirmed){
                Swal.close()
              }
            }) 
          }
        } catch (error) {
          console.error('Error uploading image', error)
        }
      } else {
        // try {
        //   // Send the request with the old image URL
        //   const uploadResponse = await fetch(
        //     `${process.env.NEXT_PUBLIC_RENAME_IMAGE}/${oldName}/${fullName}`,
        //     {
        //       method: 'PUT',
        //     },
        //   )

        //   if (uploadResponse.ok) {
        //     const uploadData = await uploadResponse.json()
        //     console.log(uploadData)
        //     localStorage.removeItem('userData')
        //     Swal.fire({
        //       title: 'Edit profile successful',
        //       text: 'Please signin again',
        //       icon: 'success',
        //       confirmButtonText: "Ok",
        //     }).then((result) => {
        //       if (result.isConfirmed){
        //         window.location.href = '/';
        //       }
        //     })
        //   } else {
        //     console.error('Error uploading image')
        //     Swal.fire({
        //       title: 'Sign up failed',
        //       text: 'Please wait a minute and try again',
        //       icon: 'error',
        //       confirmButtonText: "Ok",
        //     }).then((result) => {
        //       if (result.isConfirmed){
        //         Swal.close()
        //       }
        //     }) 
        //   }
        // } catch (error) {
        //   console.error('Error uploading image', error)
        // }
      }
    } catch (error) {
      console.error('There was a problem with the fetch operation:', error)
    }
  }

  return (
    <div>
    <Navbar/>
    <div className="w-full bg-gray-200 py-5 flex justify-center items-center">
      <div className=' bg-white w-2/5 rounded-xl px-7 py-3'>
      <h1 className="text-3xl font-semibold text-center">Edit Profile</h1>
      <form onSubmit={handleSubmit} className="max-w-lg">
        {/* <div className="mb-4">
          <label
            htmlFor="fullName"
            className="block text-sm font-medium text-gray-700"
          >
            Full Name(ชื่อเต็ม):
          </label>
          <input
            type="text"
            id="fullName"
            value={tutorName && tutorName.user_info.user_data.name}
            onChange={handleFullNameChange}
            className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
          />
        </div> */}
        <div className="mb-4 flex items-center mt-4">
          <label
            htmlFor="profileImage"
            className="block text-sm font-medium text-gray-700 mr-2"
          >
            Profile Image(รูปโปรไฟล์):
          </label>
        </div>
        <div className=''>
        <div
          id="imageCircle"
          onClick={openFileInput}
          className={`w-40 h-40 rounded-full overflow-hidden relative cursor-pointer flex justify-center items-center border hover:bg-gray-200 duration-150`}
        >
          <div className="relative w-full h-full">
            <img
              id="previewImage"
              src={
                file.imagePreview !== null ? file.imagePreview : profileImage
              }
              alt=""
              className="w-full h-full object-cover z-10 rounded-full absolute inset-0"
            />
            {/* Overlay to dim the image */}
            <div className="absolute inset-0 z-20 bg-black opacity-0 hover:opacity-20 transition-opacity duration-150"></div>
          </div>
          <span className="z-0 text-white absolute">Select course Image</span>
          <input
            type="file"
            id="fileInput"
            accept="image/*"
            placeholder=""
            onChange={handleFileChange}
            className="hidden"
          />
        </div>
        </div>

        <div className="mb-4 mt-4">
          <label
            htmlFor="bio"
            className="block text-sm font-medium text-gray-700"
          >
            Bio(ประวัติส่วนตัว):
          </label>
          <textarea
            id="bio"
            value={bio}
            onChange={handleBioChange}
            className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
          />
        </div>
        <div className=' flex w-full space-x-4'>
        <div className="mb-4 w-full">
          <label
            htmlFor="subject"
            className="block text-sm font-medium text-gray-700"
          >
            Subject(วิชาที่สอน):
          </label>
          <select
            id="subject"
            value={tutorName && tutorName.user_info.user_data.class}
            onChange={handleSubjectChange}
            className="p-2 block w-full border border-gray-300 rounded-md"
          >
            <option value=""></option>
            <option value="math">Mathematics</option>
            <option value="science">Science</option>
            <option value="english">English</option>
            <option value="chinese">Chinese</option>
            <option value="japan">Japanese</option>
            <option value="biology">Biology</option>
            <option value="coding">Coding</option>
            <option value="thai">Thai</option>
          </select>
        </div>
        <div className="mb-4 w-full">
          <label
            htmlFor="phoneNumber"
            className="block text-sm font-medium text-gray-700"
          >
            Phone Number(เบอร์โทรศัพท์):
          </label>
          <input
            type="tel"
            id="phoneNumber"
            value={phoneNumber}
            onChange={handlePhoneNumberChange}
            className="p-2 block border w-full border-gray-300 rounded-md"
          />
        </div>
        </div>
        <div className="mb-4">
          <label
            htmlFor="course"
            className="block text-sm font-medium text-gray-700"
          >
            Course(วันที่สะดวกสอน):
          </label>
          <textarea
            id="course"
            value={course}
            onChange={handleCourseChange}
            className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="teachingMethodology"
            className="block text-sm font-medium text-gray-700"
          >
            Teaching Methodology(วิธีการสอน):
          </label>
          <textarea
            id="teachingMethodology"
            value={teachingMethodology}
            onChange={handleTeachingMethodologyChange}
            className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
          />
        </div>

        <button
          type="submit"
          className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
          onClick={handleSaveChange}
        >
          Save Change
        </button>
      </form>
      </div>
    </div>
    </div>
  )
}

export default AddProfilePage
