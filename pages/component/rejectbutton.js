export default function Rejectbutton(){
    return(
        <button
              className=" bg-red-500 w-full text-white px-4 py-2 hover:bg-green-700 duration-300 whitespace-nowrap"
              onClick={() => handleBooking(tutorData)}
            >
              Reject
            </button>
    )
}