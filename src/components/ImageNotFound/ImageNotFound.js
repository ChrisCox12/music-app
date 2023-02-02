import React from 'react';
import image_not_available from '../../assets/Image_not_available.png';


export default function ImageNotFound() {

    return (
        <img src={image_not_available} alt='Not Found' />
    )
}