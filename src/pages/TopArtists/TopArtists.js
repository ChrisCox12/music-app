import React from 'react';
import { Error, ArtistCard, Loader } from '../../components';
import { useGetTopChartsQuery } from '../../redux/utils/shazamCore';
import './TopArtists.css';


export default function TopArtists() {
    const { data, isFetching, error } = useGetTopChartsQuery();


    if (isFetching) return <Loader />;
    if (error) return <Error />;

    return (
        <div className='TopArtists'>
            <h2 className='TopArtists__Head'>Top Artists</h2>

            <div className='TopArtists__Songs'>
                {data?.map(track => (
                    <ArtistCard
                        key={track.key}
                        track={track}
                    />
                ))}
            </div>
        </div>
    )
}