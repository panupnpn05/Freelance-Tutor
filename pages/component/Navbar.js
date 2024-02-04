import Link from 'next/link'
export default function Navbar() {
  return (
    <>
      <div className="flex justify-center items-center w-full h-20">
        <div className='w-3/4 flex justify-between items-center text-lg'>
          <a className="text-3xl font-bold text-green-900" href="/">
            ALL Tutor
          </a>
          <a className="" href="/alltutor">
            ติวเตอร์ทั้งหมด
          </a>
          <div className="space-x-4 flex justify-between items-center">
            <a className="w-full " href="/signin">
              เข้าสู่ระบบ
            </a>
            <a
              className="w-full h-1/2 rounded-lg p-2 border border-green-600 hover:border-9 hover:bg-green-600 hover:text-white duration-300 whitespace-nowrap"
              href="/signup"
            >
              สมัครเข้าใช้งาน
            </a>
          </div>
        </div>
      </div>
    </>
  )
}
