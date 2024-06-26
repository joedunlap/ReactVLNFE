import "./App.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/navbar';
import ProjectPage from './pages/projectpage';
import ProjectDetail from './components/projectComponents/projectdetail';
import CreateProject from "./components/projectComponents/newprojectform";
import Home from "./pages/home";
import CreateSample from "./components/sampleComponents/createsampleform";
import { ThemeProvider } from "@emotion/react";
import theme from "./components/themes";
import SampleDetail from "./components/sampleComponents/sampledetails";
import TechStack from "./pages/techstack";
import ResumeComponent from "./pages/resume";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Navbar />
        <div className="container mt-5">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/projects" element={<ProjectPage />} />
            <Route path="/projects/:id" element={<ProjectDetail />} />
            <Route path="/projects/new" element={<CreateProject />} />
            <Route path="/projects/:id/create-sample" element={<CreateSample />} />
            <Route path="/projects/:projectId/samples/:sampleId" element={<SampleDetail />} />
            <Route path="/tech-stack" element={<TechStack />} />
            <Route path="/resume" element={<ResumeComponent />} />
          </Routes>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;