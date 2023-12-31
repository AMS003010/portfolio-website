import './index.css'

import myPot from '../img/myPortrait1.png'

const MyPortriat = () => {

    return(
        <div className='potContainer'>
            <div style={{width:'50px',height:'50px',borderRadius:'100%',borderStyle:'solid',borderColor:'#0a192f',borderWidth:'1px',backgroundColor:'#0c274e',content:' ',position:'absolute',zIndex:'2',left:'68rem',top:'11rem'}}></div>
            <div style={{width:'150px',height:'150px',borderRadius:'100%',borderStyle:'solid',borderColor:'#0a192f',borderWidth:'1px',backgroundColor:'#0c274e',content:' ',position:'absolute',zIndex:'2',left:'67rem',top:'20rem'}}></div>
            <div style={{backgroundImage:`url(${myPot})`,width:'300px',height:'300px',borderRadius:'100%',borderStyle:'solid',borderColor:'yellowgreen',borderWidth:'1px',backgroundRepeat:'no-repeat',backgroundSize:'cover',backgroundPosition:'right top',backgroundColor:'#0c1e3a',zIndex:'0'}}></div>
        </div>
    )
}

export default MyPortriat;