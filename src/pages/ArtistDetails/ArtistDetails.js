import React from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { DetailsHeader, Error, Loader, TopSongs } from '../../components';
import { useGetArtistDetailsQuery } from '../../redux/utils/shazamCore';
import parse from 'html-react-parser';
import './ArtistDetails.css';


export default function ArtistDetails() {
    const { artistId } = useParams();
    const { activeSong, isPlaying } = useSelector(state => state.player);
    const { data: artistData, isFetching: isFetchingArtistDetails, error } = useGetArtistDetailsQuery({ artistId });


    if (isFetchingArtistDetails) return <Loader />;
    if (error) return <Error />;

    return (
        <div className='ArtistDetails'>
            <DetailsHeader artistId={artistId} artistData={artistData.data[0]}  />

            <div className='ArtistDetails__Bio'>
                <h1 className='ArtistDetails__Bio__Head'>Bio:</h1>

                {artistData?.data[0]?.attributes?.artistBio ? (
                    <p className='ArtistDetails__Bio__Bio'>{parse(artistData.data[0].attributes.artistBio)}</p>
                ) : (
                    <p className='ArtistDetails__Bio__Bio'>Sorry, no bio found</p>
                )}
            </div>
            
            
            <TopSongs 
                topSongs={artistData.data[0].views['top-songs'].data} 
                artistId={artistId} 
                isPlaying={isPlaying}
                activeSong={activeSong}   
            />
        </div>
    )
}