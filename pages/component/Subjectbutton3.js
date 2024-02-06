import Link from "next/link";
export default function Subjectbutton3() {
  return (
    <>
    <div className="flex justify-row ">
      <a style={{  marginLeft: '100px',textAlign: 'center',display: 'inline-block', padding: '30px 45px', background: 'lightgray', color: 'black', textDecoration: 'none', fontSize: '18px' }} href="/coding">Coding</a>
      <a style={{ marginLeft: '65px',textAlign: 'center',display: 'inline-block', padding: '30px 45px', background: 'lightgray', color: 'black', textDecoration: 'none', fontSize: '18px' }} href="/biology">ชีววิทยา</a>
      <a style={{  marginLeft: '90px',display: 'inline-block', padding: '30px 45px', background: 'lightgray', color: 'black', textDecoration: 'none', fontSize: '18px' }} href="/science">วิทยาศาสตร์</a>
      <a style={{ marginRight: '100px',marginLeft: '15px',display: 'inline-block', padding: '30px 55px', background: 'lightgray', color: 'black', textDecoration: 'none', fontSize: '18px' }} href="/math">คณิตศาสตร์</a>
      </div>
    </>    
  );
}