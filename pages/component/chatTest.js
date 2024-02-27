import { useState, useEffect } from 'react';
import { database } from '../api/getimage';
import { ref, push, onValue, serverTimestamp } from 'firebase/database';

const Chat = () => {
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
  
    const student = 'Panu Nopsiriwong';
    const tutor = 'Joe Rawipas';
  
    // Reference to the specific chat room
    const chatRef = ref(database, `chats/${tutor}-${student}/messages`);
  
    const sendMessage = () => {
      if (message.trim() !== '') {
        push(chatRef, {
          text: message,
          timestamp: serverTimestamp(),
          sender: tutor,
        });
        setMessage('');
      }
    };
  
    useEffect(() => {
      const unsubscribe = onValue(chatRef, (snapshot) => {
        const data = snapshot.val();
        if (data) {
          // Convert the object into an array
          const messageArray = Object.keys(data).map((key) => ({
            id: key,
            ...data[key],
          }));
          console.log(messageArray);
          setMessages(messageArray);
        } else {
          setMessages([]);
        }
      });
  
      // Clean up the listener when the component unmounts
      return () => {
        // Unsubscribe when component unmounts
        unsubscribe();
      };
    }, []); // Empty dependency array, so it only runs once on mount
  
    return (
      <div>
        {messages.map((message) => (
          <div key={message.id}>
            <p>
              <strong>{message.sender}:</strong> {message.text} 
              <span style={{ fontSize: '0.8em', marginLeft: '5px' }}>
                ({new Date(message.timestamp).toLocaleString()})
              </span>
            </p>
          </div>
        ))}
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    );
  };
  
  export default Chat;
  