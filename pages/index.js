import How from "./compernent/post";
import Three from "./compernent/threething";
import Title from "./compernent/title";
import Image from "next/image";
export default function Home() {
  return (
    <>
      <h1>หน้าแรก</h1>
      <div className="text-3xl font-bold">
            <h1>find the best tutor in thailand</h1>
        <div className="text-base font-normal mb-16">
            <h1>Crack exams, learn new skills, improve grades with the help of great teachers. 
              Post your learning needs and let qualified tutors get in touch with you. </h1>
        </div>
        </div>
        <Title/>
        <How/>
        <Three/>
    </div>
>>>>>>>>> Temporary merge branch 2
  );
}
