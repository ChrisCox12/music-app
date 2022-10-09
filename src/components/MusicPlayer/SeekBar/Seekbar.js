import React from 'react';
import './Seekbar.css';


export default function Seekbar({ value, min, max, onInput, setSeekTime, appTime }) {
    // converts the time to format 0:00
    function getTime(time) {
        const minutes = `${Math.floor(time / 60)}`;
        const seconds = `${(`0${Math.floor(time % 60)}`).slice(-2)}`;

        return `${minutes}:${seconds}`;
    }


    return (
        <div className='Seekbar'>
            <button className='Seekbar__lower' type='button' onClick={() => setSeekTime(appTime - 5)}> - </button>

            <p className='Seekbar__timer-1'>{value === 0 ? '0:00' : getTime(value)}</p>

            <input 
                className='Seekbar__time-input'
                type='range'
                step='any'
                value={value}
                min={min}
                max={max}
                onInput={onInput}
            />

            <p className='Seekbar__timer-2'>{max === 0 ? '0:00' : getTime(max)}</p>

            <button className='Seekbar__raise' onClick={() => setSeekTime(appTime + 5)}> + </button>
        </div>
    )
}