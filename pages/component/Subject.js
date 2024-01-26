import Link from "next/link";
export default function Subject() {
  return (
    <>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
      <div><strong>Find qualified Tutors for face-to-face and online tutoring</strong></div>
      <div style={{ marginTop: '15px' }}></div>
      <div>More than 50K students have found tutors already. 
        <div>From English to Mathematics, from History to French,</div>
        <div>from C++ to Node JS, we have it all. Find a tutor now </div>
        <div>
          <a style={{ display: 'inline-block', padding: '10px 20px', background: 'lightgreen', color: 'white', textDecoration: 'none', marginRight: '40px' }} href="/signin">Become a Tutor</a>
          <a style={{ display: 'inline-block', padding: '10px 20px', background: 'lightgreen', color: 'white', textDecoration: 'none', marginRight: '40px' }} href="/alltutor">Hire a Tutor</a>
        </div>
      </div>
    </div>
    </>    
  );
}
