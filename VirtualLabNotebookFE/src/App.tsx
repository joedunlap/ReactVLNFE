import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/navbar';
import ProjectPage from './pages/projectpage';
import ProjectDetail from './components/projectdetail';



const App: React.FC = () => {
  return (
    <Router>
      <Navbar />
      <div className="container mt-5">
        <Routes>
          <Route path="/projects" Component={ProjectPage} />
          <Route path="/projects/:id" Component={ProjectDetail} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;