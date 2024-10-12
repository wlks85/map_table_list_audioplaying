
import { useState, useRef, useEffect } from 'react'

export default function AudioPlayer({ src = '', onTimeUpdate, OnLoadedData, OnEnded, OnError }) {
    const [isPlaying, setIsPlaying] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const audioRef = useRef<HTMLAudioElement | null>(null)

    useEffect(() => {
        console.log(";)")
        setIsLoading(true);
        audioRef.current?.pause()
        audioRef.current = new Audio(src)

        function loadeddata() {
            setIsLoading(false);
            // audioRef.current?.play();
            if (OnLoadedData)
                OnLoadedData();
        }
        function timeupdate() {
            if (audioRef.current?.duration && onTimeUpdate)
                onTimeUpdate((audioRef.current.currentTime / audioRef.current.duration) * 100);
        }
        function ended() {
            setIsPlaying(false);
            if (OnEnded)
                OnEnded();
        }
        function error() {
            setIsPlaying(false);
            if (OnError)
                OnError();
        }

        audioRef.current.addEventListener('loadeddata', loadeddata);
        audioRef.current.addEventListener('timeupdate', timeupdate);
        audioRef.current.addEventListener('ended', ended);
        audioRef.current.addEventListener('error', error);

        return () => {
            audioRef.current?.removeEventListener('loadeddata', loadeddata);
            audioRef.current?.removeEventListener('timeupdate', timeupdate);
            audioRef.current?.removeEventListener('ended', ended);
            audioRef.current?.removeEventListener('error', error);
        }

    }, [src])

    const togglePlay = (e) => {
        if (isPlaying) {
            audioRef.current?.pause()
        } else if (!isLoading) {
            audioRef.current?.play()
        }
        setIsPlaying(!isPlaying)
    }

    return (
        <button className="whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 text-primary-foreground px-4 py-2 w-12 h-12 rounded-full bg-[#777] hover:bg-[#eeeeee] focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 flex items-center justify-center "
            onClick={togglePlay}
            aria-label={isPlaying ? 'Pause' : 'Play'}>
            {isPlaying ? (
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect x="6" y="4" width="4" height="16" fill="white" />
                    <rect x="14" y="4" width="4" height="16" fill="white" />
                </svg>
            ) : (
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M8 5V19L19 12L8 5Z" fill="white" />
                </svg>
            )}
        </button>
    )
}