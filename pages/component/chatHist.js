import { useState, useEffect } from 'react'
import { database, storage } from '../api/getimage'
import { onValue ,ref, getDownloadURL, StorageErrorCode } from 'firebase/database'
import Image from 'next/image'

const TutorStudentChat = ({ tutorId, studentId, from }) => {
  const [messages, setMessages] = useState([])
  const [imageUrl, setImageUrl] = useState('')

  // Reference to the specific chat room
  const chatRef = ref(database, `chats/${tutorId}-${studentId}/messages`)

  useEffect(() => {
    const unsubscribe = onValue(chatRef, (snapshot) => {
      const data = snapshot.val()
      if (data) {
        const messageArray = Object.keys(data).map((key) => ({
          id: key,
          ...data[key],
        }))
        console.log(messageArray)
        setMessages(messageArray)
      } else {
        setMessages([])
      }
    })
    if (from === 'tutor') {
      const fetchImage = async () => {
        try {
          const url = await getDownloadURL(ref(storage, `${studentId}.jpg`))
          setImageUrl(url)
          console.log(url)
        } catch (error) {
          console.error('Error fetching image:', error)
        }
      }
      fetchImage()
    } else {
      const fetchImage = async () => {
        try {
          const url = await getDownloadURL(ref(storage, `${tutorId}.jpg`))
          setImageUrl(url)
          console.log(url)
        } catch (error) {
          console.error('Error fetching image:', error)
        }
      }
      fetchImage()
    }

    return () => unsubscribe()
  }, [chatRef, tutorId, studentId])

  return (
    <div>
      {from === 'tutor' ? (
        <div>
          <h2 className="bg-gray-500">{studentId}</h2>
          {messages.map((message) => (
            <div key={message.id} className="w-full">
              {message.sender === tutorId ? (
                <div className="flex justify-start">{message.text}</div>
              ) : (
                <div className="flex justify-end">{message.text}</div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div>
          <h2 className="bg-gray-500 text-white pl-2 py-3">{tutorId}</h2>
          {messages.map((message) => (
            <div key={message.id} className="w-full px-2 mt-2 mb-4">
              {message.sender === studentId ? (
                <div className=" w-full flex justify-end">
                  <div className="w-fit p-2 bg-emerald-600 rounded-lg text-white">
                    {message.text}
                  </div>
                </div>
              ) : (
                <div className=" w-full flex justify-start">
                    <div className=" w-10 h-10 rounded-full overflow-hidden relative grow-0 shrink-0">
                    <Image src={imageUrl} fill style={{ objectFit: 'cover' }} />
                  </div>
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
  )
}

export default TutorStudentChat
