import NavBar from "../component/Nav bar/navBar";

import githubIcon from '../component/img/github.png';
import linkedinIcon from '../component/img/linkedin.png';
import resumeIcon from '../component/img/resume.png';
import myPic from '../component/img/my_pic2.jpeg';

import { Link } from 'react-router-dom';

const Home = () => {

    const myStyle = {
        padding:'0px',
        margin:'0px'
    }

    const divStyle = {
        display: 'flex',
    }

    return(
        <div style={myStyle} className="homeMainContainer">
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
                        <a href='https://drive.google.com/file/d/1nPhu3KKcF8lSqnirV4QJNHr_rZJ3ZOkx/view?usp=sharing' target='blank' className="socialHomeLink">
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
            <div className="projButtonContainer">
                <Link to="/portfolio-website/projects" style={{textDecoration:'none'}}>
                    <button class="button-86">View my projects</button>
                </Link>
            </div>
            <div className="homeAboutMeWrapper">
                <h1>About me</h1>
                <div className="homeAboutMeContainer">
                    <div className="homeAboutMeContent">
                        I am Abhijith, a <span className="conTag">passionate</span> and forward-thinking BTECH Computer Science student based in the vibrant city of Bengaluru. Hailing from the picturesque coastal regions of Kerala, I find inspiration in the convergence of technology and innovation.
                        My journey in the realm of technology is marked by a profound fascination for cutting-edge advancements. From delving into the intricacies of <span className="conTag">Blockchain</span> and the exciting world of web3 to exploring the intricacies of <span className="conTag">Microservice</span> architecture,<span className="conTag">DevOps</span> ,networking, and distributed computation, I am driven by an insatiable curiosity. I find inner peace when working with a build that boasts a stellar <span className="conTag">UI/UX</span>.<br/><br/>
                        I find particular joy in navigating the complexities of the <span className="conTag">Hyperspace Protocol</span> and the <span className="conTag">Tornado Protocol</span>. Launching <span className="conTag">Containers</span> and <span className="conTag">Pods</span>  is not just a task but a delightful experience that fuels my enthusiasm for the dynamic field of technology.
                        Ever the avid learner, I am always on the lookout for opportunities to expand my expertise and stay abreast of emerging technologies. The intricate concepts of networking, with their ability to shape the digital landscape, hold a special place in my heart.<br/><br/>
                        <span className="hashTag">#TechEnthusiast</span> &nbsp;&nbsp;<span className="hashTag">#InnovationLover</span>&nbsp;&nbsp; <span className="hashTag">#ContinuousLearner</span>&nbsp;&nbsp;🚀✨ 
                    </div>
                    <img className="homeAboutMePic" src={myPic} alt="Profilepic"/>
                </div>
            </div>
        </div>
    )
}

export default Home;