import './index.css'

import Logo from "../logo/logo";

const NavBar = () => {
    return(
        <div>
            <div  className='navWrapper'>
                <Logo/>
                <div className='logoDiv'>
                    <span>Home</span>
                    <span>Projects</span>
                    <span>About me</span>
                </div>
            </div>            
        </div>
    )
}

export default NavBar;