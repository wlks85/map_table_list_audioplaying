// import React, { useEffect, useState } from 'react';
// // import { ReactSVG } from 'react-svg';
// import { FaChevronDown, FaChevronUp } from 'react-icons/fa';
// import { useNavigate, useParams } from 'react-router-dom';
// import { WordService } from '../services/WordService';
// import { FaChevronLeft } from 'react-icons/fa6';
// import WordAvatar from './variants/WordAvatar';

// const StickyNavbar: React.FC<{ word: Word; }> = ({ word }) => {
//   const [isVisible, setIsVisible] = useState(false);
//   const navigate = useNavigate();

//   const handleScroll = () => {
//     const offset = window.scrollY;
//     if (offset > 50) { // Adjust the value based on when you want the navbar to appear
//       setIsVisible(true);
//     } else {
//       setIsVisible(false);
//     }
//   };

//   useEffect(() => {
//     window.addEventListener('scroll', handleScroll);
//     return () => window.removeEventListener('scroll', handleScroll);
//   }, []);

//   const goBack = ()=> {
//     navigate("/");
//   }

//   return (
//     <>
//     <div className={`fixed flex items-center gap-4 top-0 left-0 right-0 bg-primary rounded-b-md text-white transition-transform duration-300 ${isVisible ? 'translate-y-0' : '-translate-y-full'}`}>
//       <div className=""><FaChevronLeft size={23} onClick={goBack} /></div>
//       <div><h1 className="text-xl">{word.title}</h1></div>
//     </div>
//     <header className="pt-8 pb-8 pl-4 flex items-center gap-4 bg-primary text-white border-b top-0 left-0 right-0 h-24 rounded-b-md">
//       <div className=""><FaChevronLeft size={23} onClick={goBack}/></div>
//       <div className='flex flex-col'>
//         <h1 className="text-2xl">{word?.title}</h1>
//         <h2 className="text-sm">{word?.sub_title}</h2>
//       </div>
//     </header>
//     </>
    
//   );
// };

// interface Variant {
//   _id: string;
//   title: string;
//   locations?: ILocation[],
//   pronounciation?: string;
// }

// interface Word {
//   _id: string,
//   title: string;
//   variants: Variant[];
//   sub_title?: string;
// }


// const WordVariants: React.FC = () => {
//   const { wordId } = useParams<{ wordId: string }>();
//   const [variants, setVariants] = useState<Variant[]>([]);
//   const [word, setWord] = useState<Word | null>(null);
//   const [expandedVariant, setExpandedVariant] = useState<string | null>(null);
//   const toggleAccordion = (variantId: string) => {
//     console.log("id", variantId)
//     setExpandedVariant(expandedVariant === variantId ? null : variantId);
//   };

//   useEffect(() => {
//     if(wordId) {
//       WordService.getWord(wordId)
//       .then((wordResponse) => {
//         setWord(wordResponse);
//         setVariants(wordResponse?.variants); 
//     })
//     }
//   }, [wordId]);

//   // eslint-disable-next-line @typescript-eslint/no-unused-vars
//   const playAudio = (variant: Variant | ILocation)=> {
//     const audio = new Audio(variant?.pronounciation || `${window.location.origin}/ukholdu027.mp3`);
//     audio.play();
//   }
// console.log(word)
//   return word && (
//     <div className="flex flex-col h-screen mb-32">
//       {word && <StickyNavbar word={word} />}
//       <div className="flex-grow overflow-auto">
//         <div className="bg-white text-black  flex gap-1 flex-col">
//           {variants.map(variant => (
//             <div key={variant._id} className="pt-4 items-center border-b rounded">
//               <div className={`flex justify-between p-4 ${expandedVariant == variant._id ? 'border-b shadow-md': ''}`}>
//                 <div className="flex gap-4 items-center">
//                   <div><WordAvatar 
//                     width={50} 
//                     height={50}
//                     onClick={()=> playAudio(variant)}
//                      />
//                     </div>
//                   <span className='text-2xl capitalize cursor-pointer'>{variant.title}</span> 
//                   {/* <FaVolumeHigh onClick={()=> playAudio(variant)} />  */}
//                   </div>
//                 {expandedVariant !== variant._id ? (<FaChevronDown className='text-primary' size={23} onClick={() => toggleAccordion(variant._id)} />): (<FaChevronUp className='text-primary' size={23} onClick={() => toggleAccordion(variant._id)} />)}
//               </div>
//               {expandedVariant === variant._id && (
//                 <LocationsList variant={variant} title={word?.title} />
//               )}
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// interface ILocation {
//   _id: string,
//   place: string;
//   pronounciation?: string;
// }

// const LocationsList: React.FC<{ variant: Variant, title: string }> = ({ variant,title }) => {
//   const [locations, setLocations] = useState<ILocation[]>([]);

//   useEffect(() => {
//     WordService.getWord(title, [variant.title])
//     .then(({variants})=> {
//       setLocations(variants[0].locations)
//     });
//   }, [variant.title]);

//   return (
//     <ul className="h-80 overflow-auto mt-2">
//       {locations.map(location => (
//         <li key={location._id} className="border-b bg-location text-right">
//           <div className="flex gap-5 p-4">
//             <WordAvatar height={80} width={80} hasAction={false} />
//             <div>
//               <div className='text-black text-2xl'>{location.place}</div>
//             </div>
//           </div>
//         </li>
//       ))}
//     </ul>
//   );
// };

// export default WordVariants;
