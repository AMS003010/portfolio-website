import NavBar from "../component/Nav bar/navBar";

import coverPic from '../component/img/cover.jpg'

const Home = () => {
    return(
        <div>
            <NavBar/>
            <div className='homeContainer'>
                <div className='infoDiv'>
                    <div className="content">
                        Hello there!!, I’m <span>Abhijith M S</span> and I would love to Empower <span>Decentralized</span> Dreams Through <span>Web3</span>😀.
                    </div>
                    <div className="socialmedia">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30 30" width="50px" height="50px">
                            <g>
                                <path d="M15,3c-6.627,0 -12,5.373 -12,12c0,6.627 5.373,12 12,12c6.627,0 12,-5.373 12,-12c0,-6.627 -5.373,-12 -12,-12zM10.496,8.403c0.842,0 1.403,0.561 1.403,1.309c0,0.748 -0.561,1.309 -1.496,1.309c-0.842,0.001 -1.403,-0.561 -1.403,-1.309c0,-0.748 0.561,-1.309 1.496,-1.309zM12,20h-3v-8h3zM22,20h-2.824v-4.372c0,-1.209 -0.753,-1.488 -1.035,-1.488c-0.282,0 -1.224,0.186 -1.224,1.488c0,0.186 0,4.372 0,4.372h-2.917v-8h2.918v1.116c0.376,-0.651 1.129,-1.116 2.541,-1.116c1.412,0 2.541,1.116 2.541,3.628z" fill="#ffffff"/>
                            </g>
                        </svg>
                    </div>
                </div>
                <div className='imgDiv' style={{backgroundImage:`url('${coverPic}')`}}></div>
            </div>
        </div>
    )
}

export default Home;

//What is wrong in this svg