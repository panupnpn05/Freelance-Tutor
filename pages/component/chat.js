import { useState, useEffect, useRef } from 'react'
import { database, storage } from '../api/getimage'
import { ref as dbref, push, onValue, serverTimestamp } from 'firebase/database'
import { ref as storageref, getDownloadURL } from 'firebase/storage'
import Image from 'next/image'
import { XMarkIcon } from '@heroicons/react/24/solid'

const Chat = ({ tutor, student, from, closeChat }) => {
  const [imageUrl, setImageUrl] = useState('')
  const [message, setMessage] = useState('')
  const [messages, setMessages] = useState([])
  const containerRef = useRef(null)

  let chatRef

  if (from === 'tutor') {
    chatRef = dbref(
      database,
      `chats/${tutor.user_info.user_data.name}-${student}/messages`,
    )
  } else {
    chatRef = dbref(
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
    if (from !== 'tutor') {
      const fetchImage = async () => {
        const url = await getDownloadURL(storageref(storage, `${tutor}.jpg`))
        setImageUrl(url)
        console.log(url)
      }
      fetchImage()
    }

    const unsubscribe = onValue(chatRef, (snapshot) => {
      const data = snapshot.val()
      if (data) {
        // Convert the object into an array
        const messageArray = Object.keys(data).map((key) => ({
          id: key,
          ...data[key],
        }))
        setMessages(messageArray)
        if (containerRef.current) {
          containerRef.current.scrollTop = containerRef.current.scrollHeight;
        }
      } else {
        setMessages([])
      }
    })

    // Clean up the listener when the component unmounts
    return () => {
      // Unsubscribe when component unmounts
      unsubscribe()
    }
  }, [])

  useEffect(() => {
    // Scroll to the bottom when messages update
    if (containerRef.current) {
       containerRef.current.scrollTo({
         top: containerRef.current.scrollHeight,
         behavior: 'smooth'
       });
    }
   }, [messages]);

//   useEffect(() => {
//     if (containerRef.current) {
//       containerRef.current.scrollTop = containerRef.current.scrollHeight;
//     }
//  }, []);

  function formatTimestamp(timestamp) {
    const date = new Date(timestamp)
    const day = date.getDate().toString().padStart(2, '0')
    const month = (date.getMonth() + 1).toString().padStart(2, '0') // Months are 0-based in JavaScript
    const hours = date.getHours().toString().padStart(2, '0')
    const minutes = date.getMinutes().toString().padStart(2, '0')
    return `${day}/${month} ${hours}:${minutes}`
  }

  console.log(imageUrl)
  return (
    <div className=" bg-white border-2 border-gray-600 rounded-xl overflow-hidden w-full" >
      <div className="flex px-3 py-3 justify-between bg-gray-500 text-white">
        <div className="flex space-x-2">
          <div className=" w-8 h-8 rounded-full overflow-hidden relative grow-0 shrink-0">
            <Image src={from === 'tutor' ? '/Image/userImg.jpeg':imageUrl} fill style={{ objectFit: 'cover' }} />
          </div>
          <div className=" font-bold text-lg pt-px">
            {from === 'tutor' ? `${student}` : `${tutor}`}
          </div>
        </div>
        <div
          className=" w-7 h-7 pt-0.5 cursor-pointer hover:scale-110 duration-200"
          onClick={handleCloseChat}
        >
          <XMarkIcon />
        </div>
      </div>
      <div className="h-64 overflow-y-auto chat-container" ref={containerRef}>
        {from === 'tutor' ? (
          <div>
            {messages.map((message) => (
              <div key={message.id} className="w-full px-3 mt-2 mb-4">
                {message.sender === tutor.user_info.user_data.name ? (
                  <div className="w-full pl-24">
                    <div className="flex justify-end">
                      <div className=" flex justify-end">
                        <div className="right-0 p-2 bg-emerald-600 rounded-lg text-white break-words">
                          {message.text}
                        </div>
                      </div>
                    </div>
                    <div className="text-end font-light text-sm text-gray-500">
                      {formatTimestamp(message.timestamp)}
                    </div>
                  </div>
                ) : (
                  <div className="w-full pr-24">
                    <div className="flex justify-start">
                      <div>
                        <div className="w-fit p-2 bg-gray-200 rounded-lg">
                          {message.text}
                        </div>
                      </div>
                    </div>
                    <div className="text-start font-light text-sm text-gray-500">
                      {formatTimestamp(message.timestamp)}
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
                  <div className="w-full pl-24">
                    <div className="flex justify-end">
                      <div>
                        <div className="w-fit p-2 bg-emerald-600 rounded-lg text-white break-words">
                          {message.text}
                        </div>
                      </div>
                    </div>
                    <div className="text-end font-light text-sm text-gray-500">
                      {formatTimestamp(message.timestamp)}
                    </div>
                  </div>
                ) : (
                  <div className="w-full pr-24 text-start">
                    <div className="flex justify-start">
                      <div>
                        <div className="w-fit p-2 bg-gray-200 rounded-lg">
                          {message.text}
                        </div>
                      </div>
                    </div>
                    <div className="text-start font-light text-sm text-gray-500">
                      {formatTimestamp(message.timestamp)}
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
