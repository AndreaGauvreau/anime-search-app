import React from 'react'
import { useRef } from 'react'
import './SearchBar.css'

export default function SearchBar({setAnimeName,animeName}) {
    const searchANime=useRef()

    const handleClick=(e)=>{
        setAnimeName(searchANime.current.value)
        console.log(searchANime,animeName )
    }

  return (
    <div id='searchbar'>
      <input type='text' ref={searchANime} />
      <input type='submit' value='Search' onClick={handleClick}/>
    </div>
  )
}
