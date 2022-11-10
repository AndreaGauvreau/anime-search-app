import './App.css';
import SearchBar from './components/SearchBar';
import ListingContent, { AnimeList, TopAnime } from './components/ListingContent';
import Anime from './components/ListingContent';
import React,{ useState } from 'react';
import { AnimeCacheProvider } from './components/cacheAnime';




function App() {
  const [searchList, setSearchList]=useState(false)
  const [animeName, setAnimeName]=useState('')
  const [dataAnime, setDataAnime]=useState([])
  return (
    <div className="App">
      <h1>Trouve ton Anime préféré</h1>
      <label><input type='checkbox' checked={searchList} onChange={e=>setSearchList(e.target.checked)}/>chercher une liste</label>
      <SearchBar animeName={animeName} setAnimeName={setAnimeName} />
      <AnimeCacheProvider>
      {searchList ? <AnimeList animeName={animeName} dataAnime={dataAnime} setDataAnime={setDataAnime} /> :<Anime animeName={animeName} dataAnime={dataAnime} setDataAnime={setDataAnime} /> }
    <TopAnime animeName={animeName} dataAnime={dataAnime} setDataAnime={setDataAnime}/>
      </AnimeCacheProvider>
    </div> 
  );
}

export default App;

