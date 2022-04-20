import {useState} from "react";

const index = 0;
export const getStaticProps = async () => {
    const res = await fetch('https://musicappmukul.herokuapp.com/songs/');
    const data = await res.json();
    return {
        props: { songs: data }
    }
}

// // eslint-disable-next-line react-hooks/rules-of-hooks
// const [song, setSong] = useState({
//     audio: new Audio(null),
//     isPlaying: false
// });

const mySongsComp = ({songs}) => {
    return (
        <div>
            <h1>All Songs</h1>
            {
                songs.map(({id, fileName, title}) => (
                    <div key={id}>
                        <h3>{title}</h3>
                        <audio controls>
                            <source src={`https://musicarchivemukul.s3.amazonaws.com/${fileName}`}/>
                        </audio>
                    </div>
                ))
            }
        </div>
    )
}
export default mySongsComp
