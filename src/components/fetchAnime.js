import React, {useState, useEffect, useReducer} from 'react'
import './animeviewcard.css'

export function fetchAnime(animeName) {
    const url = `https://api.consumet.org/anime/gogoanime/${animeName}`
   return fetch(url)
    .then(response => response.json())
    .then(json => json.results[0])
    .catch(error => {
      return Promise.reject(
        new Error(`Aucun Anime trouvé avec le nom "${animeName}"`),
      )
    }) // ERROR APPEL API
}

export function useAnimeExist(animeName){
    const [exist, setExist]=useState(true)
    useEffect(()=>{
        if(!animeName){
            return
        }
        fetchAnime(animeName)
        .then(()=>setExist(true))
        .catch(()=> setExist(false))

    },[animeName])

    return (exist)
}




const reducer=(state, action)=>{
    return{...state, ...action}
}

export function useAnimeInfos(animeName){
    const [state, dispatch]=useReducer(reducer, {
        name:null
        })
    
    useEffect(()=>{
        if(!animeName){
            return
        }
        fetchAnime(animeName)
        .then(name=>dispatch({name}))


    },[animeName])

    return state
}








export function AnimeView({animeName, name}){
    return(
        <div id='animeviewcard'>
            <img id='firstimage' src={name.image}/>
            <img id='secondimage' src={name.image}/>
            <span>{name.title}</span>
            <span>{name.releaseDate}</span>
            
        </div>
    )
}


