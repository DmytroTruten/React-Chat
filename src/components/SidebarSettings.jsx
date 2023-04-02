import React from 'react';
import Button from "react-bootstrap/Button";

const SidebarSettings = ({state}) => {
  return (
    <div className={`SidebarSettings ${state}`}>
      <Button className='LogoutButton' size='sm'>
        Logout
      </Button>
    </div>
  )
}

export default SidebarSettings;