import './index.css'

import { NavLink } from 'react-router-dom';

import Logo from "../logo/logo";

const NavBar = () => {
    return (
      <div>
        <div className='navWrapper'>
          <Logo />
          <div className='logoDiv'>
            <NavLink to="/portfolio-website/home"><span>Home</span></NavLink>
            <NavLink to="/portfolio-website/projects"><span>Projects</span></NavLink>
            <NavLink to="/portfolio-website/about-me"><span>About me</span></NavLink>
          </div>
        </div>
      </div>
    );
  }
  
  export default NavBar;