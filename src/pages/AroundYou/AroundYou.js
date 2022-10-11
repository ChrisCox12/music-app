import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { Error, SongCard, Loader } from '../../components';
import { useGetSongsByCountryQuery } from '../../redux/utils/shazamCore';
import './AroundYou.css';


const geoipify_api_key = process.env.REACT_APP_GEOIPIFY_API_KEY;

export default function AroundYou() {
    const [country, setCountry] = useState('');
    const [loading, setLoading] = useState(true);
    const { activeSong, isPlaying } = useSelector(state => state.player);
    const { data, isFetching, error } = useGetSongsByCountryQuery({ countryCode: country });
    //console.log(error, country)

    useEffect(() => {
        // Finds country using GeoIpify api 
        // NOTE: Sometimes the geolocation information doesn't get pulled, leaving the songs section blank
        axios.get(`https://geo.ipify.org/api/v2/country?apiKey=${geoipify_api_key}`)
            .then(res => setCountry(res?.data?.location?.country))
            .catch(err => console.log('Error Fetching Songs Around You'))
            .finally(() => setLoading(false))
    }, [country]);


    if (isFetching && loading) return <Loader />;
    if (error && country) return <Error />;

    return (
        <div className='AroundYou'>
            <h2 className='AroundYou__Head'>Around You in <span>{country}</span></h2>

            <div className='AroundYou__Songs'>
                {data?.map((song, index) => (
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