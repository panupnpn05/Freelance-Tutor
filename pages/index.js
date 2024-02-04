import How from "./component/post";
import Title from "./component/title";
import Image from "next/image";
import Navbar from "./component/Navbar";
import { Inter } from "next/font/google";
import Footer from "./component/Footer";
import Subject from "./component/Subject";
import Subjectbutton from "./component/Subjectbutton";
import Subjectbutton2 from "./component/Subjectbutton2";
import Link from "next/link";
import Subjectbutton3 from "./component/Subjectbutton3";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <div>
      <Navbar/>
      <div className="text-4xl font-bold w-full flex-col">
        <div className="items-center flex-col flex justify-center mt-20">
          <div className="mb-4 text-black flex justify-center">
            <h1>Find the best tutor in Thailand</h1>
          </div>
          <div className="text-xl font-normal text-black w-3/5 text-center mb-60">
            <h1>Crack exams, learn new skills, improve grades with the help of great teachers. Post your learning needs and let qualified tutors get in touch with you.</h1>
          </div>
        </div>
      </div>
        <Title/>
        <How/>
        <Subject/>
        <Subjectbutton/>
        <Subjectbutton2/>
        <Subjectbutton3/>
    </div>
  )
}


