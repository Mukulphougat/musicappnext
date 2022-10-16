import styles from "../styles/uploadMySongStyle.module.css"
import axios from "axios";
import {useState} from "react";
import {useRouter} from "next/router";
import {getSession, signIn, useSession} from "next-auth/react";

const UploadMySong = () => {
    const {data:session, status} = useSession()
    const [file,setFile] = useState(null);
    const [artist,setArtist] = useState(null);
    const [title,setTitle] = useState(null);
    const router = useRouter();
    const handleFile = (e) => {
        let fileF = e.target.files[0];
        setFile(fileF);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData();
        // console.log(file);
        // console.log(title);
        // console.log(artist);
        if ( file != null && artist != null && title != null ) {
            formData.append('file',file);
            formData.append('Artist',artist);
            formData.append('Title',title);
        } else {
            console.log('Enter Some Data');
            return;
        }

        // https://musicappmukul.herokuapp.com/
        const response = await axios.post("https://musicbackend.azurewebsites.net/songs/uploadMySong/", formData)
            .then(res => {
                console.log(res)
                router.push("/");
            })
            .catch(err => console.log(err));

    };

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
    else if ( status === "authenticated" && session.user === process.env.ADMIN ) {
        return (
            <>
                {/*<button className={"my-20 mx-20 text-green-500"} onClick={() => signIn()}>Sign in</button>*/}
                <div className={styles.container}>
                    <h1 className={"w-48 border text-blue-500 font-mono rounded-xl h-12"}>Only Admin Can Upload</h1>
                </div>
            </>
        )
    }
    return (
        <div className={styles.container}>
            <form className={styles.formContainer} onSubmit={handleSubmit}>
                <div className={styles.file}>
                    <label className={styles.labels}>File</label>
                    <input name="songFile" className={styles.inputs0} onChange={(e) => handleFile(e)} type="file"/>
                </div>
                <div className={styles.title}>
                    <label className={styles.labels}>Title</label>
                    <input name="songTitle" onChange={(e) => setTitle(e.target.value)} type="text"/>
                </div>
                <div className={styles.artist}>
                    <label className={styles.labels}>Artist</label>
                    <input name="artist"  onChange={(e) => setArtist(e.target.value)} type="text"/>
                </div>
                <button type="submit" className={styles.button}>Upload</button>
            </form>
        </div>
    )
}

export default UploadMySong
