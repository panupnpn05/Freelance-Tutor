import Link from "next/link";
export default function Subjectbutton() {
  return (
    <>
    <div className="flex justify-row mb-8" style={{ marginLeft: '15px'}}>
        <a style={{  display: 'inline-block', padding: '35px 50px', background: 'lightgray', color: 'black', textDecoration: 'none', fontSize: '18px' }} href="/thai">Thai</a>
        <a style={{ marginLeft: '15px', display: 'inline-block', padding: '35px 47px', background: 'lightgray', color: 'black', textDecoration: 'none', fontSize: '18px' }} href="/english">English</a>
      </div>
    </>    
  );
}