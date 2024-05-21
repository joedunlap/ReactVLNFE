import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './components/navbar';
const App: React.FC = () => {
  return (
    <Router>
      <Navbar />
     
    </Router>
  );
};

export default App;