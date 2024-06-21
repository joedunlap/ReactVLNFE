import React from 'react';
import './resume.css';
import bookStack from '../assets/images/bookstack.png';
import Footer from '../components/footer';

const ResumeComponent: React.FC = () => {
    return (
        <><div className="resume-container">
            <header className="resume-header">
                <h1>Joseph Dunlap</h1>
                <p>479-225-6983 | <a href="mailto:joedunlap26@gmail.com">joedunlap26@gmail.com</a></p>
                <p>
                    <a href="https://github.com/joedunlap" target="_blank" rel="noopener noreferrer">GitHub</a> |
                    <a href="https://www.linkedin.com/in/joe-dunlap" target="_blank" rel="noopener noreferrer">LinkedIn</a>
                </p>
            </header>

            <div className="resume-grid">
                <section id="education">
                    <h2 className="resumeHeader">Education</h2>
                    <div className="education-item">
                        <h3>Arkansas Coding Academy</h3>
                        <p><strong>Full Stack Development, MEAN Stack - June 2024</strong></p>
                        <p>Demo Day Project: Virtual Lab Notebook</p>
                        <p>24-week program focused on technical programming skills to build full-stack web applications.</p>
                    </div>
                    <div className="education-item">
                        <h3>University of Central Arkansas</h3>
                        <p><strong>M.S., Biology - May 2022</strong></p>
                        <p>Independent Research: Effects of Fertilization and Defoliation on Carbon Remobilization in Northern Red Oak and River Birch Saplings.</p>
                    </div>
                    <div className="education-item">
                        <h3>University of Arkansas - Fort Smith</h3>
                        <p><strong>B.S., Biology - May 2018</strong></p>
                        <p>Capstone Project: Effects of Saline, Acidic, and Alkaline Conditions on Tardigrade Hypsibius dujardini.</p>
                    </div>
                </section>

                <section id="bookStack" className="image-section">
                    <img src={bookStack} alt="stack of books with beaker" className="book-stack-image" />
                </section>

                

                <section id="experience">
                    <h2 className="resumeHeader">Experience</h2>
                    <div className="experience-item">
                        <h3>Steep Hill Arkansas</h3>
                        <p>Laboratory Technician - April 2020-Present</p>
                        <ul>
                            <li>Sample prep for potency, pesticides, microbial, residual solvents, and heavy metal analysis.</li>
                            <li>Operated GC-MS, LC-MS, ICP-MS, and HPLC instruments.</li>
                            <li>Built a density calculator using HTML, CSS, and JavaScript.</li>
                        </ul>
                    </div>
                    <div className="experience-item">
                        <h3>Food Safety Net Services</h3>
                        <p>Pathology Lab Analyst - May 2018- April 2020</p>
                        <ul>
                            <li>Performed assays for Listeria, Salmonella, E. coli, Campylobacter using USDA/FDA methods.</li>
                            <li>Notified clients of positive samples and confirmed results as per guidelines.</li>
                            <li>Trained new lab techs on USDA/FDA confirmations for Salmonella.</li>
                        </ul>
                    </div>
                </section>

                <section id="skills">
                    <h2 className="resumeHeader">Skills</h2>
                    <p><strong>Programming Languages & Frameworks:</strong> JavaScript, Node.js, Express, React, Angular, HTML, CSS, Bootstrap, RESTful APIs, R</p>
                    <p><strong>Databases:</strong> MongoDB</p>
                    <p><strong>Tools & Technologies:</strong> Git, Github</p>
                    <p><strong>Currently Learning:</strong> Python</p>
                    <p><strong>Certifications:</strong> CPR and First Aid</p>
                </section>

                <section id="achievements">
                    <h2 className="resumeHeader">Achievements/Awards</h2>
                    <ul>
                        <li>Honors International Studies Program/Scholarship at UAFS</li>
                        <li>Presentations:
                            <ul>
                                <li>“Effects of Saline, Acidic, and Basic Conditions on Tardigrade Hypsibius dujardini” - UAFS Undergraduate Research Symposium, April 2018</li>
                                <li>“Exploring Effects of Fertilization and Defoliation on Carbon Storage in Northern Red Oak and River Birch Saplings” - 83rd Annual Meeting of Association of Southeastern Biologists, April 2022</li>
                                <li>Demo Day, Arkansas Coding Academy, June 2024</li>
                            </ul>
                        </li>
                        <li>Volunteer for the JBC Center of Archaeological Research/UCA Field School</li>
                    </ul>
                </section>

                <section id="projects">
                    <h2 className="resumeHeader">Projects</h2>
                    <div className="project-item">
                        <h3>Virtual Lab Notebook</h3>
                        <p>Developed a full-stack web application to emulate a physical lab notebook.</p>
                        <p>Utilized MongoDB, React, Express, Bootstrap, and Node.js for CRUD functionality and user authentication.</p>
                    </div>
                </section>
            </div>
        </div><Footer /></>
    );
};

export default ResumeComponent;

/* TODO: might make a resume pdf section.. not sure yet <section id="pdf-viewer">
                    <h2 className="resumeHeader">Download My Resume</h2>
                    <embed src={resumePDF} type="application/pdf" width="100%" height="600px" />
                    <p>
                        <a href={resumePDF} download="Joseph_Dunlap_Resume.pdf" className="btn btn-primary">Download PDF</a>
                    </p>
                </section> */