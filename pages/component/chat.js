import { useState, useEffect, useRef } from 'react'
import { database } from '../api/getimage'
import { ref, push, onValue, serverTimestamp } from 'firebase/database'

const Chat = ({ tutor, student, from, closeChat }) => {
 const [message, setMessage] = useState('')
 const [messages, setMessages] = useState([])
 const containerRef = useRef(null);

 let chatRef

 if (from === 'tutor') {
    chatRef = ref(
      database,
      `chats/${tutor.user_info.user_data.name}-${student}/messages`,
    )
 } else {
    chatRef = ref(
      database,
      `chats/${tutor}-${student.user_info.user_data.name}/messages`,
    )
 }

 const sendMessage = () => {
    if (message.trim() !== '') {
      push(chatRef, {
        text: message,
        timestamp: serverTimestamp(),
        sender:
          from === 'tutor'
            ? tutor.user_info.user_data.name
            : student.user_info.user_data.name,
      })
      setMessage('')
    }
 }

 const handleCloseChat = () => {
    closeChat()
 }

 useEffect(() => {
  const unsubscribe = onValue(chatRef, (snapshot) => {
     const data = snapshot.val();
     if (data) {
       const messageArray = Object.keys(data).map((key) => ({
         id: key,
         ...data[key],
       }));
       setMessages(messageArray);
       
       // Check if the document is not visible
       if (document.visibilityState === 'unloaded') {
         console.log('hello'); // Log "hello" to the console
       }
     } else {
       setMessages([]);
     }
  });
 
  // Clean up the listener when the component unmounts
  return () => {
     // Unsubscribe when component unmounts
     unsubscribe();
  }
 }, []);
 
 // Updated showNotification function to attempt to show a notification
 const showNotification = () => {
  if (Notification.permission === 'granted') {
     new Notification('New message received');
  } else if (Notification.permission !== 'denied') {
     Notification.requestPermission().then(permission => {
       if (permission === 'granted') {
         new Notification('New message received');
       }
     });
  }
 }
  
 const newMessageNotification = () => {
    if (Notification.permission === 'granted') {
      new Notification('New message received');
    } else if (Notification.permission !== 'denied') {
      Notification.requestPermission().then(permission => {
        if (permission === 'granted') {
          new Notification('New message received');
        }
      });
    }
 }

 return (
    <div className=" bg-white border-2 border-gray-600 rounded-xl overflow-hidden w-full">
      <div className='flex px-3 py-3 justify-between bg-gray-500 text-white'>
        <div className=" font-bold text-lg">
          {from === 'tutor' ? `${student}` : `${tutor}`}
        </div>
        <div className='text-xl font-semibold cursor-pointer' onClick={handleCloseChat}>
          x
        </div>
      </div>
      <div className='h-64 overflow-y-auto' ref={containerRef}>
        {from === 'tutor' ? (
          <div>
            {messages.map((message) => (
              <div key={message.id} className="w-full px-3 mt-2 mb-4">
                {message.sender === tutor.user_info.user_data.name ? (
                 <div className=" w-full flex justify-end">
                    <div className="w-fit p-2 bg-emerald-600 rounded-lg text-white">
                      {message.text}
                    </div>
                 </div>
                ) : (
                 <div className=" w-full flex justify-start">
                    <div className="p-2 w-fit bg-gray-200 rounded-lg">
                      {message.text}
                    </div>
                 </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div>
            {messages.map((message) => (
              <div key={message.id} className="w-full px-3 mt-2 mb-4">
                {message.sender === student.user_info.user_data.name ? (
                 <div className=" w-full flex justify-end">
                    <div className="w-fit p-2 bg-emerald-600 rounded-lg text-white">
                      {message.text}
                    </div>
                 </div>
                ) : (
                 <div className=" w-full flex justify-start">
                    <div className="p-2 w-fit bg-gray-200 rounded-lg">
                      {message.text}
                    </div>
                 </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
      <div className="w-full bg-gray-200 flex p-2">
        <textarea
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="w-full border-2 block"
        />
        <button onClick={sendMessage} className="w-1/4 bg-gray-600 text-white">
          Send
        </button>
      </div>
    </div>
 )
}

export default Chat