import { useState, useEffect } from 'react';
import { io } from "socket.io-client";
import { uniqueNamesGenerator, adjectives, colors, animals } from 'unique-names-generator';

const shortName = uniqueNamesGenerator({
  dictionaries: [adjectives, animals, colors], // colors can be omitted here as not used
  length: 2
})
const color = uniqueNamesGenerator({dictionaries: [["red", "blue", "green", "black", "yellow", "gray", "orange","violet"]]});

const socket = io("http://localhost:3000");

function App() {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    socket.on("message", (msg) => {
      setMessages((prevMsgs) => [...prevMsgs, msg]);
    })

    return () => {
      socket.off("message");
    }
  }, [setMessages])

  const handleSendMessage = () => {
    socket.emit("message", {name:shortName,msg:message});
    setMessages((prevMsgs) => [...prevMsgs, {name:'You',msg:message}]);
    setMessage('');
  }

  return (
    <div className="p-8 max-w-full h-svh flex justify-center">
      <div className="w-1/2 border-solid bg-gray-200 flex flex-col justify-between p-8">
        <h1 className="text-4xl">Chat App</h1>
        <div className="h-3/4 w-full bg-white rounded-xl p-8 overflow-y-auto overflow-x-hidden">
          {messages.map((msg, index) => (
            <div key={index} className='p-2 w-full even:bg-gray-200 rounded-lg'>
              {msg.name != 'You' ? <span className='font-bold' style={{color: color}}>{msg.name}: </span > : <span className='font-bold'>You: </span>}<span>{msg.msg}</span>
            </div>
          ))}
        </div>
        <div className="flex">
          <input className="border-gray-400 border-2 rounded-md h-16 focus:border-black w-full px-4" onChange={(e)=> {setMessage(e.target.value)}} onSubmit={(e)=> {setMessage(e.target.value)}} onKeyDown={(e) => { if(e.key == "Enter") handleSendMessage(e) }} value={message} type="text" />
          <button className="ml-4 bg-white border-solid border-gray-400 border-2 rounded-lg p-2 hover:bg-gray-100 shadow shadow-black active:shadow-none" onClick={handleSendMessage}>Send</button>
        </div>
      </div>
    </div>
  )
}

export default App