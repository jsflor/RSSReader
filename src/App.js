import React from 'react';

import {StateProvider} from './context/StateContext';
import HomeController from './controller/HomeController';

const App = () => {
  return (
    <StateProvider>
      <HomeController />
    </StateProvider>
  );
};

export default App;
