import React from 'react';
import { Outlet } from 'react-router';
import NavBar from '../../Components/Header/NavBar';
import Footer from '../../Components/Footer/Footer';

const Root = () => {
    
    return (
        <div>
            <NavBar></NavBar>
            <Outlet></Outlet>
            <Footer></Footer>
        </div>
    );
};

export default Root;