import React from 'react';
import { Outlet } from 'react-router';
import NavBar from '../../Components/Header/NavBar';
import Footer from '../../Components/Footer/Footer';
import Banner from '../../Components/Banner/Banner';

const Root = () => {
    
    return (
        <div>
            <NavBar></NavBar>
            <Banner></Banner>
            <Outlet></Outlet>
            <Footer></Footer>
        </div>
    );
};

export default Root;