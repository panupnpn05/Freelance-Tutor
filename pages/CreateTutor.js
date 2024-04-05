import { useState } from 'react'
import Navbar from './component/Navbar'
import Swal from 'sweetalert2'

const CreateUserForm = () => {
  const [showPassword, setShowPassword] = useState(false)
  const [firstName , setFirstName] = useState('')
  const [lastName ,setLastName] = useState("")
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [dob, setDob] = useState('')
  const [cost, setCost] = useState('')
  const [description, setDescription] = useState('')
  const [classes, setSubject] =useState('')
  const [file, setFile] = useState({
    profileImage: null,
    imagePreview: null,
  });


  const handleShowPassword = () => {
    setShowPassword(!showPassword)
  }

  const formatDOB = (input) => {
    // Remove non-numeric characters from the input
    const numericInput = input.replace(/[^0-9/]/g, '')

    // Apply your desired format
    const formattedDOB = numericInput.replace(
      /(\d{2})(\d{2})(\d{4})/,
      '$1/$2/$3',
    )

    return formattedDOB
  }

  const handleDOBInputChange = (e) => {
    const input = e.target.value
    const formattedDOB = formatDOB(input)
    setDob(formattedDOB)
  }

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFile((prevData) => ({
      ...prevData,
      profileImage: file,
      imagePreview: URL.createObjectURL(file),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault()
    const fullname = firstName + ' ' + lastName
    try {
     
      try {
        const response = await fetch(process.env.NEXT_PUBLIC_CREATE_REQUEST_TUTOR_API, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ fullname, email, password, dob, cost , description , classes }),
        })
        const result = await response.json()
        console.log(result)
      } catch (error) {
        console.error('Error during create user', error)
      }
      try {
        const formData = new FormData();
      formData.append('file', file.profileImage);

        const response = await fetch(`${process.env.NEXT_PUBLIC_UPLOAD_TUTOR_PROFILE}/${fullname}`,{
          method: 'POST',
          body: formData,
        });
        if (response.ok) {
          const data = await response.json();
          console.log(data);
          // Handle success, e.g., show a success message or redirect
        } else {
          // Handle error, e.g., show an error message
          console.error('Error uploading image');
        }
      } catch (error){
        console.error('Error uploading image', error);
      }
      Swal.fire({
        title: 'Request Created',
        text: 'Please wait for admin approve',
        icon: 'success',
        confirmButtonText: "Ok",
      }).then((result) => {
        if (result.isConfirmed){
          window.location.href = '/';
        }
      }) 
    } catch (error) {
      Swal.fire({
        title: 'Create request failed',
        text: 'Please wait a minute and try again',
        icon: 'error',
        confirmButtonText: "Ok",
      }).then((result) => {
        if (result.isConfirmed){
          window.location.href = '/';
        }
      }) 
      console.error('Error:', error)
    }
  }
  const subjects = [
    { value: 'math', label: 'Mathematics' },
    { value: 'science', label: 'Science' },
    { value: 'english', label: 'English' },
    { value: 'chinese', label: 'Chinese' },
    { value: 'japan', label: 'Japanese' },
    { value: 'biology', label: 'Biology' },
    { value: 'coding', label: 'Coding' },
    { value: 'thai', label: 'Thai' },
  ]
  // const handleChange = (e) => {
  //   const { name, value } = e.target;
  //   setFormData((prevData) => ({
  //     ...prevData,
  //     [name]: value,
  //   }));
  // };

  return (
    <div>
      <Navbar/>
      <div className='bg-cover bg-center bg-no-repeat p-8' style={{ backgroundImage: 'url("/Image/photo1.avif")' }}>
        <div className='mt-8'>
          <form 
            onSubmit={handleSubmit}
            className="max-w-lg mx-auto p-8 border rounded-lg shadow-lg bg-white"
          >
            <div className="text-center mb-8">
          <h1 className="text-3xl font-semibold text-green-600 mb-2">
            Welcome to Tutor Registration
          </h1>
          <p className="text-gray-600">
            Join us and start your tutoring journey today!
          </p>
        </div>

        {/* Personal Information */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-green-600 mb-4">
            Personal Information
          </h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700 mb-2">First Name</label>
              <input
                type="text"
                name="firstName"
                onChange={(e) => setFirstName(e.target.value)}
                className="h-11 w-full pl-5 pr-4 border-b border-gray-600 rounded-lg drop-shadow outline-none"
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-2">Last Name</label>
              <input
                type="text"
                name="lastName"
                onChange={(e) => setLastName(e.target.value)}
                className="h-11 w-full pl-5 pr-4 border-b border-gray-600 rounded-lg drop-shadow outline-none"
              />
            </div>
          </div>
          <div>
            <label className="block text-gray-700 mb-2">Email</label>
            <input
              type="text"
              name="email"
              onChange={(e) => setEmail(e.target.value)}
              className="h-11 w-full pl-5 pr-4 border-b border-gray-600 rounded-lg drop-shadow outline-none"
            />
            <div>
              <label className="block text-gray-700">Password</label>
              <div className=" flex items-center">
                <input
                  type={showPassword === true ? 'text' : 'password'}
                  name="password"
                  onChange={(e) => setPassword(e.target.value)}
                  className="h-11 w-full pl-5 pr-4 border-b border-gray-600 rounded-lg drop-shadow outline-none"
                />
                <div onClick={handleShowPassword} className=" cursor-pointer pl-1">
                  show
                </div>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <label className="block mt-4">
              <div>Date of Birth</div>
              <input
                type="text"
                placeholder="Date of Birth (DD/MM/YYYY)"
                className="h-11 w-full pl-5 pr-4 border-b border-gray-600 rounded-lg drop-shadow outline-none"
                value={dob}
                onChange={handleDOBInputChange}
              />
            </label>
            <label className="block mt-4">
              <div>Hourly Rate ฿/hr</div>
              <input
                type="text"
                name="hourRate"
                onChange={(e) => setCost(e.target.value)}
                className="h-11 w-full pl-5 pr-4 border-b border-gray-600 rounded-lg drop-shadow outline-none"
              />
            </label>
          </div>
        </div>
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-green-600 mb-4">
            Teaching Information
          </h2>
          <div className="">
            <div className="col-span-2">
              <label className="block text-gray-700 mb-2">Description</label>
              <textarea
                name="description"
                onChange={(e) => setDescription(e.target.value)}
                className="h-11 w-full pl-5 pr-4 border-b border-gray-600 rounded-lg drop-shadow outline-none"
              />
            </div>
          </div>
        </div>
        <label className="block text-gray-700 mb-2">Subject</label>
        <select
          name="subjectTaught"
          onChange={(e) => setSubject(e.target.value)}
          className="h-11 w-full pl-5 pr-4 border-b border-gray-600 rounded-lg drop-shadow outline-none"
        >
          <option value="">Select subject</option>
          {subjects.map((subject) => (
            <option key={subject.value} value={subject.value}>
              {subject.label}
            </option>
            
          ))}
        </select>

        {/* Profile Image */}
        <div className="mb-6 mt-4">
          <label className="block text-gray-700 mb-2">Profile Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="mt-1 w-full"
          />
        </div>
        {file.imagePreview && (
        <img
          src={file.imagePreview}
          alt="Profile Preview"
          className="max-w-xs mb-4 mx-auto"
        />
      )}

        {/* Sign Up Button */}
        <div className="text-center">
          <button
            type="submit"
            className="bg-green-600 text-white px-6 py-3 rounded hover:bg-green-700 mt-4"
          >
            Sign Up
          </button>
        </div>
      </form>
    </div>
    </div>
    </div>
  )
}

export default CreateUserForm
