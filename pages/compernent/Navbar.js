import Link from "next/link"
export default function Navbar(){
    return(
        <>
        <div className="flex justify-between bg-teal-600 text-white" >
            <a className="text-3xl font-bold" href="/">ALL Tutor</a>
            <a className="text-xl" href="/alltutor">ติวเตอร์ทั้งหมด</a>
        <div className="space-x-4 mr-4"> 
            <a className="text-xl " href="/signin">เข้าสู่ระบบ</a> 
            <a className="text-xl" href="/signup">สมัครเข้าใช้งาน</a> 
        </div>  
        </div>
        
         </>   
    )
}