import React from 'react';
import './ArtistCard.css';
import { useNavigate } from 'react-router-dom';
import ImageNotFound from '../ImageNotFound/ImageNotFound';


export default function ArtistCard({ track }) {
    const navigate = useNavigate();    

    
    return (
        <div className='ArtistCard' onClick={() => navigate(`/artists/${track?.artists[0].adamid}`)}>
            {track?.images?.coverart ? (
                <img 
                    src={track.images.coverart}
                    alt='artist'
                    className='ArtistCard__CardImage'
                />
            ) : (
                <ImageNotFound />
            )}
            
            <p className='ArtistCard__ArtistName'>{track?.subtitle}</p>
        </div>
    )
}

