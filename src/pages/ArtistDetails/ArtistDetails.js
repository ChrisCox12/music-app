import React from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { DetailsHeader, Error, RelatedSongs, Loader, TopSongs } from '../../components';
import { useGetArtistDetailsQuery } from '../../redux/utils/shazamCore';
import parse from 'html-react-parser';
import './ArtistDetails.css';


export default function ArtistDetails() {
    const { artistId } = useParams();
    const { activeSong, isPlaying } = useSelector(state => state.player);
    const { data: artistData, isFetching: isFetchingArtistDetails, error } = useGetArtistDetailsQuery({ artistId });


    if (isFetchingArtistDetails) return <Loader />;
    if (error) return <Error />;
    
    //console.log(artistData.data[0])

    return (
        <div className='ArtistDetails'>
            <DetailsHeader artistId={artistId} artistData={artistData.data[0]}  />

            <p className='ArtistDetails__Bio'>{parse(artistData.data[0].attributes.artistBio)}</p>

            <TopSongs 
                topSongs={artistData.data[0].views['top-songs'].data} 
                artistId={artistId} 
                isPlaying={isPlaying}
                activeSong={activeSong}   
            />
            {/* <DetailsHeader artistId={artistId} artistData={artistData}  />

            <RelatedSongs 
                data={Object.values(artistData?.songs)}
                artistId={artistId}
                isPlaying={isPlaying}
                activeSong={activeSong}
            /> */}
        </div>
    )
}