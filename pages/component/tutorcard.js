export default function Tutorcard(){
  return(
      <>
  <div className="max-w-lg mx-auto my-10 bg-white rounded-lg shadow-md p-5">
      <h2 className="text-right text-2xl font-semibold mt-3">฿900/hr</h2>
      <h2 className="text-center text-2xl font-semibold mt-3">Geoffrey S.</h2>
      <p className="text-center text-gray-600 mt-1">Bangkok, Thailand</p>
      
      <div className="flex justify-center mt-5">
      <p className="text-center text-gray-600 mt-1">69 classes Mathematics</p>
      </div>
      
      <div className="mt-5">
        <h3 className="text-xl font-semibold">Mathematics Teacher in Bangkok</h3>
        <p className="text-gray-600 mt-2">
          John is a software engineer with over 10 years of experience in developing web and mobile applications. He is skilled in JavaScript, React, and Node.js.
        </p>
        <div className="flex justify-end mt-5">
        {/*ปุ่ม*/}
        <button className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-700">
          Send Message
        </button>
      </div>
      </div>
    </div>
      </>
  )
}