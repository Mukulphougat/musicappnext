import styles from "../styles/AudioPlayer.module.css"
import {BsArrowLeftShort, BsArrowRightShort, BsArrowRepeat} from "react-icons/bs";
import {FaPause, FaPlay} from "react-icons/fa";
import {useEffect, useRef, useState} from "react";



const AudioPlayer = (props) => {
    // state
    const [isPlaying,setIsPlaying] = useState(true);
    const [currRepeat,setCurrRepeat] = useState(false);
    const [duration,setDuration] = useState(0);
    const [currentTime,setCurrentTime] = useState(0);
    const animationRef = useRef();
    //reference
    const audioPlayer = useRef();
    const progressBar = useRef();

    useEffect(() => {
        const seconds = Math.floor(audioPlayer.current.duration);
        setDuration(seconds);
        progressBar.current.max=seconds;
    },[audioPlayer?.current?.loadedMetadata, audioPlayer?.current?.readyState])

    const calculateTime = (secs) => {
        const minutes = Math.floor(secs/60);
        const returnedMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`;
        const seconds = Math.floor(secs%60);
        const returnedSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`;
        return `${minutes}:${seconds}`;
    }


    const whilePlaying = () => {
        progressBar.current.value = audioPlayer.current.currentTime;
        progressBar.current.style.setProperty('--seek-before-width',`${progressBar.current.value/duration*100}%`);
        setCurrentTime(progressBar.current.value);
        animationRef.current = requestAnimationFrame(whilePlaying)
    }

    const togglePlayPause = () => {
        const prevValue= isPlaying;
        setIsPlaying(!prevValue);
        if (prevValue) {
            audioPlayer.current.play();
            animationRef.current = requestAnimationFrame(whilePlaying)
        } else {
            audioPlayer.current.pause();
            cancelAnimationFrame(animationRef.current);
        }
    }

    const changeRange = () => {
        audioPlayer.current.currentTime = progressBar.current.value;
        progressBar.current.style.setProperty('--seek-before-width',`${progressBar.current.value/duration*100}%`);
        setCurrentTime(progressBar.current.value);
    }
    const backThirty = () => {
        progressBar.current.value = Number(progressBar.current.value-10);
        changeRange();
    }
    const forwardThirty = () => {
        let currVal = Number(progressBar.current.value);
        progressBar.current.value = currVal+10;
        changeRange();
    }
    const toggleRepeat = () => {
        setCurrRepeat(!currRepeat);
    }
    const filename = "Sift.mp3";
    // console.log(props.fileName)
    return(
        <div className={styles.audioPlayer}>
            <div className={styles.names}>{props.title}</div>
            <div className={styles.names}>{props.artist}</div>
            <audio ref={audioPlayer} src={`https://musicstoremukul.blob.core.windows.net/musiccontainer/${props.currentSongName}`} loop={currRepeat}/>
            <div className={styles.container}>
                <button onClick={backThirty} className={styles.forwardBackward}><BsArrowLeftShort />10</button>
                <button onClick={togglePlayPause} className={styles.playPause}>{ !isPlaying ? <FaPause/> : <FaPlay className={styles.play}/> }</button>
                <button onClick={forwardThirty} className={styles.forwardBackward}><BsArrowRightShort/>10</button>
            </div>
            <div className={styles.container}>
                <div className={styles.currentTime}>{calculateTime(currentTime)}</div>
                <div>
                    <input ref={progressBar} type="range" className={styles.progressBar} defaultValue={0} onChange={changeRange}/>
                </div>
                <div className={styles.duration}><span> { (duration && !isNaN(duration)) && calculateTime(duration)}</span></div>
                <button onClick={toggleRepeat} className={styles.repeatButton}><BsArrowRepeat /></button>
            </div>
        </div>
    )
}
export default AudioPlayer
