import React from 'react';
import { Link } from 'react-router-dom';
import './DetailsHeader.css';


export default function DetailsHeader({ artistId, artistData, songData }) {
    //console.log(artistData.data[0].attributes)
    //const artist = artistData?.artists[artistId]?.attributes;
    //const artist = artistData?.data[0]?.attributes;
    const artist = artistData?.attributes;
    //console.log('song data: ', songData)
    
    return (
        <div className='DetailsHeader'>
            <div className='DetailsHeader__Details'>
                <img 
                    src={artistId ? (
                            artist?.artwork?.url.replace('{w}', 500).replace('{h}', 500)
                        ) : (
                            songData?.images?.coverart
                        )}
                    alt='cover art'
                />

                <div className='DetailsHeader__Details__Item'>
                    <p className='DetailsHeader__Details__Item__Name'>{artistId ? artist?.name : songData?.title}</p>

                    {(!artistId && songData?.artists) ? (
                        <Link className='DetailsHeader__Details__Item__Link' to={`/artists/${songData?.artists[0]?.adamid}`}>
                            {songData?.subtitle}
                        </Link>
                    ) : (
                        <p className='DetailsHeader__Details__Item__Artist'>{songData?.subtitle}</p>
                    )}

                    <p className='DetailsHeader__Details__Item__Genre'>{artistId ? artist?.genreNames[0] : songData?.genres?.primary}</p>
                </div>
            </div>
        </div>
    )
}