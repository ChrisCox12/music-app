import React from 'react';
import './Discover.css';
import { SongCard, Error, Loader } from '../../components';
import { genres } from '../../constants';
import { useDispatch, useSelector } from 'react-redux';
import { useGetSongsByGenreQuery } from '../../redux/utils/shazamCore';
import { selectGenreListId } from '../../redux/slices/playerSlice';


export default function Discover() {
    const { isPlaying, activeSong, genreListId } = useSelector(state => state.player);
    const { data, isFetching, error } = useGetSongsByGenreQuery({ genreCode: genreListId || 'POP' });
    const dispatch = useDispatch();
    const genreTitle = genres.find(({ value }) => value === genreListId)?.title || 'Pop'; //  if genreTitle is not in genres array, then set to 'Pop'

    
    if (isFetching) return <Loader />;
    if (error) return (<Error />);

    return (
        <div className='Discover'>
            <div className='Discover__genre-selector'>
                <h2>Discover {genreTitle}</h2>
                
                <select
                    onChange={(e) => dispatch( selectGenreListId(e.target.value) )}
                    value={genreListId || 'pop'}
                    title='genre-selector'
                >
                    {genres.map(genre => (
                        <option key={genre.value} value={genre.value}>{genre.title}</option>
                    ))}
                </select>
            </div>    

            <div className='Discover__songs'>
                {data?.map((song, index) => (
                    <SongCard 
                        key={song.key} 
                        song={song} 
                        index={index} 
                        isPlaying={isPlaying} 
                        activeSong={activeSong} 
                        data={data} 
                    />
                ))}
            </div>
        </div>
    )
}