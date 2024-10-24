import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { CategoriesServices } from "../services/CategoriesServices";
import leftarrow from '../assets/left-arrow.svg';
import { useDispatch, useSelector } from "react-redux";
import { getCategory, getColor } from "../redux/themeSlice";

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

const customSort = (a: any, b: any) => {
    if (a.variant === b.variant) {
        if (a.cohort === 'alt') return -1;
        if (b.cohort === 'alt') return 1;
        return 0;
    }
    return a.variant.localeCompare(b.variant, 'de', { sensitivity: 'variant' });
};

const PageTitle: React.FC = () => {
    const { pagenumber, subcategory } = useParams<{ pagenumber: string }>();

    const location = useLocation();
    console.log(location);
    // get userId
    const title = location.state?.title;
    const [modalOpen, setModalOpen] = useState(false)

    const [error, setError] = useState<string | null>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const dispatch = useDispatch<any>();
    const data = useSelector((state: any) => state.theme);
    const [pageTitleData, setPageTitleData] = useState<PageTitle[]>([]);
    const [audioName, setAudioName] = useState<string | null>(null);
    const [audio, setAudio] = useState<HTMLAudioElement>(new Audio(''));
    const [progress, setProgress] = useState(0);
    const [currentAudioId, setCurrentAudioId] = useState<number | null>(null);
    const navigate = useNavigate();

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
    }, [audio])

    useEffect(() => {
        dispatch(getColor());
        dispatch(getCategory());
        CategoriesServices.getPageTitle(pagenumber)
            .then((data) => {
                setPageTitleData(data.data.filter(item => title ? item.word == title : true).sort(customSort))
                
            })
            .catch(() => console.log("Error fetching"));
    }, [pagenumber]);


    const toggleModal = () => {
        setModalOpen(!modalOpen);
    }
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

    // console.log(audioName)

    // useEffect(() => {
    //     const fetchAudio = async () => {
    //         if (audioName) {
    //             setProgress(0);
    //             try {
    //                 const response = await axios.get(`http://176.10.111.19:8001/api/v1/audios/${audioName}`, {
    //                     responseType: 'blob'
    //                 });
    //                 const audioUrl = URL.createObjectURL(response.data);
    //                 audioRef.current!.src = audioUrl
    //                 setAudio(audioRef.current);
    //                 audioRef.current!.addEventListener('timeupdate', () => {
    //                     setProgress((audioRef.current!.currentTime / audioRef.current!.duration) * 100);
    //                 });

    //                 audioRef.current!.addEventListener('ended', () => {
    //                     setProgress(0);
    //                 });

    //                 audioRef.current!.play();
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
            <div className="relative text-center ">
                <div className="fixed top-0 w-full lg:w-[768px] md:w-[768px] z-30">

                    <div
                        style={{ backgroundColor: data?.color }}
                        className={`inline-flex justify-between items-center w-full px-4 py-4 bg-[${data?.color}]  text-lg font-bold text-gray-700 focus:outline-none`}>
                        <img className="h-6 w-6 text-gray-700 cursor-pointer" src={leftarrow} alt="Left Arrow" onClick={() => {
                            navigate(`/${data.category}`)
                        }} />
                        <div className="flex-grow text-center text-xl">
                            {title?title: pageTitleData[0]?.word}
                        </div>
                        <div className="pr-2">
                            <img className="h-6 w-6 text-gray-700 cursor-pointer" src={'/icons/info-outline-svgrepo-com.png'} alt="DownArrow" onClick={toggleModal} />
                        </div>
                    </div>
                </div>
            </div>
            <div className="pt-10">

                {pageTitleData[0]?.variant || <div className="text-gray-500 text-xl font-bold text-center h-full py-20">
                    <div >Lade Daten </div>
                    <button onClick={() => navigate("/")}>Home</button>
                </div>}

                {pageTitleData?.map((pageTitle, index) => (
                    <div className="flex flex-col items-center justify-between py-4 px-3 m-2 border-b-2 shadow-sm text-gray-700" key={index} >
                        <div className="flex items-center justify-between w-full" onClick={(e) => {
                            e.stopPropagation();
                            setCurrentAudioId(pageTitle.ID);
                            setAudioName(pageTitle.audio);
                            fetchAudio(pageTitle.audio)
                        }}>
                            <div>
                                <span className="font-bold text-xl">{pageTitle?.variant}</span>
                                <p className="text-sm text-gray-600">{pageTitle?.location} | {pageTitle?.cohort}</p>
                            </div>
                            <button className="whitespace-nowrap text-sm font-medium ring-offset-background  transition-colors focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 text-primary-foreground px-4 py-2 w-12 h-12 rounded-full bg-[#777] hover:bg-[#eeeeee] focus:ring-2 focus:ring-offset-2 focus:ring-gray-100 flex items-center justify-center "
                                aria-label={isPlaying ? 'Pause' : 'Play'}>
                                {isPlaying && currentAudioId == pageTitle.ID ? (
                                    // <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    //     <rect x="6" y="4" width="4" height="16" fill="white" />
                                    //     <rect x="14" y="4" width="4" height="16" fill="white" />
                                    // </svg>
                                    <img src="/icons/pause.png" alt="pause" />
                                ) : (
                                    // <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    //     <path d="M8 5V19L19 12L8 5Z" fill="white" />
                                    // </svg>
                                    <img src="/icons/play.png" alt="play" />
                                )}
                            </button>
                            {/* <img className="h-10 w-10 text-gray-700 cursor-pointer" src={playIcon} alt="Play Button" onClick={(e) => {
                                e.stopPropagation();
                                setCurrentAudioId(pageTitle.ID);
                                setAudioName(pageTitle.audio.slice(0, -4));
                                fetchAudio(pageTitle.audio.slice(0, -4))
                                // Update the URL without reloading the page
                                // window.history.pushState({}, '', `/page/${pagenumber}/${pageTitle.audio}`);
                            }} /> */}

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

                        } className="cursor-pointer text-[16px]">
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
                {modalOpen && <>
                <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"></div>
                <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                    <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">

                        <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                            <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                                <div className="sm:flex sm:items-start">
                                    <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                                        <svg className="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true" data-slot="icon">
                                            <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z" />
                                        </svg>
                                    </div>
                                    <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                                        <h3 className="text-base font-semibold leading-6 text-gray-900" id="modal-title"> Lorem ipsum</h3>
                                        <div className="mt-2">
                                            <p className="text-sm text-gray-500"> Lorem ipsum</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                                <button onClick={toggleModal} type="button" className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto">Cancel</button>
                            </div>
                        </div>
                    </div>
                </div>
            </>}
            </div>
        </div>
    );
};

export default PageTitle;
