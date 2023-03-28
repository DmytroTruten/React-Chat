import React from 'react';
import "../styles/Navbar/Navbar.css"

const Navbar = () => {
  return(
    <div className='Navbar d-flex flex-column'>
      <p className='NavbarUsername'>Username Example</p>
      <p className='NavbarUserLastAppearance'>online</p>
    </div>
  )
}

export default Navbar;