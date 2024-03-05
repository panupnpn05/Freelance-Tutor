// components/CourseCard.js

const CourseCard = ({ course, toggleActivation }) => {
  const days = JSON.parse(course.Days);

  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <h2 className="text-xl font-semibold mb-2">{course.Course}</h2>
      <p><strong>Tutor:</strong> {course.TutorName}</p>
      <p><strong>Teaching Format:</strong> {course.Type}</p>
      <p><strong>Email:</strong> {course.TutorEmail}</p>
      <p><strong>Teaching Mode:</strong> {course.Location === 'onsite' ? 'Onsite' : 'Online'}</p>
      <p><strong>Days:</strong> {Object.keys(days).filter(day => days[day]).join(', ')}</p>
      <p><strong>Time:</strong> {course.StartTime} - {course.EndTime}</p>
      <p><strong>Duration:</strong> {course.Duration} hours</p>
      <p><strong>Participants:</strong> {course.Participants}</p>
      <p><strong>Cost:</strong> {course.Cost}</p>
      <div className="flex mt-4">
        <button
          className={`px-4 py-2 rounded-md mr-2 ${course.active ? 'bg-green-500 text-white' : 'bg-gray-300 text-gray-700'}`}
          onClick={() => toggleActivation(course.Courseid)}
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