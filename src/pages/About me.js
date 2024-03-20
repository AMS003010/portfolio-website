import NavBar from "../component/Nav bar/navBar";
import Footer from "../component/footer/footer";

import myPic from '../component/img/my_pic2.jpeg';

const AboutMe = () => {
    return( 
        <div className="aboutMeMainContainer">
            <NavBar />
            <div className="AboutAboutMeWrapper">
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
            <Footer />
        </div>
    )
}

export default AboutMe;