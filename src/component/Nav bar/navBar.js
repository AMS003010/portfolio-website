import './index.css'

import { NavLink } from 'react-router-dom';

import Logo from "../logo/logo";

const NavBar = () => {
    const updateLogoContent = () => {
      const logoDiv = document.querySelector('.logoDiv');
      if (logoDiv) {
        if (window.innerWidth <= 450) {
          // Remove existing child nodes from logoDiv
          while (logoDiv.firstChild) {
            logoDiv.removeChild(logoDiv.firstChild);
          }
  
          // Create and append a new empty div with the class "logoDivChild"
          const node = document.createElement("div");
          node.className = "logoDivChild";
          logoDiv.appendChild(node);
        } else {
          // Reset the content if needed
          // For example, you can add back the span elements
          logoDiv.innerHTML = '<span>Home</span><span>Projects</span><span>About me</span>';
        }
      }
    };
  
    // Initial check on page load
    updateLogoContent();
  
    // Add event listener for window resize
    window.addEventListener('resize', updateLogoContent);
  
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
  