import Link from "next/link";
export default function Subjectbutton() {
  return (
    <>
      <a style={{ marginLeft: '50px' , textAlign: 'center',display: 'inline-block', padding: '25px 30px', background: 'lightgray', color: 'black', textDecoration: 'none', fontSize: '18px' }} href="/english">ภาษาอังกฤษ</a>
      <a style={{ marginLeft: '50px' ,marginTop: '30px' , textAlign: 'center',display: 'inline-block', padding: '25px 40px', background: 'lightgray', color: 'black', textDecoration: 'none', fontSize: '18px' }} href="">ชีววิทยา</a>
    </>    
  );
}