import React from 'react';
import Home from './home';
import Header from '@/components/ui/layouts/header.layout';
import Footer from '@/components/ui/layouts/footer.layout';
import HotelDetails from './hotel-details';
import { SignInPage } from '@/aouth';
import { SignUpPage } from '@/aouth';

const App = () => {
  return (
    <div>
      <Header/>
      <Home/>
      
      <Footer/>
    </div>
  );
};

export default App;
