import React, {useState, useEffect, useReducer} from 'react'
import './animeviewcard.css'
import { AnimeView, useAnimeExist, useAnimeInfos } from './fetchAnime'


export default function Anime({animeName}){

  const animeExist=useAnimeExist(animeName)
  const state=useAnimeInfos(animeName)

  const {name}=state

      return(<div>
{name ? <AnimeView name={name} animeName={animeName} /> : 'existe pas'}
         </div>)

}
