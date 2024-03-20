import githubIcon from '../img/github.png';
import linkedinIcon from '../img/linkedin.png';
import twitterIcon from '../img/twitter.png';
import emailIcon from '../img/email.png';

import './index.css';

const Footer = () => {
    return(
        <div className='footerWrapper'>
        <hr/>
            <div className='footerContainer'>
                <div className='iconContainer'>
                    <a href='https://www.linkedin.com/in/abhijith-m-s-221855275/' target='blank'><img src={linkedinIcon} alt='linkedin'/></a>
                    <a href='https://twitter.com/ams_132_' target='blank'><img src={twitterIcon} alt='twitter'/></a>
                    <a href='https://github.com/AMS003010' target='blank'><img src={githubIcon} alt='github'/></a>
                    <a href='mailto:abhijithmsaji132@gmail.com'><img src={emailIcon} alt='email'/></a>
                </div>
                <div className='msgContainer'>
                    Let's keep in touch! <span>😄</span>
                </div>
                <div className='coprightContainer'>
                    &#169; Made with ❣️ by Abhijith M S
                </div>
            </div>
        </div>
    )
}

export default Footer;