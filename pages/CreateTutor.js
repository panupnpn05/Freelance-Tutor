import { useState } from "react";
import Navbar from "./component/Navbar";
const CreateUserForm = () => {
  const [formData, setFormData] = useState({
    phoneNumber: "",
    firstName: "",
    lastName: "",
    birthDate: "",
    subjectTaught: "",
    description: "",
    teachingMethodology: "",
    hourRate: 0,
    classes: "",
    profileImage: null,
    imagePreview: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData((prevData) => ({
      ...prevData,
      profileImage: file,
      imagePreview: URL.createObjectURL(file),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // ส่วนการส่งข้อมูลไปยังเซิร์ฟเวอร์
    } catch (error) {
      console.error("Error:", error);
    }
  };
  const subjects = [
    { value: "math", label: "Mathematics" },
    { value: "science", label: "Science" },
    { value: "english", label: "English" },
    { value: "chinese", label: "Chinese" },
    { value: "japan", label: "Japanese" },
    { value: "biology", label: "Biology" },
    { value: "coding", label: "Coding" },
    { value: "thai", label: "Thai" },
  ];
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
                value={formData.firstName}
                onChange={handleChange}
                className="form-input mt-1 w-full border border-gray-300 rounded-md"
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-2">Last Name</label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                className="form-input mt-1 w-full border border-gray-300 rounded-md"
              />
            </div>
          </div>
      <div className="grid grid-cols-2 gap-4">
          <label className="block mt-4">
            <div>Date of Birth</div>
            <input
              type="date"
              name="birthDate"
              value={formData.birthDate}
              onChange={handleChange}
              className="form-input mt-1 w-3/5 border border-gray-300 rounded-md"
            />
          </label>
          <label className="block mt-4">
          <div>
            Hourly Rate ฿/hr
            </div>
            <input
              type="text"
              name="hourRate"
              value={formData.hourRate.toString()}
              onChange={handleChange}
              className="form-input mt-1 shadow-md border border-gray-300 rounded-md w-2/5"
            />
          </label>
          </div>
        </div>
          <div className="mb-6">
            <h2 className="text-lg font-semibold text-green-600 mb-4">
              Teaching Information
            </h2>
            <div className="flex">
              <div className="col-span-2">
                <label className="block text-gray-700 mb-2">Description</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  className="form-textarea mt-1 shadow-md border border-gray-300 rounded-md"
                />
              </div>
            </div>
        </div>
        <label className="block text-gray-700 mb-2">Subject</label>
<select
  name="subjectTaught"
  value={formData.subjectTaught}
  onChange={handleChange}
  className="form-select mt-1 w-2/5 shadow-md border border-gray-300 rounded-md"
>
  <option value="">Select subject</option>
  {subjects.map((subject) => (
    <option key={subject.value} value={subject.value}>
      {subject.label}
    </option>
  ))}
</select>


        {/* Profile Image */}
        <div className="mb-6">
          <label className="block text-gray-700 mb-2">Profile Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="mt-1 w-full"
          />
        </div>
        {formData.imagePreview && (
          <img
            src={formData.imagePreview}
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
  );
};

export default CreateUserForm;
