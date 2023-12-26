import './index.css'

import logoImg from '../img/logoCircle.png'

const Logo = () => {
    return(
        <div>
            <div className='logoContainer'>
                <img src={logoImg} alt='logo'/>
                <span>Abhi.</span>
            </div>
        </div>
    )
}

export default Logo;