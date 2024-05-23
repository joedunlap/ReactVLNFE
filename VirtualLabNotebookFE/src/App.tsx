import "./App.css"
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/navbar';
import ProjectPage from './pages/projectpage';
import ProjectDetail from './components/projectdetail';



function App() {
  return (
    <Router>
      <Navbar />
      <div className="container mt-5">
        <Routes>
          <Route path="/projects" element={<ProjectPage />} />
          <Route path="/projects/:id" element={<ProjectDetail />} />
          <Route path="/projects"
        </Routes>
      </div>
    </Router>
  );
};

export default App;