/* eslint-disable jsx-a11y/media-has-caption */
import React, { useRef, useEffect } from 'react';


export default function Player({ 
    activeSong, isPlaying, 
    volume, seekTime, 
    onEnded, onTimeUpdate, 
    onLoadedData, repeat 
}) {
    const ref = useRef(null); // since media playback is involved, refs is good use;
                              // refs provide a way to access the audio element below

    // eslint-disable-next-line no-unused-expressions
    if (ref.current) {
        if (isPlaying) {
            ref.current.play();
        }
        else {
            ref.current.pause();
        }
    }

    // updates volume only on volume changes
    useEffect(() => {
        ref.current.volume = volume;
    }, [volume]);

    // updates audio element only on seekTime change (and not on each re-render)
    useEffect(() => {
        ref.current.currentTime = seekTime;
    }, [seekTime]);


    return (
        <audio 
            src={activeSong?.hub?.actions[1]?.uri}
            ref={ref}
            loop={repeat}
            onEnded={onEnded}
            onTimeUpdate={onTimeUpdate}
            onLoadedData={onLoadedData}
        />
    )
}