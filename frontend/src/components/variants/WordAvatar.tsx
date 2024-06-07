import React from 'react';
import PlayButton from './PlayButton';

const WordAvatar: React.FC<{width: number, height: number,media?: string,hasAction?: boolean}> = ({media, width, height, hasAction=true}) => {
    const src: string = media || "https://img.freepik.com/free-photo/close-up-fresh-apple_144627-14640.jpg?size=626&ext=jpg";
    const imageWidth = width;
    // const imageHeight = height;
    const playBtnWidth = width;
    const playBtnHeight = height;
    return (
      <div className="relative">
        <img className='block' src={src} width={imageWidth}/>
        {hasAction && (<PlayButton className="absolute inset-0" width={playBtnWidth} height={playBtnHeight}/>) }
      </div>
    );
  }

export default WordAvatar
