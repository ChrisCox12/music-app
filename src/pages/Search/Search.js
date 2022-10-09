import React from 'react';
import './Search.css';
import { useParams } from 'react-router-dom';
import { useGetSongsBySearchQuery } from '../../redux/utils/shazamCore';
import { Error } from '../../components';
import { useSelector } from 'react-redux';
import { SongCard, Loader } from '../../components';


export default function Search() {    
    const { searchTerm } = useParams();
    const { activeSong, isPlaying } = useSelector(state => state.player);
    const { data, isFetching, error } = useGetSongsBySearchQuery({ searchTerm });
    const songs = data?.tracks?.hits?.map(song => song.track);

    
    if (isFetching) return <Loader />;
    if (error) return <Error />;

    return (
        <div className='Search'>
            <h2 className='Search__Head'>Showing results for {searchTerm}</h2>

            <div className='Search__Songs'>
                {songs?.map((song, index) => (
                    <SongCard 
                        key={song.key}
                        song={song}
                        isPlaying={isPlaying}
                        activeSong={activeSong}
                        data={data}
                        index={index}
                    />
                ))}
            </div>
        </div>
    )
}