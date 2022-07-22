import Image from "next/image";
import musicThumb from '../public/musics.gif';
import AudioPlayer from "./AudioPlayer";
import styles from "../styles/musicPlayer.module.css";
import axios from "axios";
import {useState, useEffect} from "react";
import {AiFillHeart} from "react-icons/ai";
import {useRouter} from "next/router";


const MusicComponent = (props) => {
    const router = useRouter();
    const songs = props.songsData;
    const [currSong, setCurrSong] = useState(false);
    const [currId, setCurrId] = useState(-1);
    // // const [isFav,changeFav] = useState(false);
    const [currentSong, changeCurrentSong] = useState(songs[0].fileName)
    const changeSong = (songName) => {
        changeCurrentSong(songName);
    };
    useEffect(() => {
            const addFav = async (currIdD, currSongD) => {
                if (currId === -1) return;
                const formData = new FormData();
                formData.append('id', currIdD)
                formData.append('favourite', currSongD);
                const res = await axios.put("http://localhost:8080/songs/setAsFavourite", formData).then(result => {
                    console.log(result);
                    router.push("/");
                }).catch(err => {
                    console.log(err);
                });
            }
            addFav(currId, currSong).then(r => {
                console.log(r);
            }).catch(e => console.log(e));

        }, [currId, currSong, router]
    );


    const changeState = (id, songFav) => {
        const isFav = songFav;
        const songId = id;
        setCurrSong(!isFav);
        setCurrId(songId);
    }
    return (
        <div className={styles.container}>
            <div className={styles.musicComponent}>
                <div className={styles.full}>
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
                                <h3 className={styles.songInfo}>{song.title + ' by ' + song.artist}</h3>
                                {
                                    !song.favourite ?
                                        <AiFillHeart height={150} className={styles.notFavourite}
                                                     onClick={() => changeState(song.id, song.favourite)}/> :
                                        <AiFillHeart height={150} className={styles.favourite}
                                                     onClick={() => changeState(song.id, song.favourite)}/>
                                }

                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    )
}

export default MusicComponent
