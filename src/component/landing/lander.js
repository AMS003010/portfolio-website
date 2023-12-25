import './index.css'

import React, { useEffect } from 'react';
import anime from 'animejs';

const HexagonAnimation = () => {
  useEffect(() => {
    const anim = anime.timeline({
      loop: false,
      direction: 'alternate',
    });

    anim
      .add({
        targets: '#hexagonPath',
        strokeDashoffset: [anime.setDashoffset, 0],
        easing: 'easeInOutQuart',
        duration: 2000,
        delay: function(el, i) {
          return i * 250;
        },
      })
      .add({
        targets: '#A',
        duration: 1000,
        opacity: 1,
        easing: 'easeInOutQuart',
      });
  }, []);

  return (
    <div style={{display:'flex',alignItems:'center',justifyContent:'center'}}>
        <div className="container">
        <svg
            id="hexagon"
            viewBox="0 0 320 550"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
        >
            <g>
            <path
                id="hexagonPath"
                stroke="#64FFDA"
                strokeWidth="5"
                strokeLinecap="round"
                strokeLinejoin="round"
                d ="M 155, 5
                    L 305, 155
                    L 155, 305
                    L 5,155
                    L 155, 5"                
            />
            <path
                id="hexagonPath"
                stroke="#64FFDA"
                strokeWidth="5"
                strokeLinecap="round"
                strokeLinejoin="round"
                d ="M 155, 55
                    L 305, 205
                    L 155, 355
                    L 5,205
                    L 155, 55"                
            />
            <path
                id="hexagonPath"
                stroke="#64FFDA"
                strokeWidth="5"
                strokeLinecap="round"
                strokeLinejoin="round"
                d ="M 155, 105
                    L 305, 255
                    L 155, 405
                    L 5,255
                    L 155, 105"                
            />
            <text
                id="A"
                fill="#64FFDA"
                style={{ opacity: 0 }}
                fontSize="30"
                fontWeight="400"
                letterSpacing="4.16666603"
                textAnchor="middle"
                alignmentBaseline="middle"
            >
                <tspan x="150" y="520" style={{fontFamily:'Michroma',fontSize:'5rem'}}>
                Abhi.
                </tspan>
            </text>          
            </g>
        </svg>
        </div>
    </div>
  );
};

export default HexagonAnimation;