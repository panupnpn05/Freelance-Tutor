import Image from "next/image"
export default function How(){
    return(
    <div className="flex justify-evenly w-full">
        <div className="w-1/5 flex-col justify-center">
        <div className="mb-4 flex justify-center">
            <Image
            src="/Image/post.png"
            width={100}
            height={100}
            alt="Post your learning need"
            />
        </div>
            <div className="mb-4 font-bold text-base flex-col text-center">
                <h1>Post your learning needs</h1>
            </div>
            <div className="font-normal text-center">
                <h1>Post your tutor requirements. Our experts will analyze it and make it live on our job board.</h1>
            </div>
        </div>
        <div className="w-1/5">
        <div className="mb-4 flex justify-center">
                <Image
                src="/Image/tutor.png"
                width={100}
                height={100}
                alt="Get up to 10 tutor applications"
                />
            </div>
            <div className="mb-4 font-bold text-base flex-col text-center">
                <h1>Get up to 10 tutor applications</h1>
            </div>
            <div className="font-normal text-center">
                <h1>You'll receive the ten best tutors applications in your account within 48 hours closely matching to your requirements.</h1>
            </div>
        </div>
        <div className="w-1/5">
        <div className="mb-4 flex justify-center">
                <Image
                src="/Image/learning.png"
                width={100}
                height={100}
                alt="Select the best tutor & start learning"
                />
            </div>
            <div className="mb-4 font-bold text-base flex-col text-center">
                <h1>Select the best tutor & start learning</h1>
            </div>
            <div className="font-normal text-center">
                <h1>Choose the best tutor applications. Request the selected Tutors for trial sessions before hiring for regular classes. Give us your feedback.</h1>
            </div>
        </div>
    </div>
    )
}
            
            
        