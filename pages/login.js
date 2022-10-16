import {useSession, signIn, signOut} from "next-auth/react";
const login = () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const {data: session, status} = useSession()
    const showStatus=() => console.log(session)
    if (session) {
        return (
            <>
                Signed in as {session.user.email} <br />
                <button onClick={()=>showStatus()} className={"text-blue-500"}>Show</button>
                {/*<button onClick={() => signOut()}>Sign out</button>*/}
                <div className={"mx-auto my-20 w-1/4 h-24 rounded-xl grid place-items-center border border-2 border-green-500"}>
                    <button className={"w-48 hover:text-blue-200 border border-2 border-green-500 text-blue-500 font-mono rounded-xl h-12"} onClick={() => signOut()}>Sign out</button>
                </div>
            </>
        )
    }
    return (
        <>
            Not signed in <br />
            <button onClick={()=>showStatus()} className={"text-blue-500"}>Show</button>
            {/*<button className={"my-20 mx-20 text-green-500"} onClick={() => signIn()}>Sign in</button>*/}
            <div className={"mx-auto my-20 grid place-items-center rounded-xl w-1/4 h-24 border border-2 border-green-500"}>
                <button className={"w-48 border hover:text-blue-200 border-2 border-green-500 text-blue-500 font-mono rounded-xl h-12"} onClick={() => signIn()}>Sign In</button>
            </div>
        </>
    )
}
export default login;