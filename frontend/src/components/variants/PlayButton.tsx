//@ts-nocheck
import React,{useState} from 'react';
import { BaseProps } from '../types';
import './bottonPlay.css';
import AudioPlayer  from "../../lib";
interface IPlayButton extends BaseProps {
    size?: number;
    color?: string;
    onClick?: Function;
    url?: string;
}
const isHexString = (hex) => {
    const hexRegex = /^#([0-9A-F]{3}){1,2}$/i;
    return hexRegex.test(hex);
  };

const isRGBAString = (rgbaStr) => {
    const result = rgba.match(/rgba?\((\d+), (\d+), (\d+),? ?([\d.]+)?\)/);
    if(!result) return false;
    return true;
};

// Function to convert RGBA string to Hex
const rgbaStringToHex = (rgba) => {
    const result = rgba.match(/rgba?\((\d+), (\d+), (\d+),? ?([\d.]+)?\)/);
    if (!result) {
        console.error(`Invalid RGBA string: ${rgba}`);
        return null;
    }

    const r = parseInt(result[1]);
    const g = parseInt(result[2]);
    const b = parseInt(result[3]);
    const a = result[4] !== undefined ? parseFloat(result[4]) : 1;

    const toHex = (n) => {
        const hex = Math.round(n).toString(16);
        return hex.length === 1 ? '0' + hex : hex;
    };

    const alpha = Math.round(a * 255);
    return `#${toHex(r)}${toHex(g)}${toHex(b)}${toHex(alpha)}`;
};

// Example usage
const hexColor = rgbaStringToHex('rgba(244, 71, 31, 0.2)');
console.log(hexColor); // Output: #f4471f33
  

const hexToRgba = (hex: string, opacity: number) => {
    if(!isHexString(hex)) return hex;
    let r = 0, g = 0, b = 0;
    if (hex.length === 4) {
      r = parseInt(hex[1] + hex[1], 16);
      g = parseInt(hex[2] + hex[2], 16);
      b = parseInt(hex[3] + hex[3], 16);
    } else if (hex.length === 7) {
      r = parseInt(hex[1] + hex[2], 16);
      g = parseInt(hex[3] + hex[4], 16);
      b = parseInt(hex[5] + hex[6], 16);
    }
    return `rgba(${r}, ${g}, ${b}, ${opacity})`;
  };

const playAudio = (url: string, done: ()=> void)=> {
    AudioPlayer.setSrc(url);
    AudioPlayer.setEndListener(done);
    AudioPlayer.play();
}

const PlayButton: React.FC<IPlayButton> = ({url, size,color,...rest}) => {
  const [isActive, setIsActive] = useState(false);

  const toggleClass = () => {
    setIsActive(!isActive);
    if(!isActive) {
        playAudio(url as string, ()=> {
            setIsActive(false);
        })
    }
  };

  const btnColor = !color ? '#000000': color;
  const btnSize = !size ? 100: size;
  const buttonStyle = {
    '--play-btn-size': `${size}px`,
    '--play-btn-color': hexToRgba(btnColor, 0.3),
    '--play-icon-color': btnColor,
  };

  return (
    <div {...rest}>
        <div style={buttonStyle} className={`boton ${isActive ?  'active' : ''}`} onClick={toggleClass}>
        <div className="fondo"></div>
        <div className="icono">
            <div className="parte izquierda"></div>
            <div className="parte derecha"></div>
        </div>
        <div className="puntero"></div>
        </div>
    </div>
    
  );
};

export default PlayButton;
