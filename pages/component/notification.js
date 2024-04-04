import { useEffect, useState } from 'react'
import firebase from 'firebase/compat/app'
import 'firebase/compat/database' // Import the Firebase Realtime Database module

export default function Notifications() {
  const [userData, setUserData] = useState()

  // Register Service Worker
  useEffect(() => {
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', function () {
        navigator.serviceWorker.register('/sw.js').then(
          function (registration) {
            console.log(
              'ServiceWorker registration successful with scope: ',
              registration.scope,
            )
          },
          function (err) {
            console.log('ServiceWorker registration failed: ', err)
          },
        )
      })
    }
  }, [])

  useEffect(() => {
    let storedUserData

    const loadUserData = () => {
      storedUserData = JSON.parse(localStorage.getItem('userData'))
      setUserData(storedUserData)
    }

    loadUserData()

    const handleStorageChange = () => {
      loadUserData()
    }
    window.addEventListener('local-storage-change', handleStorageChange)

    if (storedUserData) {
      const firebaseConfig = {
        apiKey: 'AIzaSyC6mYjCqZh7CHAbCEfgIcsUYqqVsvpZmu4',
        authDomain: 'seniorproject-aa900.firebaseapp.com',
        databaseURL:
          'https://seniorproject-aa900-default-rtdb.asia-southeast1.firebasedatabase.app',
        projectId: 'seniorproject-aa900',
        storageBucket: 'seniorproject-aa900.appspot.com',
        messagingSenderId: '1027062073251',
        appId: '1:1027062073251:web:573512c6ff70a9ab49fc16',
        measurementId: 'G-9LPS2Q36RR',
      }

      // Initialize Firebase
      if (!firebase.apps.length) {
        firebase.initializeApp(firebaseConfig)
      }

      // Reference to all chat rooms
      const chatsRef = firebase.database().ref('chats')

      // Fetch all chat rooms
      chatsRef.once('value', (snapshot) => {
        snapshot.forEach((chatSnapshot) => {
          const chatRoomName = chatSnapshot.key
          // Reference to messages in the current chat room
          const messagesRef = firebase
            .database()
            .ref(`chats/${chatRoomName}/messages`)
          // Listen for existing messages in this chat room
          messagesRef.once('value', (messageSnapshot) => {
            messageSnapshot.forEach((childSnapshot) => {
              const message = childSnapshot.val()
              console.log('Existing message: ', message)
              // If the message is new and not seen before, show notification
              if (message.timestamp > storedUserData.lastSeenTimestamp) {
                if (Notification.permission === 'granted') {
                  if (
                    message.sender !== storedUserData.user_info.user_data.name
                  ) {
                    new Notification(`${message.sender}`, {
                      body: `Message: ${message.text}`,
                    })
                  }
                }
              }
            })
          })
          // Listen for new messages in this chat room
          messagesRef.on('child_added', (messageSnapshot) => {
            const newMessage = messageSnapshot.val()
            console.log('New message: ', newMessage)
            // If the message is new and not seen before, show notification
            if (newMessage.timestamp > storedUserData.lastSeenTimestamp) {
              if (Notification.permission === 'granted') {
                if (
                  newMessage.sender !== storedUserData.user_info.user_data.name
                ) {
                  new Notification(`${newMessage.sender}`, {
                    body: `Message: ${newMessage.text}`,
                  })
                }
              }
            }
          })
        })
      })

      // Request permission for browser notifications
      Notification.requestPermission()

      // Clean up the listener when component unmounts
      return () => {
        window.removeEventListener('local-storage-change', handleStorageChange)
        // Turn off listeners for all chat rooms
        chatsRef.off()
      }
    }
  }, [])

  console.log(userData)

  return <></>
}
