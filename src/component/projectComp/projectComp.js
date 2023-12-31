import React from 'react';
import './index.css';

import linkIcon from '../img/link.png';

const ProjectComp = ({ components,pic,info,link,head }) => {
  return (
    <div className='projCompContainer'>
      <div className='projCompDiv1'>
        {components.map((el, index) => (
          <div key={index} className='projComponents' style={{ backgroundImage: `url(${el})` }}></div>
        ))}
        <div className='projCompDiv2'>
            <img src={pic} className='projImage' alt='j'/>
            <div className='projHead'>{head}</div>
            <div className='projInfo'>{info}</div>
            <a className='projLink' href={link} target='blank'>
                <div id='div1'>View Repository</div>
                <div style={{backgroundImage: `url(${linkIcon})`}} id='div2'></div>
            </a>
        </div>
      </div>
    </div>
  );
};

export default ProjectComp;