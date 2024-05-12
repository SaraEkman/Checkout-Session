import { Outlet } from 'react-router-dom';
// import { Navigation } from './Navigation';
// import Footer from './Footer';

export const Layout = () => {
    return (
        <>
            <header>
                {/* <Navigation /> */}
                header
            </header>
            <main>
                    <Outlet />
            </main>
            <footer>
                {/* <Footer /> */}
                footer
            </footer>
        </>
    );
};
