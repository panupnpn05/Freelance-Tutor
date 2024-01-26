import Link from "next/link";
export default function Navbar(){
    return(
        <>
        <div className=" x-slate-400 h-10">
        <div className=" flex  justify-between text-xl">
            <a href="/">ALL Tutor</a>
            <a href="/alltutor">ติวเตอร์ทั้งหมด</a>
            <div className=" px=3 space=x=2">
                <a href="/signin">เข้าสู่ระบบ</a>
                <a href="/">/</a>
                <a href="/signup">สมัครเข้าใช้งาน</a>
            </div>
      
        </div>
        </div>
        </>
    )
}