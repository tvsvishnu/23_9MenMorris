import { BrowserRouter as Router, Link, Routes, Route } from "react-router-dom";

import { Menu, Icon, Dropdown, Input } from 'semantic-ui-react'
import Cookies from "universal-cookie";

import { useNavigate } from "react-router-dom";
function NAvbar() {
    const navigate = useNavigate()
    
    const handleLogout = (e) => {
        navigate("/logout");

    }
    var cook = new Cookies();
    var email_id = cook.get("email_id");
    var loggedin = cook.get("logged_in");
    return (
        <div>
           {loggedin === true ?  
           <Menu>
   <Menu.Item as={Link} name='Create Game' to='/game' />
   <Menu.Item as={Link} name='Created Games' to='/created' />
   <Menu.Item as={Link} name='Game Page' to='/game_page/:game_id' />
   <Menu.Item as={Link} name='Join Game' to='/join' />
    <Menu.Menu position="right">
                     <Dropdown item trigger={<>                    <Icon name="user circle" />{email_id} </>} >
                         <Dropdown.Menu>
                          <Dropdown.Item onClick={handleLogout}>
                          <Icon name="sign-out" />Logout </Dropdown.Item></Dropdown.Menu></Dropdown> </Menu.Menu>

   </Menu>
      : 
      <>
   
<Menu>
   <Menu.Item as={Link} name='Login' to='/login' />
   <Menu.Item as={Link} name='Register' to='/register' />
   </Menu>
     </>
  }

        </div>
    )
}

export default NAvbar;