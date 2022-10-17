import { useEffect, useState } from 'react'
//import io from 'Socket.IO-client'
import io from 'socket.io/node_modules/socket.io-client'
let socket;

const Home = () => {
  const [input, setInput] = useState('')

  useEffect(() => {
    socketInitializer();
    return () => {
      console.log("This will be logged on unmount");
    } 
  });

  const socketInitializer = async () => {
    await fetch('/api/socket');
    socket = io()

    socket.on('connect', () => {
      console.log('connected')
    })

    socket.on('update-input', msg => {
      setInput(msg)
    })
  }

  const onChangeHandler = (e) => {
    setInput(e.target.value)
    socket.emit('input-change', e.target.value)
  }

  return (
    <input
      placeholder="Type something"
      value={input}
      onChange={onChangeHandler}
    />
  )
}

export default Home;