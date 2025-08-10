import React from 'react';
import NavBar from '../../Components/Header/NavBar';
import Footer from '../../Components/Footer/Footer';
import Banner from '../../Components/Banner/Banner';
import RecentQueries from '../../Components/RecentQueries/RecentQueries';
import HowThisWorks from '../../Components/HowThisWorks/HowThisWorks';
import Impact from '../../Components/Impact/Impact';
import Extra from '../../Components/sectionExtra/Extra';
import FeaturedEthicalBrands from '../../Components/FeaturedEthicalBrand/FeaturedEthicalBrand';

const Root = () => {
    
    return (
        <div>
            <NavBar></NavBar>
            <Banner></Banner>
            <RecentQueries></RecentQueries>
            <HowThisWorks></HowThisWorks>
            <FeaturedEthicalBrands></FeaturedEthicalBrands>
            <Impact></Impact>
            <Extra></Extra>
            <Footer></Footer>
        </div>
    );
};

export default Root;