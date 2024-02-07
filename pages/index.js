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
import { useEffect , useState } from "react";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
const [UserData, setUserData] = useState("")
  useEffect(() => {
    const storedUserData = JSON.parse(localStorage.getItem('userData'));
  
    if (storedUserData) {
      setUserData(storedUserData);
    }
  }, []);

  console.log(UserData)
  
  return (
    <div>
      <Navbar />
      <div >
        <div className="text-4xl font-bold w-full">
          <div className="flex justify-center w-full h-full" >
            <div className="bg-blue-200">
            <div className="mb-4 text-black bg-red-200">
              <h1>Find the best tutor in Thailand</h1>
            </div>
            <div className="text-xl font-normal text-black mb-60 bg-green-200">
              <h1>
                Crack exams, learn new skills, improve grades with the help of
                great teachers. Post your learning needs and let qualified
                tutors get in touch with you.
              </h1>
              </div>
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
