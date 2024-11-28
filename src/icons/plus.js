import React from 'react';

export default ({fill = '#101D46'}) => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill='none' xmlns="http://www.w3.org/2000/svg">
        <g filter="url(#filter0_b_15_529)">
            <path d="M13 19H11V13H5V11H11V5H13V11H19V13H13V19Z" fill={fill} />
        </g>
        <defs>
            <filter id="filter0_b_15_529" x="-5" y="-5" width="34" height="34" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                <feFlood floodOpacity="0" result="BackgroundImageFix"/>
                <feGaussianBlur in="BackgroundImageFix" stdDeviation="5"/>
                <feComposite in2="SourceAlpha" operator="in" result="effect1_backgroundBlur_15_529"/>
                <feBlend mode="normal" in="SourceGraphic" in2="effect1_backgroundBlur_15_529" result="shape"/>
            </filter>
        </defs>
    </svg>
);
