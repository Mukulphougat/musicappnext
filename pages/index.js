import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import MusicComponent from "../components/MusicComponent";
import axios from "axios";
export const getServerSideProps = async () => {
  const res = await axios.get("https://musicbackend.azurewebsites.net/songs/");
  return {
    props: {data: res.data},
  };
};
export default function Home(props) {
  return (
    <div className={styles.container}>
      <Head>
        <title>Music App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/music-icon.png" />
      </Head>

      <main className={styles.main}>
        <MusicComponent songsData={props.data} />
      </main>


    </div>
  )
}
