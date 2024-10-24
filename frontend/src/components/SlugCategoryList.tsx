import { useEffect, useState, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { CategoriesServices } from "../services/CategoriesServices";
import leftarrow from '../assets/left-arrow.svg';
import { useDispatch, useSelector } from "react-redux";
import { getColor, setCategory } from "../redux/themeSlice";
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
    'magenta', '#ffdd62', '#e11325', '#71cdf1', '#f08757', '#0a998a', '#0a998a', 'blue', 'purple', 'pink', 'brown'
];

const textColors: string[] = [
    'normal', '#8d8070', '#ffffff', '#ffffff', '#ffffff', '#ffffff', '#ffffff', '#ffffff', '#ffffff', '#ffffff', '#ffffff'
]

const SlugCategoryList: React.FC = () => {
    const { slug } = useParams<{ slug: string }>();
    const [error, setError] = useState<string | null>(null);

    const dispatch = useDispatch<any>();
    const data = useSelector((state: any) => state.theme);
    const [pageTitleData, setPageTitleData] = useState<PageTitle[]>([]);
    const [audioName, setAudioName] = useState<string | null>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [progress, setProgress] = useState(0);
    const [currentAudioId, setCurrentAudioId] = useState<number | null>(null);
    const audioRef = useRef<HTMLAudioElement | null>(null);
    const navigate = useNavigate();
    const [pagenumber, setPagenumber] = useState(0);
    const [color, setColor] = useState('#ffdd62');
    const [textColor, setTextColor] = useState('#8d8070');
    const [audio, setAudio] = useState<HTMLAudioElement>(new Audio(''));

    const [maincategory, setMaincategory] = useState('');
    const [subcategory, setSubcategory] = useState('');

    useEffect(() => {
        var ap = audio;
        function loadeddata() {
            ap.play();
        }
        function timeupdate() {
            if (ap.duration)
                setProgress((ap.currentTime / ap.duration) * 100);
        }
        function ended() {
            setIsPlaying(false);
            setProgress(0);
            setCurrentAudioId(null);
        }
        function error() {
            setIsPlaying(false);
            setProgress(0);
            setError('Failed to load audio');
        }
        ap.addEventListener('loadeddata', loadeddata);
        ap.addEventListener('timeupdate', timeupdate);
        ap.addEventListener('ended', ended);
        ap.addEventListener('error', error);
        return () => {
            ap.removeEventListener('loadeddata', loadeddata);
            ap.removeEventListener('timeupdate', timeupdate);
            ap.removeEventListener('ended', ended);
            ap.removeEventListener('error', error);
        }
    }, [])

    useEffect(() => {
        dispatch(getColor());
        if (slug?.split('_') == undefined || slug?.split('_')?.length < 2) return;
        SlugService.getSlug(`${slug}`).then(data => {
            setPagenumber(Number(data?.Pagenumber))
            setSubcategory(data?.Subcategory)
            setMaincategory(data?.Maincategory)
            dispatch(setCategory(data?.Maincategory))
            CategoriesServices.getPageTitle(data?.Pagenumber)
                .then((res) => {
                    setPageTitleData(res.data.filter(item=>item.word == slug?.split('_')[1]))

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
                    else {
                        setColor(colors[5]);
                        setTextColor(textColors[5]);
                    }
                })
                .catch(() => alert("Error fetching"));
        })
    }, [slug]);

    const fetchAudio = async (audioName_: string) => {
        if (audioName_) {
            var ap = audio;
            if (ap.currentTime != 0 && ap.currentTime < ap.duration && !ap.paused) {
                ap.pause();
                setIsPlaying(false);
                return
            }
            if (ap.currentTime != 0 && ap.currentTime < ap.duration && ap.paused && audioName_ == audioName) {
                ap.play();
                setIsPlaying(true);
                return
            }
            setProgress(0);
            try {
                setIsPlaying(true);
                ap.src = `https://audio.dialektatlas.ch/file/${audioName_}.flac`
                ap.load()
                setError('');
            } catch (error) {
                console.error('Error playing audio:', error);
                setError(error?.message)
            }
        }
    };

    const handleProgressChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (audio) {
            const newTime = (audio.duration / 100) * Number(event.target.value);
            audio.currentTime = newTime;
            setProgress(Number(event.target.value));
        }
    };
    return (
        <div>
            <div className="relative text-center ">
                <div className="fixed top-0 w-full lg:w-[768px] md:w-[768px] z-30">

                    <div
                        style={{ backgroundColor: data?.color }}
                        className={`inline-flex justify-between items-center w-full px-4 py-4 bg-[${data?.color}]  text-lg font-bold text-gray-700 focus:outline-none`}>
                        <img className="h-6 w-6 text-gray-700 cursor-pointer" src={leftarrow} alt="Left Arrow" onClick={() => {
                            navigate(`/${subcategory}/${pagenumber}`);
                        }} />
                        <div className="flex-grow text-center text-xl">
                            {pageTitleData[0]?.word}
                        </div>
                    </div>
                </div>
            </div>
            <div className="pt-16">

                {pageTitleData[0]?.variant == null && <div className="text-red-500 text-xl font-bold text-center h-full py-20">
                    <div >Page Data not found </div>
                    <button onClick={() => navigate("/")}>Home</button>
                </div>}

                {pageTitleData?.map((pageTitle, index) => (
                    <div className="flex flex-col items-center justify-between py-4 px-3 m-2 border-b-2 shadow-sm text-gray-700" key={index} >
                        <div className="flex items-center justify-between w-full" onClick={(e) => {
                            e.stopPropagation();
                            setCurrentAudioId(pageTitle.ID);
                            setAudioName(pageTitle.audio);
                            fetchAudio(pageTitle.audio)
                            // Update the URL without reloading the page
                            // window.history.pushState({}, '', `/page/${pagenumber}/${pageTitle.audio}`);
                        }}>
                            <div>
                                <span className="font-bold text-xl">{pageTitle?.variant}</span>
                                <p className="text-sm text-gray-600">{pageTitle?.location} | {pageTitle?.cohort}</p>
                            </div>
                            <button className="whitespace-nowrap text-sm font-medium ring-offset-background  transition-colors focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 text-primary-foreground px-4 py-2 w-12 h-12 rounded-full bg-[#777] hover:bg-[#eeeeee] focus:ring-2 focus:ring-offset-2 focus:ring-gray-100 flex items-center justify-center "
                                aria-label={isPlaying ? 'Pause' : 'Play'}>
                                {isPlaying && currentAudioId == pageTitle.ID ? (
                                    <img src="/icons/pause.png" alt="pause" />
                                ) : (
                                    <img src="/icons/play.png" alt="play" />

                                )}
                            </button>

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
                        <button onClick={() => {
                            CategoriesServices.getNextPage(subcategory, parseInt(pagenumber) - 2, -1).then((data) => {
                                console.log(data)
                                if (!data) {
                                    return;
                                }
                                navigate(`/${subcategory}/${parseInt(data.page)}`)
                            })
                        }

                        } className="cursor-pointer">
                            &laquo;
                        </button>
                        <div>
                            {pagenumber}
                        </div>
                        <button onClick={() => {
                            CategoriesServices.getNextPage(subcategory, parseInt(pagenumber) + 2, 1).then((data) => {
                                console.log(data)
                                if (!data) {
                                    return;
                                }
                                navigate(`/${subcategory}/${parseInt(data.page)}`)
                            })
                        }} className="cursor-pointer text-[16px]">
                            &raquo;
                        </button>
                    </div>

                </div>
                <audio id="audio"></audio>
            </div>
        </div>
    );
};

export default SlugCategoryList;
