import React from 'react';
import { useSelector } from 'react-redux';
import { useGetTopChartsQuery } from '../../redux/utils/shazamCore';
import { SongCard, Error, Loader } from '../../components';
import './TopCharts.css';


export default function TopCharts() {
    const { activeSong, isPlaying } = useSelector(state => state.player);
    const { data, isFetching, error } = useGetTopChartsQuery();

    
    if (isFetching) return <Loader />;
    if (error) return <Error />;

    return (
        <div className='TopCharts'>
            <h2 className='TopCharts__Head'>Top Charts</h2>

            <div className='TopCharts__Songs'>
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