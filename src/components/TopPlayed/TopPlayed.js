import { React, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode } from 'swiper';
import PlayPause from '../PlayPause';
import { playPause, setActiveSong } from '../../redux/slices/playerSlice';
import { useGetTopChartsQuery } from '../../redux/utils/shazamCore';
import ImageNotFound from '../ImageNotFound/ImageNotFound';
import './TopPlayed.css';
import 'swiper/css';
import 'swiper/css/free-mode';


function TopChartCard({ song, index, isPlaying, activeSong, handlePauseClick, handlePlayClick }) {
    
    return (
        <div className={`TopChartCard ${(activeSong?.title === song.title && activeSong?.subtitle === song.subtitle) ? '--active' : ''}`}>
            <h3>{index + 1}.</h3>
            
            <div className='TopChartCard__Song'>
                {song?.images?.coverart ? (
                    <img className='TopChartCard__Song__CoverArt' src={song.images.coverart} alt='cover art' />
                ) : (
                    <ImageNotFound />
                )}

                <div className='TopChartCard__Song__Links'>
                    <Link className='TopChartCard__Song__Links__Song' to={`/songs/${song?.key}`}>
                        {song?.title}
                    </Link>

                    {song?.artists ? (
                        <Link className='TopChartCard__Song__Links__Artist--Link' to={`/artists/${song?.artists[0].adamid}`}>
                            {song?.subtitle}
                        </Link>
                    ) : (
                        <p className='TopChartCard__Song__Links__Artist--NonLink'>{song?.subtitle}</p>
                    )}
                </div>
            </div>

            <PlayPause 
                isPlaying={isPlaying}
                activeSong={activeSong}
                song={song}
                handlePause={handlePauseClick}
                handlePlay={handlePlayClick}
            />
        </div>
    )
}

export default function TopPlayed() {
    const dispatch = useDispatch();
    const { activeSong, isPlaying } = useSelector(state => state.player);
    const { data } = useGetTopChartsQuery();
    const ref = useRef(null);
    const topPlays = data?.slice(0, 5); // top 5


    /* useEffect(() => {
        //  scrolls to the top of the div because
        //  on smaller screens, for some reason, it starts at the bottom
        //  also causes the page to scroll down slightly everytime the pause play button is hit on larger screens
        ref.current.scrollIntoView({ behavior: 'smooth' });
    }); */

    function handlePauseClick() {
        dispatch( playPause(false) );
    }

    function handlePlayClick(song, index) {
        dispatch( setActiveSong({ song, data, index }) );
        dispatch( playPause(true) );
    }

    
    return (
        <div className='TopPlayed' ref={ref}>
            <div className='TopPlayed__Chart'>
                <div className='TopPlayed__Chart__Head'>
                    <h2>Top Charts</h2>

                    <Link to='/top-charts'>
                        See More
                    </Link>
                </div>

                <div className='TopPlayed__Chart__Songs'>
                    {topPlays?.map((song, index) => (
                        <TopChartCard 
                            key={song.key}
                            song={song}
                            index={index}
                            isPlaying={isPlaying}
                            activeSong={activeSong}
                            handlePauseClick={handlePauseClick}
                            handlePlayClick={() => handlePlayClick(song, index)}
                        />
                    ))}
                </div>
            </div>

            <div className='TopPlayed__TopArtists'>
                <div className='TopPlayed__Chart__Head'>
                    <h2>Top Artists</h2>

                    <Link to='/top-artists'>
                        See More
                    </Link>
                </div>

                <Swiper
                    slidesPerView='auto'
                    spaceBetween={15}
                    freeMode
                    centeredSlides
                    centeredSlidesBounds
                    modules={[FreeMode]}
                    className='TopPlayed__TopArtists__Swiper'
                >
                    {topPlays?.map(song => (
                        <SwiperSlide 
                            key={song?.key}  
                            className='TopPlayed__TopArtists__Swiper__SwiperSlide'
                        >
                            {song?.artists ? (
                                <>
                                    <Link to={`/artists/${song?.artists[0]?.adamid}`}>
                                        <img src={song?.images.background} alt={`artist ${song?.subtitle}`} />
                                    </Link>
                                    <span>{song?.subtitle}</span>
                                </>
                                
                            ) : (
                                <>
                                    <ImageNotFound />
                                    <span>{song?.subtitle}</span>
                                </>
                            )}
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </div>
    )
}