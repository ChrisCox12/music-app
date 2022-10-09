import React from 'react';
import { BsFillVolumeUpFill, BsVolumeDownFill, BsFillVolumeMuteFill } from 'react-icons/bs';
import './VolumeBar.css';


export default function VolumeBar({ value, min, max, onChange, setVolume }) {

    return (
        <div className='VolumeBar'>
            {(value <= 1 && value > 0.5) && (
                <BsFillVolumeUpFill size={25} color='#fff' onClick={() => setVolume(0)} />
            )}

            {(value <= 0.5 && value > 0) && (
                <BsVolumeDownFill size={25} color='#fff' onClick={() => setVolume(0)} />
            )}

            {value === 0 && (
                <BsFillVolumeMuteFill size={25} color='#fff' onClick={() => setVolume(1)} />
            )}

            <input
                className='VolumeBar__input'
                type='range'
                step='any'
                value={value}
                min={min}
                max={max}
                onChange={onChange}
            />
        </div>
    )
}