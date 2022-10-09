import React from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { DetailsHeader, Error, RelatedSongs, Loader } from '../../components';
import { useGetArtistDetailsQuery } from '../../redux/utils/shazamCore';
import './ArtistDetails.css';


export default function ArtistDetails() {
    const { artistId } = useParams();
    const { activeSong, isPlaying } = useSelector(state => state.player);
    const { data: artistData, isFetching: isFetchingArtistDetails, error } = useGetArtistDetailsQuery({ artistId });


    if (isFetchingArtistDetails) return <Loader />;
    if (error) return <Error />;
    
    return (
        <div className='ArtistDetails'>
            <DetailsHeader artistId={artistId} artistData={artistData}  />

            <RelatedSongs 
                data={Object.values(artistData?.songs)}
                artistId={artistId}
                isPlaying={isPlaying}
                activeSong={activeSong}
            />
        </div>
    )
}