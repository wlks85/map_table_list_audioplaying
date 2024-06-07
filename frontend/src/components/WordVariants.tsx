import React, { useEffect, useState } from 'react';
// import { ReactSVG } from 'react-svg';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';
import { useNavigate, useParams } from 'react-router-dom';
import { WordService } from '../services/WordService';
import { FaChevronLeft } from 'react-icons/fa6';

const PlayButton = ({width=50,height=50,...rest})=> (
  // <ReactSVG width={200} height={200} src="assets/play.svg" />
  <div {...rest} style={{width: `${width}px`, height: `${height}px,`}} {...rest} >
    <svg fill="#000000" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 60 60">
      <g>
        <path d="M45.563,29.174l-22-15c-0.307-0.208-0.703-0.231-1.031-0.058C22.205,14.289,22,14.629,22,15v30
          c0,0.371,0.205,0.711,0.533,0.884C22.679,45.962,22.84,46,23,46c0.197,0,0.394-0.059,0.563-0.174l22-15
          C45.836,30.64,46,30.331,46,30S45.836,29.36,45.563,29.174z M24,43.107V16.893L43.225,30L24,43.107z"/>
        <path d="M30,0C13.458,0,0,13.458,0,30s13.458,30,30,30s30-13.458,30-30S46.542,0,30,0z M30,58C14.561,58,2,45.439,2,30
          S14.561,2,30,2s28,12.561,28,28S45.439,58,30,58z"/>
      </g>
    </svg>
  </div>
);


const StickyNavbar: React.FC<{ word: Word; }> = ({ word }) => {
  const [isVisible, setIsVisible] = useState(false);
  const navigate = useNavigate();

  const handleScroll = () => {
    const offset = window.scrollY;
    if (offset > 50) { // Adjust the value based on when you want the navbar to appear
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const goBack = ()=> {
    navigate("/");
  }

  return (
    <>
    <div className={`fixed flex items-center gap-4 top-0 left-0 right-0 bg-ultraviolet text-white p-4 transition-transform duration-300 ${isVisible ? 'translate-y-0' : '-translate-y-full'}`}>
      <div className=""><FaChevronLeft size={23} onClick={goBack} /></div>
      <div><h1 className="text-xl">{word.title}</h1></div>
    </div>
    <header className="flex items-center gap-4 bg-ultraviolet text-white p-4 border-b top-0 left-0 right-0">
      <div className=""><FaChevronLeft size={23} onClick={goBack}/></div>
      <div className='flex flex-col'>
        <h1 className="text-2xl">{word?.title}</h1>
        <h2 className="text-sm">{word?.sub_title}</h2>
      </div>
      
    </header>
    </>
    
  );
};

interface Variant {
  _id: string;
  title: string;
  locations?: ILocation[],
  pronounciation?: string;
}

interface Word {
  _id: string,
  title: string;
  variants: Variant[];
  sub_title?: string;
}


const WordVariants: React.FC = () => {
  const { wordId } = useParams<{ wordId: string }>();
  const [variants, setVariants] = useState<Variant[]>([]);
  const [word, setWord] = useState<Word | null>(null);
  const [expandedVariant, setExpandedVariant] = useState<string | null>(null);
  const toggleAccordion = (variantId: string) => {
    console.log("id", variantId)
    setExpandedVariant(expandedVariant === variantId ? null : variantId);
  };

  useEffect(() => {
    if(wordId) {
      WordService.getWord(wordId)
      .then((wordResponse) => {
        setWord(wordResponse);
        setVariants(wordResponse?.variants); 
    })
    }
  }, [wordId]);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const playAudio = (variant: Variant | ILocation)=> {
    const audio = new Audio(variant?.pronounciation || `https://dictionary.cambridge.org/media/english/uk_pron/u/ukh/ukhol/ukholdu027.mp3`);
    audio.play();
  }

  return word && (
    <div className="flex flex-col h-screen mb-32">
      {word && <StickyNavbar word={word} />}
      <div className="flex-grow overflow-auto p-2">
        <div className="bg-white text-black  flex gap-1 flex-col">
          {variants.map(variant => (
            <div key={variant._id} className="pt-4 pb-4 pr-4 items-center shadow">
              <div className="flex justify-between ">
                <div className="flex gap-4 items-center">
                  <div><PlayButton width={30} height={30} /></div>
                  <span className='text-2xl capitalize cursor-pointer'>{variant.title}</span> 
                  {/* <FaVolumeHigh onClick={()=> playAudio(variant)} />  */}
                  </div>
                {expandedVariant !== variant._id ? (<FaChevronDown className='text-primary' size={23} onClick={() => toggleAccordion(variant._id)} />): (<FaChevronUp className='text-primary' size={23} onClick={() => toggleAccordion(variant._id)} />)}
              </div>
              {expandedVariant === variant._id && (
                <LocationsList variant={variant} title={word?.title} />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

interface ILocation {
  _id: string,
  place: string;
  pronounciation?: string;
}

const LocationsList: React.FC<{ variant: Variant, title: string }> = ({ variant,title }) => {
  const [locations, setLocations] = useState<ILocation[]>([]);

  useEffect(() => {
    WordService.getWord(title, [variant.title])
    .then(({variants})=> {
      setLocations(variants[0].locations)
    });
  }, [variant.title]);

  return (
    <ul className="h-80 overflow-auto mt-2">
      {locations.map(location => (
        <li key={location._id} className="border-b hover:bg-slate-300 text-right">
          <div className="flex gap-5 p-4">
            <div className="relative">
              <img src="https://img.freepik.com/free-photo/close-up-fresh-apple_144627-14640.jpg?size=626&ext=jpg" width={100}/>
              <PlayButton className="absolute bg-red-400 left-0 top-8" width={50} height={50}/>
            </div>
            <div>
              <div className='text-black text-2xl'>{location.place}</div>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default WordVariants;
