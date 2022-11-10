import React, {useState, useEffect, useReducer, useRef} from 'react'
import './animeviewcard.css'
import { AnimeView, useAnimeInfos, useFindAnimeList, useFindAnimeName } from './fetchAnime'
import { motion } from "framer-motion"


export default function Anime({animeName}){
  const state=useFindAnimeName(animeName)
  const {data, error, status}=state
  if(error){
    throw error
  } else if(status==='idle'){
    return 'Entrez en nom de manga... ex: "One piece"'
  }else if(status==='fetching'){
    return 'Chargement...'
  }else if(status==='done'){
    return(<div>
      {data ? 
      <AnimeView name={data} animeName={animeName} /> : 
      `L'anime n'existe pas`}
   </div>)
  }


}

export function AnimeList({animeName}){
  const [width, setWidth]=useState(0)
  const carousel=useRef()
  useEffect(()=>{
    setWidth()
  },[])


  const state=useFindAnimeList(animeName)
  const {data:animes, error, status}=state
  if(error){
    throw error
  } else if(status==='idle'){
    return 'Entrez en nom de manga... ex: "One piece"'
  }else if(status==='fetching'){
    return 'Chargement...'
  }else if(status==='done'){
    return(
    <motion.div ref={carousel} className='carousel' whileTap={{cursor:"grabbing"}}>
    <motion.div drag="x" dragConstraints={{right:0, left: -width}} className='inner-carousel' >
      {animes.map( (animes, index) =>(
      <motion.div className='item' key={index}><AnimeView name={animes} animeName={animeName} /></motion.div> )
      )}
   </motion.div>
   </motion.div>)
  }


}

