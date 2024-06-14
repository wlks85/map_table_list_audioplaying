import React from 'react';
import PlayButton from './PlayButton';

interface IWordAvatar {
    width: number; 
    height: number;
    media?: string;
    audio?: string;
    hasAction?: boolean;
    onClick?: Function;
}

const WordAvatar: React.FC<IWordAvatar> = ({media, width, height, hasAction=true, onClick, audio}) => {
    const src: string = media || "https://img.freepik.com/free-photo/close-up-fresh-apple_144627-14640.jpg?size=626&ext=jpg";
    const audioSrc: string = audio || `${window.location.origin}/ukholdu027.mp3`;
    const imageWidth = width;
    // const imageHeight = height;
    const playBtnWidth = width;
    const playBtnHeight = height;
    const handleClick = ()=> {
        if(onClick && typeof onClick === "function") {
            onClick();
        }
    }
    return (
      <div className="relative">
        <img className='block' src={src} width={imageWidth}/>
        {hasAction && (
            <PlayButton 
                className="absolute inset-0"
                size={playBtnWidth}
                color='#000000'
                url={audioSrc}
                />) }
      </div>
    );
  }

export default WordAvatar
