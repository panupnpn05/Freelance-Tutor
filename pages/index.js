import Image from "next/image";
import { Inter } from "next/font/google";
import Navbar from "./component/Navbar";
import Footer from "./component/Footer";
import Subject from "./component/Subject";
import Subjectbutton from "./component/Subjectbutton";
import Subjectbutton2 from "./component/Subjectbutton2";
import Link from "next/link";
import Subjectbutton3 from "./component/Subjectbutton3";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <>
    <Navbar/>
    <div className="flex justify-center">
    <div style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center' }}>
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
    </>
    
  );
}


