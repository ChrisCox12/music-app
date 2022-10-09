import React, { useState } from 'react';
import './Searchbar.css';
import { useNavigate } from 'react-router-dom';
import { FiSearch } from 'react-icons/fi';


export default function Searchbar() {
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState('');


    function handleSubmit(e) {
        e.preventDefault();

        navigate(`/search/${searchTerm}`);
    }


    return (
        <div className='Searchbar'>
            <form className='Searchbar__Form' autoComplete='off' onSubmit={handleSubmit}>
                <label className='Searchbar__Form__Label' htmlFor='search-field'>Search songs</label>

                <div className='Searchbar__Form__InputBar'>
                    <FiSearch className='Searchbar__Form__InputBar__Icon' />

                    <input
                        autoComplete='off'
                        placeholder='Search'
                        id='search-field'
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className='Searchbar__Form__InputBar__Input'
                    />
                </div>
            </form>
        </div>
    )
}