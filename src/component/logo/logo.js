import './index.css'

import logoImg from '../img/logo.png'

const Logo = () => {
    return(
        <div className='logoContainer'>
            <img src={logoImg} alt='logo'/>
            <span>Abhi</span>
        </div>
    )
}

export default Logo;