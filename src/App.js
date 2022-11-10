import './App.css';
import SearchBar from './components/SearchBar';
import ListingContent, { AnimeList } from './components/ListingContent';
import Anime from './components/ListingContent';
import React,{ useState } from 'react';



function App() {
  const [searchList, setSearchList]=useState(false)
  const [animeName, setAnimeName]=useState('')
  const [dataAnime, setDataAnime]=useState([])
  return (
    <div className="App">
      <h1>Trouve ton Anime préféré</h1>
      <label><input type='checkbox' checked={searchList} onChange={e=>setSearchList(e.target.checked)}/>chercher une liste</label>
      <SearchBar animeName={animeName} setAnimeName={setAnimeName} />
      {searchList ? <Anime animeName={animeName} dataAnime={dataAnime} setDataAnime={setDataAnime} /> :<AnimeList animeName={animeName} dataAnime={dataAnime} setDataAnime={setDataAnime} /> }
    </div> 
  );
}

export default App;

