import React from 'react';
import './pages.css';

const ResumeComponent: React.FC = () => {
    return (
        <div className="resume-container">
            <header>
                <h1>Joseph Dunlap</h1>
                <p>479-225-6983 | <a href="mailto:joedunlap26@gmail.com">joedunlap26@gmail.com</a></p>
                <p>
                    <a href="https://github.com/joedunlap" target="_blank" rel="noopener noreferrer">GitHub</a> | 
                    <a href="https://www.linkedin.com/in/joe-dunlap" target="_blank" rel="noopener noreferrer">LinkedIn</a>
                </p>
            </header>

            <section>
                <h2>Education</h2>
                <div className="education-item">
                    <h3>Arkansas Coding Academy</h3>
                    <p>Full Stack Development, MEAN Stack - June 2024</p>
                    <p>Demo Day Project: Virtual Lab Notebook</p>
                    <p>24-week program focused on technical programming skills in Node Js, MongoDB, JavaScript, HTML, CSS, Bootstrap, and Angular to build full-stack web applications.</p>
                </div>
                <div className="education-item">
                    <h3>University of Central Arkansas</h3>
                    <p>Master of Science, Biology - May 2022</p>
                    <p>Independent Research: “Effects of Fertilization and Defoliation on Carbon Remobilization in Northern Red Oak and River Birch Saplings”.</p>
                </div>
                <div className="education-item">
                    <h3>University of Arkansas - Fort Smith</h3>
                    <p>Bachelor of Science, Biology - May 2018</p>
                    <p>Honors Capstone: “The effects of Saline, Acidic, and Alkaline Conditions on tardigrade Hypsibius dujardini”.</p>
                </div>
            </section>

            <section>
                <h2>Experience</h2>
                <div className="experience-item">
                    <h3>Steep Hill Arkansas</h3>
                    <p>Laboratory Technician - April 2020-Present</p>
                    <ul>
                        <li>Accessioned samples and carried out sample prep for potency, pesticides, microbial, residual solvents, and heavy metal analysis.</li>
                        <li>Operated Instruments such as Gas Chromatography-Mass Spectrometry (GC-MS), Liquid Chromatography-Mass Spectrometry (LC-MS), Inductively Coupled Plasma Mass Spectrometry (ICP-MS), and High Performance Liquid Chromatography (HPLC).</li>
                        <li>Aided in R&D for SOP improvements and trained new laboratory technicians.</li>
                        <li>Built a density calculator with newly acquired skills in HTML, CSS, and JavaScript.</li>
                    </ul>
                </div>
                <div className="experience-item">
                    <h3>Food Safety Net Services</h3>
                    <p>Pathology Lab Analyst - May 2018- April 2020</p>
                    <ul>
                        <li>Performed testing for various assays such as Listeria, Salmonella, E. coli, Campylobacter according to USDA/FDA methods through regular use of Dupont BAX-PCR, Biomerieux Vidas, 3M MDS, ROKA Atlas, VITEK 2, and 3M petrifilm.</li>
                        <li>Notified clients of positive samples and followed through with confirmation according to client specifications and USDA/FDA guidelines if applicable.</li>
                        <li>Trained new pathology lab techs, primarily focusing on USDA/FDA confirmations for Salmonella.</li>
                        <li>Traveled to FSNS’ Amarillo Lab to work/guide new hires for two weeks after the company grew 15% in one day due to abruptly acquiring business from one of the largest beef producers in the U.S.</li>
                    </ul>
                </div>
            </section>

            <section>
                <h2>Projects</h2>
                <div className="project-item">
                    <h3>Virtual Lab Notebook</h3>
                    <p>Developed a full-stack web application to emulate a physical laboratory notebook.</p>
                    <p>Utilized MongoDB, React, Express, Bootstrap, and Node.js to create CRUD functionality.</p>
                    <p>Implemented user authentication and project/sample management.</p>
                </div>
            </section>

            <section>
                <h2>Skills</h2>
                <p>Programming Languages & Frameworks: JavaScript, Node.js, Express, React, Angular, HTML, CSS, Bootstrap, RESTful APIs, R Programming Language</p>
                <p>Databases: MongoDB</p>
                <p>Tools & Technologies: Git, Github</p>
                <p>Currently Learning: Python</p>
                <p>Certifications: CPR and First Aid</p>
            </section>

            <section>
                <h2>Achievements/Awards</h2>
                <ul>
                    <li>Member of the Honors International Studies Program/Scholarship at UAFS</li>
                    <li>Presentations:
                        <ul>
                            <li>“The effects of Saline, Acidic, and Basic Conditions on tardigrade species Hypsibius dujardini” at UAFS Undergraduate Research Symposium, April 2018</li>
                            <li>“Exploring the Effects of Fertilization and Defoliation on Carbon Storage in Northern Red Oak and River Birch Saplings” at 83rd Annual Meeting of Association of Southeastern Biologists, April 2022</li>
                            <li>Demo Day, Arkansas Coding Academy, June 2024</li>
                        </ul>
                    </li>
                    <li>Volunteer for the JBC Center of Archaeological Research/UCA Field School</li>
                    <li>Studied abroad in both Domestic (American Southwest) and International (Scotland, England) Maymesters</li>
                </ul>
            </section>
        </div>
    );
};

export default ResumeComponent;