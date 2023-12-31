import ProjectComp from "../component/projectComp/projectComp";
import NavBar from '../component/Nav bar/navBar';

import mongodbIcon from '../component/img/mongodb.png';
import reactIcon from '../component/img/react.png';
import nodeIcon from '../component/img/node.png';
import expressNode from '../component/img/express.png';

import projPic from '../component/img/Screenshot 2023-12-30 194637.png'

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
                    <ProjectComp components={[mongodbIcon,expressNode,reactIcon,nodeIcon]} pic={projPic} info={'The official website for Hombale Films Salaar movie, leading world-wide campaigns like Salaar Fan Army and Salaar Creative Squad.'} head={'Twilight'} link={'https://github.com/AMS003010/Twilight'}/>
                    <ProjectComp components={[expressNode,nodeIcon]} pic={projPic} info={'The official website for Hombale Films Salaar movie, leading world-wide campaigns like Salaar Fan Army and Salaar Creative Squad.'} head={'Twilight'}/>
                    <ProjectComp components={[reactIcon]} pic={projPic} info={'The official website for Hombale Films Salaar movie, leading world-wide campaigns like Salaar Fan Army and Salaar Creative Squad.'} head={'Twilight'}/>
                    <ProjectComp components={[mongodbIcon,expressNode,reactIcon,nodeIcon]} pic={projPic} info={'The official website for Hombale Films Salaar movie, leading world-wide campaigns like Salaar Fan Army and Salaar Creative Squad.'} head={'Twilight'}/>
                    <ProjectComp components={[expressNode,nodeIcon]} pic={projPic} info={'The official website for Hombale Films Salaar movie, leading world-wide campaigns like Salaar Fan Army and Salaar Creative Squad.'} head={'Twilight'}/>
                    <ProjectComp components={[reactIcon]} pic={projPic} info={'The official website for Hombale Films Salaar movie, leading world-wide campaigns like Salaar Fan Army and Salaar Creative Squad.'} head={'Twilight'}/>
                    <ProjectComp components={[mongodbIcon,expressNode,reactIcon,nodeIcon]} pic={projPic} info={'The official website for Hombale Films Salaar movie, leading world-wide campaigns like Salaar Fan Army and Salaar Creative Squad.'} head={'Twilight'}/>
                    <ProjectComp components={[expressNode,nodeIcon]} pic={projPic} info={'The official website for Hombale Films Salaar movie, leading world-wide campaigns like Salaar Fan Army and Salaar Creative Squad.'} head={'Twilight'}/>
                    <ProjectComp components={[reactIcon]} pic={projPic}/>
                </div>
            </div>
        </div>
    )
}

export default Projects;