import Link from "next/link"
export default function Navbar(){
    return(
        <>
       
        <div className="flex justify-between bg-black text-white" >
            <a className="text-red-300" href="/">หน้าแรก</a>
            <a href="/alltutor">ติวเตอร์ทั้งหมด</a>
        <div> <a href="/signin">เข้าสู่ระบบ</a> 
        <a href="/signup">สมัครเข้าใช้งาน</a> 
        </div>  
        </div>
        
         </>   
    )
}