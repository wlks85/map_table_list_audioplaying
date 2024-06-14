class AudioPlayer {
    private __player;
    constructor() {
        this.__player = new Audio();
    }

    setSrc(src: string) {
        this.__player.src = src;
    }

    setEndListener(onDone: () => void) {
        this.__player.removeEventListener("ended", ()=> {
            onDone();
        });
        this.__player.addEventListener("ended", ()=> {
            onDone();
        });
    }
    
    play() {
        this.__player.play();
    }
}

export default new AudioPlayer();
