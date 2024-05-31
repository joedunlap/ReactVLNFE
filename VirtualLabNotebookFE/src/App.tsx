import "./App.css"
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/navbar';
import ProjectPage from './pages/projectpage';
import ProjectDetail from './components/projectdetail';
import CreateProject from "./components/newprojectform";
import Home from "./pages/home";
import CreateSample from "./components/createsampleform";
import UpdateProject from "./components/updateproject";



function App() {
  return (
    <Router>
      <Navbar />
      <div className="container mt-5">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/projects" element={<ProjectPage />} />
          <Route path="/projects/:id" element={<ProjectDetail />} />
          <Route path="/projects/new" element={<CreateProject />} />
          <Route path="/projects/:id/create-sample" element={<CreateSample />} />
          <Route path="/projects/:id/update-sample" element={<UpdateProject />} />

        </Routes>
      </div>
    </Router>
  );
};

export default App;