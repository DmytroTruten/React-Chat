import React from 'react';
import { useContext } from 'react';
import { ChatContext } from '../context/ChatContext';
import "../styles/Navbar/Navbar.css"

const Navbar = () => {
  const {data} = useContext(ChatContext)

  return(
    <div className='Navbar d-flex flex-column'>
      <p className='NavbarUsername'>{data.user?.displayName}</p>
      {/* <p className='NavbarUserLastSeen'>online</p> */}
    </div>
  )
}

export default Navbar;