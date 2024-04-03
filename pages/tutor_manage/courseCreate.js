import Navbar from '../component/Navbar'
import { UserGroupIcon, UserIcon, ClockIcon } from '@heroicons/react/24/solid'

export default function coursecreate() {
  return (
    <div>
      <div className=" absolute w-full">
        <Navbar />
      </div>

      <div className="flex justify-center items-center h-screen space-x-16 border-2  text-xl">
        <a
          href="./groupcreate"
          className="w-1/4 h-1/3 items-center flex justify-center text-xl border-2 border-gray-400 rounded-xl cursor-pointer hover:bg-gray-300 duration-200"
        >
          <div className="">
            <div className=" h-1/6 w-full flex justify-center">
              <UserGroupIcon />
            </div>
            <div className=" mt-4">Group Course</div>
          </div>
        </a>
        
        <a
          href="./individualcreate"
          className="w-1/4 h-1/3 items-center flex justify-center text-xl border-2 border-gray-400 rounded-xl cursor-pointer hover:bg-gray-300 duration-200"
        >
          <div className="">
            <div className=" h-1/6 w-full flex justify-center">
              <UserIcon />
            </div>
            <div>Individual Course</div>
          </div>
        </a>
        <a
          href="./hourlycreate"
          className="w-1/4 h-1/3 items-center flex justify-center text-xl border-2 border-gray-400 rounded-xl cursor-pointer hover:bg-gray-300 duration-200"
        >
          <div className="">
            <div className=" h-1/6 w-full flex justify-center">
              <ClockIcon />
            </div>
            <div className=" mt-4">Hourly Class</div>
          </div>
        </a>
      </div>
    </div>
  )
}
