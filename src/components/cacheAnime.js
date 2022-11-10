import React from 'react'
import { useContext, useReducer } from 'react'
import { createContext } from 'react'

const AnimeCacheContext=createContext()

export function animeCacheReducer(state, action){
    const ttl = 1000*60*60
    const expire = Date.now()+ttl

    switch(action.type){
        case 'ADD_ANIME':
            return{...state,[action.animeName]:{data:action.animeData, expire}}
        case 'ADD_ANIME_LIST':
            return{...state,[`${action.animeName}-list`]:{data:action.animeData, expire}}

        default:
            throw new Error(`action non suppporté ${action.type}`)
    }
}

export function AnimeCacheProvider(props) {
    const [cache, dispatch]=useReducer(animeCacheReducer,{})
  return <AnimeCacheContext.Provider value={[cache, dispatch]} {...props} />
}

export function useAnimeCache(){
    const context=useContext(AnimeCacheContext)
    if(!context){
        throw new Error('useAnimeCache doit etre utilisé avec AnimeCacheProvider')
    }
    return context
}