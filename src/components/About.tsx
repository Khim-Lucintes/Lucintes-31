import './About.css'

const About = () => {
  return (
    <section id="about" className="about">
      <div className="container">
        <h2 className="section-title">About Me</h2>
        <div className="about-content">
          <div className="about-text">
            <p>
              I'm a passionate developer with a love for creating beautiful and functional
              digital experiences. With expertise in modern web technologies, I bring ideas
              to life through clean code and thoughtful design.
            </p>
            <p>
              My journey in development started with curiosity and has evolved into a
              commitment to building future-proof solutions. I believe in continuous learning
              and staying updated with the latest industry trends and best practices.
            </p>
            <div className="about-stats">
              <div className="stat-item">
                <div className="stat-number">50+</div>
                <div className="stat-label">Projects Completed</div>
              </div>
              <div className="stat-item">
                <div className="stat-number">3+</div>
                <div className="stat-label">Years Experience</div>
              </div>
              <div className="stat-item">
                <div className="stat-number">100%</div>
                <div className="stat-label">Client Satisfaction</div>
              </div>
            </div>
          </div>
          <div className="about-image">
            <div className="about-card">
              <div className="card-content">
                <h3>What I Do</h3>
                <ul>
                  <li>Frontend Development</li>
                  <li>UI/UX Design</li>
                  <li>Full-Stack Solutions</li>
                  <li>Performance Optimization</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default About
