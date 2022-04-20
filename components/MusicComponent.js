import Image from "next/image";
import musicThumb from '../public/musics.gif';
import AudioPlayer from "./AudioPlayer";
import styles from "../styles/musicPlayer.module.css";
import axios from "axios";
import {useState} from "react";



const MusicComponent = (props) => {
    const songs = props.songsData;
    const [currentSong,changeCurrentSong] = useState(songs[0].fileName)
    const changeSong = (songName) => {
        changeCurrentSong(songName);
        // console.log(songName);
    };
    return (
        <div className={styles.container}>
            <div className={styles.musicComponent}>
                <div>
                    <Image className={styles.myThumb} src={musicThumb} width="300px" height="200px" alt="Music"
                           placeholder="empty"/>
                    <AudioPlayer currentSongName={currentSong}/>
                </div>
            </div>
            <div className={styles.songContainer}>
                <h1 className={styles.head}>Songs List</h1>
                <div className={styles.actSongContainer}>
                {
                    songs.map((song) => (
                        <div onClick={() => changeSong(song.fileName)} className={styles.mySong} key={song.id}>
                            <h3 className={styles.songInfo}>{song.title+' by '+song.artist}</h3>
                        </div>
                    ))
                }
                </div>
            </div>
        </div>
    )
}

export default MusicComponent