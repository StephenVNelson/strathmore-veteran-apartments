import React from "react";
import ApartmentList from '../apartments/ApartmentsList'
import Header from '../common/Header'


// import { Link } from "react-router-dom";

const HomePage = () => {
  return (<>
    <Header />
    {/* <Filters /> */}
    <ApartmentList />
  </>);
}

export default HomePage