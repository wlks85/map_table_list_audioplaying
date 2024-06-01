import React, { useEffect, useState } from 'react';
import { FaPlusCircle,FaMinusCircle } from 'react-icons/fa';
import { useNavigate, useParams } from 'react-router-dom';
import { WordService } from '../services/WordService';
import { FaChevronLeft, FaVolumeHigh } from 'react-icons/fa6';


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
            <div key={variant._id} className="p-4 items-center shadow">
              <div className="flex justify-between ">
                <div className="flex gap-2"><span className='text-2xl capitalize cursor-pointer'>{variant.title}</span> <FaVolumeHigh onClick={()=> playAudio(variant)} /> </div>
                {expandedVariant !== variant._id ? (<FaPlusCircle className='text-primary' size={23} onClick={() => toggleAccordion(variant._id)} />): (<FaMinusCircle className='text-primary' size={23} onClick={() => toggleAccordion(variant._id)} />)}
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
    <ul className="h-80 overflow-auto mt-2 pl-4">
      {locations.map(location => (
        <li key={location._id} className="p-2 border-b hover:bg-slate-300 text-right">
          <div className='text-black '>{location.place}</div>
        </li>
      ))}
    </ul>
  );
};

export default WordVariants;
