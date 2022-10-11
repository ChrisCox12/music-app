import React from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { DetailsHeader, Error, RelatedSongs, Loader } from '../../components';
import { setActiveSong, playPause } from '../../redux/slices/playerSlice';
import { useGetSongDetailsQuery, useGetRelatedSongsQuery } from '../../redux/utils/shazamCore';
import './SongDetails.css';


export default function SongDetails() {
    const { songId } = useParams();    
    const dispatch = useDispatch();
    const { activeSong, isPlaying } = useSelector(state => state.player);
    const { data: songData, isFetching: isFetchingSongDetails } = useGetSongDetailsQuery({ songId });
    const { data: relatedSongs, isFetching: isFetchingRelatedSongs, error } = useGetRelatedSongsQuery({ songId });
    //console.log(relatedSongs)
    
    function handlePauseClick() {
        dispatch( playPause(false) );
    }

    function handlePlayClick(song, index) {
        dispatch( setActiveSong({ song, relatedSongs, index }) );
        dispatch( playPause(true) );
    }


    if (isFetchingRelatedSongs || isFetchingSongDetails) return <Loader />;
    if (error) return <Error />;

    return (
        <div className='SongDetails'>
            <DetailsHeader artistID={''} songData={songData} />

            <div className='SongDetails__Lyrics'>
                <h2>Lyrics:</h2>

                <div className='SongDetails__Lyrics__Lyrics'>
                    {songData?.sections[1].type === 'LYRICS' ? (
                            songData?.sections[1].text.map((line, index) => (
                                <p key={index}>{line}</p>
                            ))
                        ) : (
                            <p>Sorry, no lyrics found</p>
                        )}
                </div>
            </div>

            <RelatedSongs 
                data={relatedSongs}
                isPlaying={isPlaying}
                activeSong={activeSong}
                handlePauseClick={handlePauseClick}
                handlePlayClick={handlePlayClick}
            />
        </div>
    )
}