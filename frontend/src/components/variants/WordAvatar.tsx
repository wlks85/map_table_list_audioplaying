import React from 'react';
import PlayButton from './PlayButton';

interface IWordAvatar {
    width: number; 
    height: number;
    media?: string;
    hasAction?: boolean;
    onClick?: Function;
}

const WordAvatar: React.FC<IWordAvatar> = ({media, width, height, hasAction=true, onClick}) => {
    const src: string = media || "https://img.freepik.com/free-photo/close-up-fresh-apple_144627-14640.jpg?size=626&ext=jpg";
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
                width={playBtnWidth}
                height={playBtnHeight}
                onClick={handleClick}
                />) }
      </div>
    );
  }

export default WordAvatar
