import React from 'react';
import './Track.css';


export default function Track({ isPlaying, isActive, activeSong }) {

    return (
        <div className='Track'>
            <div className={`Track__cover-art ${(isPlaying && isActive) ? 'animate-art' : ''}`}>
                <img src={activeSong?.images?.coverart} alt='cover art' />
            </div>

            <div className='Track__details'>
                <p className='Track__details__title'>
                    {activeSong?.title ? activeSong?.title : 'No active song'}
                </p>

                <p className='Track__details__artist'>
                    {activeSong?.subtitle ? activeSong?.subtitle : 'No active song'}
                </p>
            </div>
        </div>
    )
    
}