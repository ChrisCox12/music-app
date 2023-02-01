import React from 'react';
import Songbar from '../Songbar/Songbar';
import './TopSongs.css';


export default function TopSongs({ topSongs, artistId, isPlaying, activeSong }) {
    //console.log(topSongs)

    return (
        <div className='TopSongs'>
            <h1 className='TopSongs__head'>Top Songs:</h1>

            <div className='TopSongs__Songs'>
                {topSongs?.map((song, index) => (
                    <Songbar 
                        key={`${song?.id}-${artistId}`}
                        song={song}
                        index={index}
                        artistId={artistId}
                        isPlaying={isPlaying}
                        activeSong={activeSong}
                    />
                ))}
            </div>
        </div>
    )
}