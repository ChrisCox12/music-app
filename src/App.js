import './App.css';
import { useSelector } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import { Searchbar, Sidebar, MusicPlayer, TopPlayed } from './components';
import { 
  AroundYou, ArtistDetails, 
  Discover, Search, 
  SongDetails, TopArtists, 
  TopCharts 
} from './pages';


export default function App() {
  const { activeSong } = useSelector(state => state.player);


  return (
    <div className="App">
      <Sidebar />

      <div className='App__body'>
        <Searchbar />

        <div className='App__body__content'>
          <div className='App__body__content__r'>
            <Routes>
              <Route path='/' element={<Discover />} />
              <Route path='/top-artists' element={<TopArtists />} />
              <Route path='/top-charts' element={<TopCharts />} />
              <Route path='/around-you' element={<AroundYou />} />
              <Route path='/artists/:artistId' element={<ArtistDetails />} />
              <Route path='/songs/:songId' element={<SongDetails />} />
              <Route path='/search/:searchTerm' element={<Search />} />
            </Routes>
          </div>

          <div className='App__body__content__tp'>
            <TopPlayed />
          </div>
        </div>
      </div>

      {activeSong?.title && (
        <div className='App__body__MusicPlayerContainer'>
          <MusicPlayer />
        </div>
      )}
    </div>
  );
}
