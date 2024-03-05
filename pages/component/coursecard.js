// components/CourseCard.js
import {
  UserGroupIcon,
  UserIcon,
  MapPinIcon,
  ComputerDesktopIcon,
  BriefcaseIcon,
  EnvelopeIcon,
  BookOpenIcon,
  ClockIcon,
} from '@heroicons/react/24/solid'
const CourseCard = ({ course, toggleActivation }) => {
  const days = JSON.parse(course.Days);

  return (
    <div className="bg-white shadow-xl rounded-xl overflow-hidden w-full">
      <div className="flex pt-5 space-x-8 px-6">
        <div className="w-32 h-32 rounded-full overflow-hidden relative grow-0 shrink-0">
          <div style={{ width: '100px', height: '100px', borderRadius: '50%', backgroundColor: 'red' }}></div>
        </div>
        <div className="w-full">
          <div className="flex justify-between">
            <div>
              <div className="text-2xl font-semibold">{course.Course}</div>
              <div className="text-lg text-gray-600 ">
                {course.TutorName}
              </div>
              <div className="text-md text-gray-600 flex items-center ">
                <BookOpenIcon className="w-3 mr-1" /> : {course.Type}
              </div>
              <div className="text-gray-600 flex items-center mt-1">
                <BriefcaseIcon className="w-3 mr-1" /> :{' '}
                {course.Location === 'onsite' ? 'Onsite' : 'Online'}
              </div>
              <div>
                <div className="text-gray-600 ">
                  <div></div>
                </div>
              </div>
              <div className="text-gray-600 flex items-center">
                <EnvelopeIcon className="w-3 mr-1" /> :{' '}
                {course.TutorEmail}
              </div>
              <div className="text-gray-600">{Object.keys(days).filter(day => days[day]).join(', ')}</div>
            </div>
            <div className="w-1/2">
              <div className="text-right text-2xl font-semibold flex justify-end">
                ฿{course.Cost}
                {course.Type === 'hourly' && <div>/hr</div>}
              </div>
              {course.Type !== 'hourly' && (
                <div className="flex justify-end">
                  Duration : {course.Duration} Hours
                </div>
              )}

              <div className="flex justify-end">
                {course.Type !== 'hourly' ? (
                  <div>Teaching time :</div>
                ) : (
                  <div>Available time :</div>
                )}
                <div className="ml-1">
                  {course.StartTime} - {course.EndTime}
                </div>{' '}
              </div>
              <div className="flex justify-end mt-2 ">
                {course.Type === 'group' ? (
                  <div className="flex text-xl font-medium items-center border border-emerald-300 px-3 bg-emerald-200 p-1 text-gray-600 rounded-lg">
                    <div className="w-8 mr-2">
                      <UserGroupIcon />
                    </div>
                    <div className="flex">
                      {course.students ? (
                        <div>{course.students}</div>
                      ) : (
                        <div className="mr-1">0</div>
                      )}
                      / {course.Participants}
                    </div>
                  </div>
                ) : (
                  <div></div>
                )}{' '}
              </div>
            </div>
          </div>

          <div className="text-xl font-semibold mt-5">
            {course.Description}
          </div>
        </div>
      </div>

      <div className="flex mt-5">
        <div className="border-t border-dashed border-gray-300  w-full items-center px-4 flex justify-between">
          <div className="flex space-x-2">
            {course.Type === 'group' ? (
              <UserGroupIcon className="w-6 text-gray-600" />
            ) : course.Type === 'individual' ? (
              <UserIcon className="w-6 text-gray-600" />
            ) : (
              <ClockIcon className="w-6 text-gray-600" />
            )}
            {course.Location === 'online' ? (
              <ComputerDesktopIcon className="w-6 text-gray-600" />
            ) : (
              <MapPinIcon className="w-6 text-gray-600" />
            )}
          </div>
        </div>
        <div className="flex mt-1">
          <button
            className={`px-4 py-2 rounded-md mr-2 ${course.active ? 'bg-green-500 text-white' : 'bg-gray-300 text-gray-700'}`}
            onClick={() => toggleActivation(course.Courseid)}
          >
            {course.active ? 'Inactive' : 'Active'}
          </button>
          <button
            className="bg-red-500 w-full text-white px-4 py-2 hover:bg-red-700 duration-300 whitespace-nowrap"
            onClick={() => {}}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default CourseCard;
