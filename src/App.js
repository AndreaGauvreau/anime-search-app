import './App.css';
import SearchBar from './components/SearchBar';
import ListingContent, { AnimeList } from './components/ListingContent';
import Anime from './components/ListingContent';
import { useState } from 'react';

function App() {
  const [list, setList]=useState(false)
  const [animeName, setAnimeName]=useState('')
  const [dataAnime, setDataAnime]=useState([])
  return (
    <div className="App">
      <h1>Trouve ton Anime préféré</h1>
      <SearchBar animeName={animeName} setAnimeName={setAnimeName} />
      <Anime animeName={animeName} dataAnime={dataAnime} setDataAnime={setDataAnime} /> 
     </div> 
  );
}

export default App;

