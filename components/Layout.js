import HeaderNav from "./Header";

const Layout = ({children}) => {
    return (
        <div>
            <HeaderNav />
            {children}
        </div>
    )
}
export default Layout