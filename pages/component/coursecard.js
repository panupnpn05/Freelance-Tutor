// components/CourseCard.js

import { useState, useEffect } from "react";
import Image from "next/image";
import { getDownloadURL, ref } from "firebase/storage";
import { storage } from "../api/getimage";
import EditCourse from "./courseEdit";

const CourseCard = ({ course, id, updateCourseStatus }) => {
  const days = JSON.parse(course.Days);
  const [imageUrl, setImageUrl] = useState();
  const [OpenEdit, setEditcourse] = useState(false);
  const [status, setStatus] = useState()

  useEffect(() => {
    const fetchImage = async () => {
      const url = await getDownloadURL(ref(storage, `${course.Course}.jpg`));
      setImageUrl(url);
    };

    fetchImage();
  }, []);

  const handleOpenEdit = (data) => {
    setStatus(data)
    console.log(data)
    setEditcourse(!OpenEdit);
  };

  const handleClose = () => {
    setEditcourse(!OpenEdit);
  };

  const handleActivation = async (status) => {
    try {
      const newStatus = status === "active" ? "inactive" : "active";
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_UPDATE_STATUS}/${course.Courseid}/${newStatus}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        const result = await response.json();
        console.log(result);
        // Update the course status in the parent component
        updateCourseStatus(course.Courseid, newStatus);
        // Refresh the page after successfully updating the course status
        window.location.reload();
      } else {
        console.error("Error during update course status");
      }
    } catch (error) {
      console.error("Error during update course status", error);
    }
  };

  const handleDelete = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_DELETE_COURSE}/${course.TutorName}/${course.Courseid}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        // รีเฟรชหน้าหลังจากการลบคอร์สสำเร็จ
        window.location.reload();
      } else {
        console.error("Error during delete course");
      }
    } catch (error) {
      console.error("Error during delete course", error);
    }
  };
  useEffect(() => {
    if (OpenEdit) {
      window.scrollTo({ top: 0, left: 0 });
    }
  }, [OpenEdit]);

  const calculateHours = (startTime, endTime) => {
    const start = new Date(`2024-01-01 ${startTime}`);
    const end = new Date(`2024-01-01 ${endTime}`);
    const diff = (end - start) / (1000 * 60 * 60); // Convert milliseconds to hours
    return diff;
  };

  const daysWithData = Object.entries(days).filter(
    ([day, timeData]) => timeData && timeData.startTime && timeData.endTime
  );

  let totalHours = 0;
  daysWithData.forEach(([day, timeData]) => {
    const hours = calculateHours(timeData.startTime, timeData.endTime);
    totalHours += hours;
  });

  const Totalcoursehours = parseInt(course.Duration) * totalHours;

  console.log(course);

  return (
    <div
      className="h-full w-full"
      style={{ overflow: OpenEdit ? "hidden" : "auto" }}
    >
      <div
        className={`${
          course.status !== "inactive" ? "bg-white " : "bg-gray-100"
        } shadow-md rounded-lg overflow-hidden`}
      >
        <h2
          className={`text-xl ${
            course.status !== "inactive"
              ? "bg-green-400 border-b border-black "
              : "bg-gray-300 border-b border-black"
          } font-semibold mb-2 text-center py-2`}
        >
          {course.Course}
        </h2>

        <div className=" w-full flex justify-center items-center pt-2">
          <div className=" w-40 h-40 rounded-full overflow-hidden relative grow-0 shrink-0">
            <Image src={imageUrl} fill style={{ objectFit: "cover" }} />
          </div>
        </div>

        <div className=" px-4 pb-4">
          <p className="flex mb-3 mt-8 ">
            <strong className="flex mr-2">Teaching Format : </strong>{" "}
            {course.Type}
          </p>
          <p className="flex mb-3">
            <strong className="flex mr-2">Email : </strong> {course.TutorEmail}
          </p>
          <p className="flex mb-3">
            <strong className="flex mr-2">Teaching Mode : </strong>{" "}
            {course.Location === "onsite" ? "Onsite" : "Online"}
          </p>
          <strong className="mb-8">Days : </strong>{" "}
          <p className=" w-1/2 ">
            {daysWithData.map(([day, timeData]) => {
              const hours = calculateHours(
                timeData.startTime,
                timeData.endTime
              );
              return (
                <div key={day} className="text-center">
                  <div className="border rounded-lg overflow-hidden font-medium mt-1 flex bg-white">
                    <div className="w-4/12 py-1 bg-gray-200 flex justify-center items-center">
                      {day.substring(0, 3)}
                    </div>
                    <div className="w-10/12 py-1">
                      {`${timeData.startTime} - ${timeData.endTime}`}
                    </div>
                  </div>
                </div>
              );
            })}
          </p>
          {course.Type !== "hourly" && (
            <div className="mt-2">
              <p>
                <strong>Duration:</strong> {course.Duration} weeks (
                {Totalcoursehours} hours)
              </p>
              <p className="mt-2">
                <strong>Participants:</strong> {course.Participants}
              </p>
            </div>
          )}
          <p className="mt-2">
            <strong>Cost : </strong> {course.Cost}
          </p>
          <div className="flex justify-between mt-4">
            <div>
              <button
                className={`px-4 py-2 rounded-md mr-2 ${
                  course.status === "inactive"
                    ? "bg-green-500 text-white"
                    : "bg-gray-300 text-gray-700"
                }`}
                onClick={() =>
                  course.status === 'inactive'
                    ? handleOpenEdit()
                    : handleActivation(course.status)
                }              >
                {course.status === "inactive" ? "Reactivate" : "Inactivate"}
              </button>

              {/* <button
                className="px-6 py-2 rounded-md bg-yellow-500 cursor-pointer hover:bg-yellow-600 duration-200"
                onClick={() => handleOpenEdit()}
              >
                Edit
              </button> */}
            </div>
            <div>
              <button
                className="px-4 py-2 rounded-md bg-red-500 text-white"
                onClick={() => handleDelete()}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
      {OpenEdit && (
        <div className=" absolute w-full left-0 top-0 z-50">
          <EditCourse
            SendData={course}
            imgUrl={imageUrl}
            SendClose={handleClose}
            status={status}
          />
        </div>
      )}
    </div>
  );
};

export default CourseCard;
