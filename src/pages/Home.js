import React from 'react';
import Jumbotron from '../components/cards/Jumbotron';
import NewArrivals from '../components/home/NewArrivals';
import BestSellers from '../components/home/BestSellers';
import CategoryList from '../components/category/CategoryList';
import SubList from '../components/sub/SubList';
import Cover from '../images/cover.jpg';

const Home = () => {


  const onChange = (a, b, c) => {
    console.log(a, b, c);
  };

  const contentStyle = {
    height: '300px',
    color: '#fff',
    lineHeight: '300px',
    textAlign: 'center',
    background: 'black',
  };


  return (


    <>


      {/* <div className="jumbotron text-danger h1 font-weight-bold text-center">
        <Jumbotron text={["ברוכים הבאים"]} />
      </div> */}

      <div className="container">
        <img className="text-center" src={Cover} />
      </div>




      <h4 className='text-center p-3 mt-5 mb-5 display-4 jumbotron'>מוצרים חדשים</h4>
      <NewArrivals />

      <h4 className='text-center p-3 mt-5 mb-5 display-4 jumbotron'>הנמכרים ביותר</h4>
      <BestSellers />

      <h4 className='text-center p-3 mt-5 mb-5 display-4 jumbotron'>קטגוריות</h4>
      <CategoryList />

      <h4 className='text-center p-3 mt-5 mb-5 display-4 jumbotron'>קטגוריות משנה</h4>
      <SubList />

      <br />
      <br />

    </>
  );
};



export default Home;
