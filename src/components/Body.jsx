import React from 'react'
import Form from './Form'
import { useAuthContext } from '../hooks/useAuthContext'
import { useEffect, useState } from 'react'

// --- WELCOME HEADER ---

const Body = () => {

  const [name, setName] = useState('')

  const {user} = useAuthContext()

  useEffect(() => {

    if(user){
      setName((user.user.username).toUpperCase())
    }

  }, [])

  return (
    <div className='mainbody'>
        <h2>WELCOME {name} !</h2>
        <Form/>
    </div>
  )
}

export default Body