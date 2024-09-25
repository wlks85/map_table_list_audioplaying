import { useEffect, useState, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { CategoriesServices } from "../services/CategoriesServices";
import leftarrow from '../assets/left-arrow.svg';
import axios from "axios";

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

const PageTitle: React.FC = () => {
    const { pagenumber } = useParams<{ pagenumber: string }>();
    const [pageTitleData, setPageTitleData] = useState<PageTitle[]>([]);
    const [audioName, setAudioName] = useState<string | null>(null);
    const [audio, setAudio] = useState<HTMLAudioElement | null>(null);
    // const [isPlaying, setIsPlaying] = useState(false);
    const [progress, setProgress] = useState(0);
    const [currentAudioId, setCurrentAudioId] = useState<number | null>(null);
    const audioRef = useRef<HTMLAudioElement | null>(null);

    const navigate = useNavigate();

    useEffect(() => {
        CategoriesServices.getPageTitle(pagenumber)
            .then((data) => {
                setPageTitleData(data);
            })
            .catch(() => alert("Error fetching"));
    }, []);

    useEffect(() => {
        const fetchAudio = async () => {
            if (audioName) {
                try {
                    const response = await axios.get(`http://176.10.111.19:8001/api/v1/audios/${audioName}`, {
                        responseType: 'blob'
                    });
                    const audioUrl = URL.createObjectURL(response.data);
                    const newAudio = new Audio(audioUrl);
                    setAudio(newAudio);
                    audioRef.current = newAudio;

                    newAudio.addEventListener('timeupdate', () => {
                        setProgress((newAudio.currentTime / newAudio.duration) * 100);
                    });

                    newAudio.addEventListener('ended', () => {
                        // setIsPlaying(false);
                        setProgress(0);
                        setCurrentAudioId(null);
                    });

                    newAudio.play();
                    // setIsPlaying(true);
                } catch (error) {
                    console.error('Error playing audio:', error);
                }
            }
        };

        fetchAudio();
    }, [audioName]);

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
            <div className="inline-flex justify-between items-center w-full px-4 py-2 bg-yellow-400 text-lg font-bold text-gray-700 hover:bg-yellow-500 focus:outline-none">
                <img className="h-6 w-6 text-gray-700" src={leftarrow} alt="Left Arrow" onClick={() => navigate(-1)} />
                <div className="flex-grow text-center">
                    {pageTitleData[0]?.word}
                </div>
            </div>

            {pageTitleData?.map((pageTitle, index) => (
                <div className="flex flex-col items-center justify-between py-4 px-3 m-2 border-b-2 shadow-sm text-gray-700" key={index} >
                    <div className="flex items-center justify-between w-full">
                        <div>
                            <span className="font-bold text-xl">{pageTitle?.variant}</span>
                            <p className="text-sm">{pageTitle?.location} | {pageTitle?.cohort}</p>
                        </div>
                        <svg
                            width="64"
                            height="64"
                            viewBox="0 0 64 64"
                            xmlns="http://www.w3.org/2000/svg"
                            onClick={(e) => {
                                e.stopPropagation();
                                setAudioName(pageTitle.audio.slice(0, -4));
                                setCurrentAudioId(pageTitle.id);
                            }}
                        >
                            <circle cx="32" cy="32" r="32" fill="#4CAF50" />
                            <polygon points="26,18 26,46 46,32" fill="#FFFFFF" />
                        </svg>
                    </div>
                    {currentAudioId === pageTitle.id && (
                        <div className="w-full mt-2">
                            {/* <button onClick={togglePlayPause}>{isPlaying ? 'Pause' : 'Play'}</button> */}
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
        </div>
    );
};

export default PageTitle;
