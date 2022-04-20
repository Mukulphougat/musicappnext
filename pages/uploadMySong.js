import styles from "../styles/uploadMySongStyle.module.css"
import axios from "axios";
import {useState} from "react";
import {useRouter} from "next/router";

const UploadMySong = () => {
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


        const response = await axios.post("https://musicappmukul.herokuapp.com/songs/uploadMySong/", formData)
            .then(res => {
                console.log(res)
                router.push("/");
            })
            .catch(err => console.log(err));

    };

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