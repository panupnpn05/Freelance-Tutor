import { useState } from "react";
import { useEffect } from "react";
import { getDownloadURL } from "firebase/storage";
import { ref } from "firebase/storage";
import { storage } from "./api/getimage";

const AddProfilePage = () => {
  const [fullName, setFullName] = useState("John Doe");
  const [bio, setBio] = useState("");
  const [teachingMethodology, setTeachingMethodology] = useState("");
  const [teachingStyle, setTeachingStyle] = useState([]);
  const [profileImage, setProfileImage] = useState(null);
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [subject, setSubject] = useState("");
  const [tutorName, setTutorName] = useState("");

  useEffect(() => {
    const fetchProfileImage = async () => {
      try {
        if (tutorName) {
          const url = await getDownloadURL(
            ref(storage, `${tutorName.user_info.user_data.name}.jpg`)
          );
          console.log(url)
          setProfileImage(url);
        }
      } catch (error) {
        console.error("Error fetching profile image:", error);
      }
    };

    fetchProfileImage();
  }, [tutorName]);

  console.log(tutorName);
  useEffect(() => {
    const storedUserData = JSON.parse(localStorage.getItem("userData"));
    setTutorName(storedUserData);
  }, []);
  const handleFullNameChange = (event) => {
    setFullName(event.target.value);
  };

  const handleBioChange = (event) => {
    setBio(event.target.value);
  };

  const handleTeachingMethodologyChange = (event) => {
    setTeachingMethodology(event.target.value);
  };

  const handleTeachingStyleChange = (event) => {
    const selectedStyle = event.target.value;
    const isChecked = event.target.checked;

    if (isChecked) {
      setTeachingStyle([...teachingStyle, selectedStyle]);
    } else {
      setTeachingStyle(
        teachingStyle.filter((style) => style !== selectedStyle)
      );
    }
  };

  console.log(tutorName);
  console.log(profileImage);

  const handleImageChange = (event) => {
    const imageFile = event.target.files[0];
    setProfileImage(imageFile);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePhoneNumberChange = (event) => {
    setPhoneNumber(event.target.value);
  };

  const handleSubjectChange = (event) => {
    setSubject(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Upload image and send data to the database
  };
  const [course, setCourse] = useState("");

  const handleCourseChange = (event) => {
    setCourse(event.target.value);
  };

  return (
    <div className="container mx-auto mt-8">
      <h1 className="text-3xl font-semibold mb-4 text-center">Edit Profile</h1>
      <form onSubmit={handleSubmit} className="max-w-lg mx-auto">
        <div className="mb-4">
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
            className="mt-1 p-2 block w-3/4 border border-gray-300 rounded-md"
          />
        </div>
        <div className="mb-4 flex items-center">
          <label
            htmlFor="profileImage"
            className="block text-sm font-medium text-gray-700 mr-2"
          >
            Profile Image(รูปโปรไฟล์):
          </label>
          <input
            type="file"
            id="profileImage"
            accept="image/*"
            onChange={handleImageChange}
            className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
          />
        </div>
        {profileImage && (
          <div className="mb-4 flex items-center">
            <img
              src={profileImage}
              alt="Profile Image"
              className="w-32 h-32 rounded-full mr-4"
            />
            <span>{fullName}</span>
          </div>
        )}

        <div className="mb-4">
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
        <div className="mb-4">
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
            className="mt-1 p-2 block w-2/5 border border-gray-300 rounded-md"
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
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Teaching Style:
          </label>
          <div className="mt-1">
            <label className="inline-flex items-center">
              <input
                type="checkbox"
                value="Online"
                checked={teachingStyle.includes("Online")}
                onChange={handleTeachingStyleChange}
                className="form-checkbox h-5 w-5 text-indigo-600"
              />
              <span className="ml-2">Online</span>
            </label>
            <label className="inline-flex items-center ml-6">
              <input
                type="checkbox"
                value="Onsite"
                checked={teachingStyle.includes("Onsite")}
                onChange={handleTeachingStyleChange}
                className="form-checkbox h-5 w-5 text-indigo-600"
              />
              <span className="ml-2">Onsite</span>
            </label>
          </div>
        </div>
        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700"
          >
            Email(อีเมล):
          </label>
          <input
            type="email"
            id="email"
            value={tutorName && tutorName.user_info.user_data.email}
            onChange={handleEmailChange}
            className="mt-1 p-2 block w-3/5 border border-gray-300 rounded-md"
          />
        </div>
        <div className="mb-4">
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
            className="mt-1 p-2 block w-2/5 border border-gray-300 rounded-md"
          />
        </div>

        <button
          type="submit"
          className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
        >
          Save Change
        </button>
      </form>
    </div>
  );
};

export default AddProfilePage;
