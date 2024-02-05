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
      <Navbar />
      <div
        style={{
          backgroundImage: `url("/Image/pixlr-image-generator-3c6b3c51-64c0-458d-8bbd-5014366b5ee4.png")`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="text-4xl font-bold w-full flex-col">
          <div className="items-center flex-col flex justify-center mt-20">
            <div className="mb-4 text-black flex justify-center">
              <h1>Find the best tutor in Thailand</h1>
            </div>
            <div className="text-xl font-normal text-black w-3/5 text-center mb-60">
              <h1>
                Crack exams, learn new skills, improve grades with the help of
                great teachers. Post your learning needs and let qualified
                tutors get in touch with you.
              </h1>
            </div>
          </div>
          <div className="mb-52">
            <Title />
            <How />
          </div>
          <div className="flex justify-center">
            <div
              style={{
                display: "flex",
                justifyContent: "flex-start",
                alignItems: "center",
              }}
            >
              <Subject />
              <div>
                <Subjectbutton />
                <Subjectbutton2 />
              </div>
            </div>
          </div>
          <div className="flex justify-center">
            <Subjectbutton3 />
          </div>
        </div>
      </div>
    </div>
  );
}
