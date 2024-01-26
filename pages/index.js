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
    <div style={{display: 'flex', }}>
        <Subject />
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <Subjectbutton />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <Subjectbutton2 />
        </div>
      </div>
      <Subjectbutton3 />
    </>
    
  );
}


