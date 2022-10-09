import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { RiCloseLine } from 'react-icons/ri';
import { HiOutlineMenu } from 'react-icons/hi';
import { links } from '../../constants';
import './Sidebar.css';


function Navlinks({ handleClick }) {
    return (
        <div className='Links'>
            {links?.map((link, index) => (
                <NavLink 
                    className='Links__link' 
                    key={index} 
                    to={link.to} 
                    onClick={() => handleClick && handleClick()}
                >
                    <link.icon className='Links__link__icon' />
                    {link.name}
                </NavLink>
            ))}
        </div>
    )
}

export default function Sidebar() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    return (
        <>
            <div className='Sidebar'>
                <Navlinks /> 
            </div>
            
            <div className='MenuButton'>
                {mobileMenuOpen ? (
                        <RiCloseLine onClick={() => setMobileMenuOpen(false)} />
                    ) : (
                        <HiOutlineMenu onClick={() => setMobileMenuOpen(true)} /> 
                    )
                }
            </div>

            <div className={`MobileMenu ${mobileMenuOpen ? 'on-screen' : 'off-screen'}`}>
                <Navlinks handleClick={() => setMobileMenuOpen(false)} />
            </div>
        </>
        
    )
}