import { renderToString } from '@react-pdf/renderer'
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
    })
}

export function fetchAnimeList(animeName) {
    const url = `https://api.consumet.org/anime/gogoanime/${animeName}`
   return fetch(url)
    .then(response => response.json())
    .then(json => json.results)
    .catch(error => {
      return Promise.reject(
        new Error(`Aucun Anime trouvé avec le nom "${animeName}"`),
      )
    })
}



const reducer=(state, action)=>{
switch(action.type){
    case 'fetching':
         return{status: 'fetching',data:null, error:null}  
    case 'done':
         return{status: 'done',data:action.payload, error: null}
    case 'fail':
        return{status: 'fail',data:null, error: action.error}
    default:
        throw new Error('action non supporté')
}}

export function useAnimeInfos(animeName){
    const [state, dispatch]=useReducer(reducer, {
        name:null,
        error:null,
        status: 'idle'})
    
    useEffect(()=>{
        
        if(!animeName){return}
        dispatch({type:'fetching'})
        fetchAnime(animeName)
        .then(name => dispatch({type:'done', payload: name}))
        .catch(error=>dispatch({type:'fail', error}))
    },[animeName])
    
    return state
}


export function AnimeView({animeName, name}){
    return(
        <div id='animeviewcard'>
            <img id='firstimage' src={name.image}/>
            <img id='secondimage' src={name.image}/>
            <img id='thridimage' src={name.image}/>
            <span>{name.title}</span>
            <span>{name.releaseDate}</span> 
        </div>
    )}



export function useFetchData(search, fetch){
    const [state, dispatch]=useReducer(reducer, {
        name:null,
        error:null,
        status: 'idle'})
    
    useEffect(()=>{
        
        if(!search){return}
        dispatch({type:'fetching'})
        fetch(search)
        .then(result => dispatch({type:'done', payload: result}))
        .catch(error=>dispatch({type:'fail', error}))
    },[search])
    
    return state   
}

export function useFindAnimeName(animeName){
    return(
        useFetchData(animeName, fetchAnime)
    )
}

export function useFindAnimeList(animeName){
    return(
        useFetchData(animeName, fetchAnimeList)
    )
}