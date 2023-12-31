import NavBar from "../component/Nav bar/navBar";

import githubIcon from '../component/img/github.png';
import linkedinIcon from '../component/img/linkedin.png';
import resumeIcon from '../component/img/resume.png';

const Home = () => {

    const myStyle = {
        height:'100vh',
        padding:'0px',
        margin:'0px'
    }

    const divStyle = {
        display: 'flex',
        marginLeft:'3.3rem',
        marginRight:'3.3rem'
    }

    return(
        <div style={myStyle}>
            <NavBar />
            <div className='introHomeContainer' style={divStyle}>
                <div className="introHome">
                    Hi there!<br/>
                    I'm <span className="homeName">Abhijith M S</span><br/>
                    <div className="homeDesc">
                        <div>Passionate&nbsp;<span>.</span>&nbsp;Developer&nbsp;<span>.</span>&nbsp;Innovator</div><br/>
                        Dedicated and Creative with a Flair for Transforming Ideas into Technological Marvels. Currently pursuing my BTech in Computer Science at PES University in Bengaluru. 
                    </div>
                    <div style={{display:'flex'}}>
                        <a href='https://www.linkedin.com/in/abhijith-m-s-221855275/' target='blank' className="socialHomeLink">
                            <img src={resumeIcon} alt='l' className='socialHomeIcon'/>&nbsp;My Resume
                        </a>
                        <a href='https://www.linkedin.com/in/abhijith-m-s-221855275/' target='blank' className="socialHomeLink">
                            <img src={linkedinIcon} alt='l' className='socialHomeIcon'/>&nbsp;Linkedin
                        </a>
                        <a href='https://github.com/AMS003010' target='blank' className="socialHomeLink">
                            <img src={githubIcon} alt='l' className='socialHomeIcon'/>&nbsp;Github
                        </a>
                    </div>                   
                </div>
                <div className="panelHome">   
                </div>
            </div>
        </div>
    )
}

export default Home;