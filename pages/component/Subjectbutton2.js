import Link from "next/link";
export default function Subjectbutton2() {
  return (
    <>
    <div className="flex justify-row mb-8" style={{ marginLeft: '15px'}}>
      <a style={{  display: 'inline-block', padding: '35px 48px', background: 'lightgray', color: 'black', textDecoration: 'none', fontSize: '18px' }} href="/japan">Japanese</a>
      <a style={{  marginLeft: '15px' ,display: 'inline-block', padding: '35px 63px', background: 'lightgray', color: 'black', textDecoration: 'none', fontSize: '18px' }} href="/china">Chinese</a>
      </div>
    </>    
  );
}