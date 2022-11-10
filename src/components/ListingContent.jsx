import React, {useState, useEffect, useReducer, useRef} from 'react'
import './animeviewcard.css'
import { AnimeView, TopAnimeView, useAnimeInfos, useFindAnimeList, useFindAnimeName } from './fetchAnime'
import { motion } from "framer-motion"
import { AnimeCacheProvider } from './cacheAnime'


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
   </motion.div>
)
  }


}




export function TopAnime(){
  const animeName='top-airing'
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

    <motion.div className='top_div'>
  <h2>Top animes du moment 🔥</h2>
    <motion.div className='top_inner' >

    
      {animes.map( (animes, index) =>(
      <motion.div className='item_top' key={index}><TopAnimeView name={animes} animeName={animeName} /></motion.div> )
      )}


   </motion.div>
   </motion.div>
)
  }


}
