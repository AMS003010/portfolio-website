import './index.css'

import githubIcon from '../img/github.png'
import linkedinIcon from '../img/linkedin.png'
import twitterIcon from '../img/twitter.png'

const InProgress = () => {
    const myStyle = {
        width:'50%',
        textAlign:'center',
        padding:'10px',
        marginBottom:'3rem',
    };

    const containerStyle = {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        flexDirection:'column',
        background: 'radial-gradient(at top left,#40E0D0, skyblue)'
    };

    return (
        <div style={containerStyle} className="inProgressDiv">
            <div style={myStyle} className='inProgressText'>
                Still  working  on  it....
            </div>
            <div className='commentContainer' style={{fontFamily:'Poppins',fontWeight:'900'}}>Bored😅. Check out my socials...</div>
            <div  className='socialDiv'>
                <a href='https://www.linkedin.com/in/abhijith-m-s-221855275/' target='blank'>
                    <img src={linkedinIcon} alt='l' className='socialIcon'/>
                </a>
                <a href='https://github.com/AMS003010' target='blank'>
                    <img src={githubIcon} alt='l' className='socialIcon'/>
                </a>
                <a href='https://twitter.com/ams_132_' target='blank'>
                    <img src={twitterIcon} alt='l' className='socialIcon'/>
                </a>
            </div>
        </div>
    );
};

export default InProgress;
