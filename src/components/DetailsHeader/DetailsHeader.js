import React from 'react';
import { Link } from 'react-router-dom';
import ImageNotFound from '../ImageNotFound/ImageNotFound';
import './DetailsHeader.css';


export default function DetailsHeader({ artistId, artistData, songData }) {
    const artist = artistData?.attributes;
    
    return (
        <div className='DetailsHeader'>
            <div className='DetailsHeader__Details'>
                {artist?.artwork?.url ? (
                    <img 
                        src={artist.artwork.url.replace('{w}', 500).replace('{h}', 500)}
                        alt='cover art'
                    />
                ) : songData?.images?.coverart ? (
                    <img 
                        src={songData.images.coverart}
                        alt='cover art'
                    />
                ) : (
                    <ImageNotFound />
                )}

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