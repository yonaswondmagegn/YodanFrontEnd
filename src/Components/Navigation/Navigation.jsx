import React from 'react'
import './NavigationCss/navigation.css'
import { Link } from 'react-router-dom'
import CartIcon from '../Cart/CartIcon'

const Navigation = () => {
    return (
        <div className='nav'>
            <div className="logo">
                <p className="logo__yodan">Yodan <span className='logo__yodan_cosmotics'>Cosmotics</span></p>
            </div>
            <div className="nav__rigthside__mobile">
                <div className="nav__search__icon">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M11 19C15.4183 19 19 15.4183 19 11C19 6.58172 15.4183 3 11 3C6.58172 3 3 6.58172 3 11C3 15.4183 6.58172 19 11 19Z" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M21 21L16.65 16.65" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M11 8V14" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M8 11H14" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>

                </div>
                <CartIcon />
                <div className="nav__menu__icon">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M3 6H21" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M3 12H21" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M3 18H21" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>

                </div>
            </div>
            <div className="nav__rightside">
                <div className="nav__search">
                    <input type="search" name="" placeholder='Search...' className='nav__search__input' id="" />
                </div>
                <div className="nav__lists">
                    <Link to='/' >Home</Link>
                    <Link to='/' >Cart</Link>
                    <Link to='/' >Home </Link>
                    <Link to='/' >Home</Link>
                </div>
            </div>
        </div>
    )
}

export default Navigation