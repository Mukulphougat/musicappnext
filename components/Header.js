import Link from "next/link";
import {signOut, useSession} from "next-auth/react";
import Image from "next/image";
const HeaderNav = () => {
    const {data: session, status} = useSession()
    const show=()=>console.log(session)
  return(
      <div className={"flex justify-between"}>
          <Link href="/">
              <a className={"font-mono hover:text-blue-400 text-2xl mx-2 my-2 text-white"}>Home</a>
          </Link>
          <div>
              <Link href="/uploadMySong">
                  <a className={"font-mono hover:text-blue-400 text-2xl mx-2 my-2 text-white"}>Upload Song</a>
              </Link>
              {
                  status === "authenticated" ?
                      <button className={"font-mono text-2xl hover:text-blue-400 mx-2 my-2 text-white"} onClick={()=>signOut()}>Sign Out</button>
                      :
                      null
              }
          </div>
      </div>
  )
}
export default HeaderNav
