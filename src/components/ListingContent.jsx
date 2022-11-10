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
    <motion.div className='carousel'>
    <motion.div className='inner-carousel' >
      {animes.map( (animes, index) =>(
      <motion.div className='item' key={index}><AnimeView name={animes} animeName={animeName} /></motion.div> )
      )}
   </motion.div>
   </motion.div>)
  }


}

