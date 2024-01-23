import Link from "next/link"
export default function Navbar(){
    return(
        <>
        <div className="flex justify-between">
         <div> <Link href="/">หน้าแรก</Link> </div>
         <div><Link href="/alltutor">ติวเตอร์ทั้งหมด</Link></div>
         <div><Link href="/signin">เข้าสู่ระบบ</Link></div>
         <div><Link href="/signup">สมัครเข้าใช้งาน</Link></div>
         </div>
         </>   
    )
}