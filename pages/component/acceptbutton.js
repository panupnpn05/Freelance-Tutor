export default function Acceptbutton(){
    return(
        <button
              className=" bg-green-500 w-full text-white px-4 py-2 hover:bg-green-700 duration-300 whitespace-nowrap"
              onClick={() => handleBooking(tutorData)}
            >
              Accept
            </button>
    )
}