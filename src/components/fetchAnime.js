import { renderToString } from '@react-pdf/renderer'
import React, {useState, useEffect, useReducer} from 'react'
import { useCallback } from 'react'
import './animeviewcard.css'
import { useAnimeCache } from './cacheAnime'

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




export function useFetchData(search, fetch){
    const [state, dispatch]=useReducer(reducer, {
        name:null,
        error:null,
        status: 'idle'})
        
        const {data, error, status}=state
        const execute = useCallback(promise=>{
            dispatch({type:'fetching'})
            promise.then(result => dispatch({type:'done', payload: result}))
            .catch(error=>dispatch({type:'fail', error}))
            
        },[])
        const setData=useCallback(data=>dispatch({type:'done', payload:data}), [dispatch])
        return {data, error, status, execute, setData}   
    }
    
    export function useFindAnimeName(animeName){
        
        const [cache, dispatch]=useAnimeCache()
        const {data, error, status, setData, execute}=useFetchData()
        
            useEffect(()=>{
        if(!animeName){
            return
        }else if(cache[`${animeName}`]?.data && Date.now() < cache[`${animeName}`]?.expire){
            setData(cache[`${animeName}`].data)
        }else{
            execute(fetchAnime(animeName).then(animeData=>{
                dispatch({type:'ADD_ANIME', animeName,animeData})
                return animeData
            }))
        }
    },[animeName, execute, cache, setData, dispatch])
    return {data, error, status}
}

export function useFindAnimeList(animeName){
    
    const [cache, dispatch]=useAnimeCache()
    const {data, error, status, setData, execute}=useFetchData()

    useEffect(()=>{
        if(!animeName){
            return
        }else if(cache[`${animeName}-list`]?.data && Date.now() < cache[`${animeName}-list`]?.expire){
            setData(cache[`${animeName}-list`].data)
        }else{
            execute(fetchAnimeList(animeName).then(animeData=>{
                dispatch({type:'ADD_ANIME_LIST', animeName,animeData})
                return animeData
            }))
        }
    },[animeName, execute, cache, setData, dispatch])
    return {data, error, status}
}

export function useFindAnimeTop(){
    const animeName='top-airing'
    const [cache, dispatch]=useAnimeCache()
    const {data, error, status, setData, execute}=useFetchData()

    useEffect(()=>{
        if(!animeName){
            return
        }else if(cache[`${animeName}-list`]?.data && Date.now() < cache[`${animeName}-list`]?.expire){
            setData(cache[`${animeName}-list`].data)
        }else{
            execute(fetchAnimeList(animeName).then(animeData=>{
                dispatch({type:'ADD_ANIME_LIST', animeName,animeData})
                return animeData
            }))
        }
    },[animeName, execute, cache, setData, dispatch])
    return {data, error, status}
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


    export function TopAnimeView({animeName, name}){
        return(
            <div id='topanimeviewcard'>
                <div>
                    <img id='mainimage' src={name.image}/>
                    <img id='backgroundimage' src={name.image}/>
                </div>
                <div>
                <h3><u>{name.title}</u></h3>
                    <span>Genres:</span>
                    <ul>{name.genres.map(e=><li key={e.id}>{e}</li>)}</ul>
                </div>

            </div>
        )}
    
    