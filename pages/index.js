import How from "./component/post";
import Title from "./component/title";
import Image from "next/image";
import Navbar from "./component/Navbar";
import { Inter } from "next/font/google";
import Footer from "./component/Footer";
import Subject from "./component/Subject";
import { useEffect, useState } from "react";
import CarouselSlider from "./component/carousel";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [UserData, setUserData] = useState("");
  useEffect(() => {
    const storedUserData = JSON.parse(localStorage.getItem("userData"));

    if (storedUserData) {
      setUserData(storedUserData);
    }
  }, []);

  console.log(UserData);

  return (
    <div>
  <div className="w-full h-full">
    <Navbar />
    <div>
      <div className="py-12 bg-[url('/Image/blue-fluid-background_53876-114597.avif')] bg-cover">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-center md:justify-between">
            <div className="md:w-1/2 mb-8 md:mb-0 md:order-1">
              <Image
                src="/Image/Online-learning-amico-resize-copy.webp"
                width={500}
                height={100}
                alt="Get up to 10 tutor applications"
              />
            </div>
            <div className="md:w-1/2 md:text-center">
              <h1 className="text-5xl mb-4">
                Find the Best Tutors in Thailand
              </h1>
              <p className="text-lg mb-8">
                Crack exams, learn new skills, improve grades with the help of great teachers. Post your learning needs and let qualified tutors get in touch with you.
              </p>
              <div>
  <h1 className="text-3xl font-bold mb-4">Why Choose Us?</h1>
  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
    <div className="bg-gray-100 p-4 rounded-lg">
      <h1 className="text-xl mb-2">Professionalism:</h1>
      <p>Our team has extensive experience and expertise in tutoring.</p>
    </div>
    <div className="bg-gray-100 p-4 rounded-lg">
      <h1 className="text-xl mb-2">Customization:</h1>
      <p>We tailor our teaching to meet your needs and learning style.</p>
    </div>
    <div className="bg-gray-100 p-4 rounded-lg">
      <h1 className="text-xl mb-2">Flexibility:</h1>
      <p>We offer scheduling options that can accommodate your time constraints.</p>
    </div>
    <div className="bg-gray-100 p-4 rounded-lg">
      <h1 className="text-xl mb-2">Effective Learning:</h1>
      <p>Our teaching methods and learning tools ensure efficient learning outcomes.</p>
    </div>
  </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="py-12">
        <div className="container mx-auto">
          <div className="mb-20">
            <Title />
            <How />
          </div>
          <div className="flex justify-center mb-8">
            <Subject />
          </div>
          <div className="text-center">
            <CarouselSlider />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  </div>
</div>
  );
}
