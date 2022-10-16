import Image from "next/image";
import musicThumb from '../public/musics.gif';
import AudioPlayer from "./AudioPlayer";
// import styles from "../styles/musicPlayer.module.css";
import axios from "axios";
import {useState, useEffect} from "react";
import {AiFillHeart} from "react-icons/ai";
import {useRouter} from "next/router";
import {signIn, useSession} from "next-auth/react";
import styles from "../styles/uploadMySongStyle.module.css";


const MusicComponent = (props) => {
    const {status} = useSession()

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
                const res = await axios.put("https://musicbackend.azurewebsites.net/songs/setAsFavourite", formData).then(result => {
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
    if ( status === "unauthenticated" ) {
        return (
            <>
                {/*<button className={"my-20 mx-20 text-green-500"} onClick={() => signIn()}>Sign in</button>*/}
                <div className={styles.container}>
                    <div className={styles.loginContainer}>
                        <button className={"w-48 border hover:text-blue-200 border-2 border-zinc-50 text-blue-500 font-mono h-12"} onClick={() => signIn()}>Sign In</button>
                    </div>
                </div>
            </>
        )
    }
    return (
        <div className={"flex flex-col align-middle justify-center w-full h-full sm:flex-row sm:justify-around"}>
            {/*<div className={"flex mx-12 sm:flex-col justify-center border border-white h-fit sm:w-1/2 shadowMy "}>*/}
            {/*    */}
            {/*</div>*/}
            <div className={"shadowMy sm:my-20 sm:h-fit sm:w-fit flex flex-col border-2 border-neutral-500 "}>
                <div className={"flex-row my-10 mx-10"}>
                    <Image className={"rounded-2xl my-10 mx-auto"} src={musicThumb} width="300px" height="200px" alt="Music"
                           placeholder="empty"/>
                    <AudioPlayer currentSongName={currentSong}/>
                </div>
            </div>
            <div className={"flex my-20 sm:my-auto flex-col my-auto align-top border-2 border-white sm:w-1/2 h-fit"}>
                <h1 className={"text-3xl font-mono font-medium text-blue-600"}>Songs List</h1>
                <div className={"flex flex-col justify-center align-middle"}>
                    {
                        songs.map((song) => (
                            <div onClick={() => changeSong(song.fileName)} className={"flex border-2 border-white flex-row w-full justify-between font-mono text-white"} key={song.id}>
                                <h3 className={"font-mono text-2xl font-light"}>{song.title + ' by ' + song.artist}</h3>
                                {
                                    !song.favourite ?
                                        <AiFillHeart height={150} className={"text-white text-4xl"}
                                                     onClick={() => changeState(song.id, song.favourite)}/> :
                                        <AiFillHeart height={150} className={"text-blue-600 text-4xl"}
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
