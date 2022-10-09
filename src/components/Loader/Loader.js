import React from 'react';
import './Loader.css';
import { CgSpinnerTwo } from 'react-icons/cg';


export default function Loader() {

    return (
        <div className='Loader'>
            <div className='Loader__Spinner'><CgSpinnerTwo /></div>
            
            <h1>Loading...</h1>
        </div>
    )
}