import { useEffect, useState, useRef } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { CategoriesServices } from "../services/CategoriesServices";
import leftarrow from '../assets/left-arrow.svg';
import playIcon from '../assets/play-icon.svg';
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { getColor } from "../redux/themeSlice";
import { SlugService } from "../services/SlugService";

interface PageTitle {
    id: number;
    category: string;
    page: number;
    word: string;
    variant: string;
    cohort: string;
    gender: string;
    location: string;
    location_code: string;
    uid: string;
    audio: string;
}
const colors: string[] = [
    'magenta', '#ffdd62', '#e11325', '#71cdf1', '#f08757', '#f08757', 'blue', 'purple', 'pink', 'brown'
];

const textColors: string[] = [
    'normal', '#8d8070', '#ffffff', '#ffffff', '#ffffff', '#ffffff', '#ffffff', '#ffffff', '#ffffff', '#ffffff'
]

const SlugCategoryList: React.FC = () => {
    const { slug } = useParams<{ slug: string }>();
    const [error, setError] = useState<string | null>(null);

    const dispatch = useDispatch<any>();
    const data = useSelector((state: any) => state.theme);
    const [pageTitleData, setPageTitleData] = useState<PageTitle[]>([]);
    const [audioName, setAudioName] = useState<string | null>(null);
    const [audio, setAudio] = useState<HTMLAudioElement | null>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [progress, setProgress] = useState(0);
    const [currentAudioId, setCurrentAudioId] = useState<number | null>(null);
    const audioRef = useRef<HTMLAudioElement | null>(null);
    const navigate = useNavigate();
    const [pagenumber, setPagenumber] = useState(0);
    const [color, setColor] = useState('#ffdd62');
    const [textColor, setTextColor] = useState('#8d8070');

    const [maincategory, setMaincategory] = useState('');
    const [subcategory, setSubcategory] = useState('');

    useEffect(() => {
        dispatch(getColor());
        SlugService.getSlug(`${slug}`).then(data => {
            setPagenumber(Number(data?.Pagenumber))
            setSubcategory(data?.Subcategory)
            setMaincategory(data?.Maincategory)
            CategoriesServices.getPageTitle(data?.Pagenumber)
                .then((res) => {
                    setPageTitleData(res.data);

                    if (Number(data.Pagenumber) <= 142) {
                        setColor(colors[1]);
                        setTextColor(textColors[1]);
                    }
                    else if (Number(data.Pagenumber) <= 250) {
                        setColor(colors[2]);
                        setTextColor(textColors[2]);

                    }
                    else if (Number(data.Pagenumber) <= 334) {
                        setColor(colors[3]);
                        setTextColor(textColors[3]);

                    }
                    else if (Number(data.Pagenumber) <= 358) {
                        setColor(colors[4]);
                        setTextColor(textColors[4]);

                    }
                })
                .catch(() => alert("Error fetching"));
        })
    }, [slug]);

    const fetchAudio = async (audioName: string) => {
        if (audioName) {
            if (isPlaying) return;
            setProgress(0);
            try {
                setIsPlaying(true);
                var ap = new Audio('');
                setAudio(ap);
                ap.src = `https://audio.dialektatlas.ch/file/${audioName}.flac`
                ap.addEventListener('loadeddata', () => {
                    ap.play();
                });
                ap.addEventListener('timeupdate', () => {
                    setProgress((ap.currentTime / ap.duration) * 100);
                });
                ap.addEventListener('ended', () => {
                    setIsPlaying(false);
                    setProgress(0);
                    setCurrentAudioId(null);
                });
                ap.addEventListener('error', () => {
                    setIsPlaying(false);
                    setError('Failed to load audio');
                });
                ap.load()
                setError('');
            } catch (error) {
                console.error('Error playing audio:', error);
                setError(error?.message)
            }
        }
    };
    // console.log(audioName)

    // useEffect(() => {
    //     const fetchAudio = async () => {
    //         if (audioName) {
    //             try {
    //                 const response = await axios.get(`http://176.10.111.19:8001/api/v1/audios/${audioName}`, {
    //                     responseType: 'blob'
    //                 });
    //                 const audioUrl = URL.createObjectURL(response.data);
    //                 const newAudio = new Audio(audioUrl);
    //                 setAudio(newAudio);
    //                 audioRef.current = newAudio;

    //                 newAudio.addEventListener('timeupdate', () => {
    //                     setProgress((newAudio.currentTime / newAudio.duration) * 100);
    //                 });

    //                 newAudio.addEventListener('ended', () => {
    //                     // setIsPlaying(false);
    //                     setProgress(0);
    //                     setCurrentAudioId(null);
    //                 });

    //                 newAudio.play();
    //                 setError('');
    //                 // setIsPlaying(true);
    //             } catch (error) {
    //                 console.error('Error playing audio:', error);
    //                 setError(error?.message)
    //             }
    //         }
    //     };

    //     fetchAudio();
    // }, [audioName]);

    // const togglePlayPause = () => {
    //     if (audio) {
    //         if (isPlaying) {
    //             audio.pause();
    //         } else {
    //             audio.play();
    //         }
    //         setIsPlaying(!isPlaying);
    //     }
    // };

    const handleProgressChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (audio) {
            const newTime = (audio.duration / 100) * Number(event.target.value);
            audio.currentTime = newTime;
            setProgress(Number(event.target.value));
        }
    };
    return (
        <div>
            <div
                style={{ backgroundColor: color, color: textColor }}
                className={`inline-flex justify-between items-center w-full px-4 py-4 bg-[${color}]  text-lg font-bold text-gray-700 focus:outline-none`}>
                <img className="h-6 w-6 text-gray-700 cursor-pointer" src={leftarrow} alt="Left Arrow" onClick={() => navigate(`/${maincategory}`)} />
                <div className="flex-grow text-center text-xl">
                    {pageTitleData[0]?.word}
                </div>
            </div>

            {pageTitleData[0]?.variant == null && <div className="text-red-500 text-xl font-bold text-center h-full py-20">
                <div >Page Data not found </div>
                <button onClick={() => navigate("/")}>Home</button>
            </div>}

            {pageTitleData?.map((pageTitle, index) => (
                <div className="flex flex-col items-center justify-between py-4 px-3 m-2 border-b-2 shadow-sm text-gray-700" key={index} >
                    <div className="flex items-center justify-between w-full">
                        <div>
                            <span className="font-bold text-xl">{pageTitle?.variant}</span>
                            <p className="text-sm text-gray-600">{pageTitle?.location} | {pageTitle?.cohort}</p>
                        </div>
                        <img className="h-10 w-10 text-gray-700 cursor-pointer" src={playIcon} alt="Play Button" onClick={(e) => {
                            e.stopPropagation();
                            setCurrentAudioId(pageTitle.ID);
                            setAudioName(pageTitle.audio.slice(0, -4));
                            fetchAudio(pageTitle.audio.slice(0, -4))
                            // Update the URL without reloading the page
                            // window.history.pushState({}, '', `/page/${pagenumber}/${pageTitle.audio}`);
                        }} />

                    </div>
                    {currentAudioId === pageTitle.ID && (
                        <div className="w-full mt-2">
                            {/* <button onClick={togglePlayPause}>{isPlaying ? 'Pause' : 'Play'}</button> */}
                            <div className="text-red-400">
                                {error && "Audio Missing"}
                            </div>
                            <input
                                type="range"
                                value={progress}
                                onChange={handleProgressChange}
                                max="100"
                                className="progress-bar"
                                style={{ '--progress': `${progress}%` } as React.CSSProperties}
                            />
                        </div>
                    )}
                </div>
            ))}

            <div className="text-gray-500">
                <div className="flex justify-between items-center">
                    <button onClick={() => navigate(`/${subcategory}/${parseInt(pagenumber) - 2}`)} className="cursor-pointer">
                        Vorherige Seite
                    </button>
                    <div>
                        {pagenumber}
                    </div>
                    <button onClick={() => navigate(`/${subcategory}/${parseInt(pagenumber) + 2}`)} className="cursor-pointer">
                        Nächste Seite
                    </button>
                </div>

            </div>
            <audio id="audio"></audio>
        </div>
    );
};

export default SlugCategoryList;
