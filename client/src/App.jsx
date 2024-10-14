import { io } from "socket.io-client";

function App() {

  const socket = io("http://localhost:3000");

  return (
    <div className="p-8 max-w-full h-svh flex justify-center">
      <div className="w-1/2 border-solid bg-gray-200 flex flex-col justify-between p-8">
        <h1 className="text-4xl">Chat App</h1>
        <div className="h-3/4 w-full bg-white rounded-xl p-8">
          {}
        </div>
        <div className="flex">
          <input className="border-gray-400 border-2 rounded-md h-16 focus:border-black w-full px-4" type="text" />
          <button className="ml-4 bg-white border-solid border-gray-400 border-2 rounded-lg p-2 hover:bg-gray-100 shadow shadow-black active:shadow-none">Send</button>
        </div>
      </div>
    </div>
  )
}

export default App
