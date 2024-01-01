import ProjectComp from "../component/projectComp/projectComp";
import NavBar from '../component/Nav bar/navBar';

import twilight from '../component/img/Screenshot 2023-12-30 194637.png';
import workoutBuddy from '../component/img/workoutBuddy.png';
import weatherIO from '../component/img/weatherIO.png';
import erc20 from '../component/img/ERC20.png';
import cc from '../component/img/CarbonChain.png';
import quiz from '../component/img/quizFlow.png';
import urbanEnig from '../component/img/urbanEnigma.jpeg';
import theGall from '../component/img/theGallery.png';

import mongodbIcon from '../component/img/mongodb.png';
import reactIcon from '../component/img/react.png';
import nodeIcon from '../component/img/node.png';
import expressNode from '../component/img/express.png';
import python from '../component/img/python.png';
import dart from '../component/img/dart.png';
import flutter from '../component/img/flutter.png';
import androidStu from '../component/img/android-studio.png';
import js from '../component/img/javascript.png';
import css from '../component/img/css.png';
import html from '../component/img/html.png';
import hardHat from '../component/img/hard-hat.png';
import eth from '../component/img/ethereum.png';
import cmake from '../component/img/cmake.png';
import fireB from '../component/img/firebase.png';
import cpp from '../component/img/c++.png';

const Projects = () => {

    const myStyle = {
        height:'200vh',
        padding:'0px',
        margin:'0px'
    }

    const divStyle = {
        marginLeft:'4.9rem',
        marginRight:'4.9rem',
        marginTop:'3.5rem'
    }

    return(
        <div style={myStyle}>
            <NavBar/>
            <div style={divStyle} className="projectsWrapper">
                <h1 style={{marginBottom:'5rem'}}>My Projects</h1>
                <div className="projectsContainer" >
                    <ProjectComp 
                        components={[mongodbIcon,expressNode,reactIcon,nodeIcon,fireB,html,css,js]} 
                        pic={twilight} 
                        info={"A digital oasis where music and magic intertwine. Powered by the MERN stack, this sleek platform offers a personalized auditory journey. It's not just music; it's a cosmic concert of cool, where technology and melody perform a nightly serenade just for you."}
                        head={'Twilight'}
                        link={'https://github.com/AMS003010/Twilight'}
                    />
                    <ProjectComp 
                        components={[mongodbIcon,expressNode,reactIcon,nodeIcon,html,css,js]} 
                        pic={workoutBuddy} 
                        info={'WorkOut-buddy is a dynamic website developed on the MERN (MongoDB, Express.js, React, Node.js) stack, designed to empower fitness enthusiasts on their wellness journey.'} 
                        head={'WorkoutBuddy'}
                        link={'https://github.com/AMS003010/WorkoutBuddy'}
                    />
                    <ProjectComp 
                        components={[cpp,cmake]} 
                        pic={weatherIO} 
                        info={'A console weather application written in c++. It fetches weather information from the OpenWeatherApi using the REST Api Architecture.'} 
                        head={'weatherIO'}
                        link={'https://github.com/AMS003010/weatherIO'}
                    />
                    <ProjectComp 
                        components={[eth,hardHat,js]} 
                        pic={erc20} 
                        info={'This project demonstrates the process to create your very own custom ERC20 Tokens using the HardHat Framework. Here, the project is built on the SEPOLIA TEST NETWORK.'} 
                        head={'Custom-ERC20-Token'}
                        link={'https://github.com/AMS003010/Custom-ERC20-Token'}
                    />
                    <ProjectComp 
                        components={[androidStu,flutter,dart]} 
                        pic={quiz} 
                        info={'A Fast, Responsive Quiz app built with Flutter UI, written in Dart'} 
                        head={'QuizFlow-Flutter-Edition'}
                        link={'https://github.com/AMS003010/QuizFlow-Flutter-Edition'}
                    />
                    <ProjectComp 
                        components={[python]} 
                        pic={urbanEnig} 
                        info={'An exciting Text-Based Adventure game built with Python.Its is made Immersive and Engaging with Sound and Visual Effects :)'} 
                        head={'Urban-Enigma'}
                        link={'https://github.com/AMS003010/Urban-Enigma'}
                    />
                    <ProjectComp 
                        components={[eth,hardHat,js]} 
                        pic={cc} 
                        info={'A Carbon Credit Marketplace for Offsetting Carbon Emissions'} 
                        head={'CarbonChain'}
                        onGoing={true}
                    />
                    <ProjectComp 
                        components={[eth,js,html,css]} 
                        pic={theGall} 
                        info={'A NFT marketplace'}
                        head={'The Gallery'}
                        onGoing={true}
                    />
                </div>
            </div>
        </div>
    )
}

export default Projects;