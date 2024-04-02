// components/CourseCard.js

const CourseCard = ({ course, toggleActivation }) => {
    return (
      <div className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-2">{course.name}</h2>
        <p><strong>Tutor:</strong> {course.tutor}</p>
        <p><strong>Teaching Format:</strong> {course.format}</p>
        <p><strong>Email:</strong> {course.email}</p>
        <p><strong>Teaching Mode:</strong> {course.mode}</p>
        <div className="flex mt-4">
          <button
            className={`px-4 py-2 rounded-md mr-2 ${course.active ? 'bg-green-500 text-white' : 'bg-gray-300 text-gray-700'}`}
            onClick={() => toggleActivation(course.id)}
          >
            {course.active ? 'Active' : 'Inactive'}
          </button>
          <button
            className="px-4 py-2 rounded-md bg-red-500 text-white"
            onClick={() => {}}
          >
            Delete
          </button>
        </div>
      </div>
    );
  }
  
  export default CourseCard;
  