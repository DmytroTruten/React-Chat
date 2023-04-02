import React from 'react';
import Button from "react-bootstrap/Button";

const SidebarSettings = (props) => {
  return (
    <div className={`SidebarSettings ${props.state}`}>
      <Button className='LogoutButton' size='sm'>
        Logout
      </Button>
    </div>
  )
}

export default SidebarSettings;