import Image from 'next/image'
import { useState , useEffect } from 'react'
import { storage } from '../api/getimage'
import { ref, getDownloadURL } from 'firebase/storage'

export default function Tutorcard({ tutorData }) {
  const [className , setClassName] = useState('')
  const [classInfo , setClassInfo] = useState([])
  const [imageUrl, setImageUrl] = useState("");

  console.log(tutorData)

  useEffect(() => {
    const fetchImage = async () => {
      try {

        const url = await getDownloadURL(ref(storage, `${tutorData.name}.jpg`));
        setImageUrl(url);
      } catch (error) {
        console.error("Error fetching image:", error);
      }
    };
    fetchImage();

    const firstClass = tutorData.Classes_data
      ? Object.entries(tutorData.Classes_data)[0]
      : null;

    if (firstClass) {
      const [initialClassName, initialClassInfo] = firstClass;
      setClassName(initialClassName);
      setClassInfo(initialClassInfo);
    }
  }, [tutorData]);

  console.log(className , classInfo)
  // console.log(tutorData.name, imageUrl)
  return (
    <>
      <div className="bg-white shadow-xl  rounded-xl overflow-hidden">
        <div className="flex pt-5 space-x-8 px-6">
          <div className=" w-32 h-32 rounded-full overflow-hidden relative grow-0 shrink-0">
            <Image
              src={imageUrl}
              fill
              style={{ objectFit: 'cover' }}
            />
          </div>
          <div>
            <div className="flex justify-between">
              <div>
                <div className="text-2xl font-semibold">{tutorData.name}</div>
                <div className="text-gray-600 mt-1">Bangkok, Thailand</div>
              </div>
              <div className="text-right text-2xl font-semibold">
                ฿{classInfo.cost}/hr
              </div>
            </div>

            <div className="text-gray-600 mt-5">69 classes {className}</div>

            <div className="text-xl font-semibold mt-5">
              {classInfo.description}
            </div>
            <p className="text-gray-600 mt-2">
              John is a software engineer with over 10 years of experience in
              developing web and mobile applications. He is skilled in
              JavaScript, React, and Node.js.
            </p>
          </div>
        </div>

        <div className="flex justify-between mt-5 border-gray-700">
          <div className='border-t border-dashed border-gray-300 w-full'>

          </div>
          <div className=' w-auto flex justify-end'>
          <button className=" bg-green-500 text-white px-4 py-2 hover:bg-green-700 duration-300 whitespace-nowrap">
            Send Message
          </button>
          </div>
        </div>
      </div>
    </>
  )
}
