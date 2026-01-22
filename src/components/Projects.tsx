import { useState } from 'react'
import './Projects.css'

interface Project {
  id: number
  title: string
  description: string
  technologies: string[]
  image: string
  link?: string
  github?: string
}

const Projects = () => {
  const [hoveredProject, setHoveredProject] = useState<number | null>(null)

  const projects: Project[] = [
    {
      id: 1,
      title: 'E-Commerce Platform',
      description:
        'A full-stack e-commerce solution with modern UI, payment integration, and admin dashboard.',
      technologies: ['React', 'Node.js', 'MongoDB', 'Stripe'],
      image: 'project-1',
      link: '#',
      github: '#',
    },
    {
      id: 2,
      title: 'Task Management App',
      description:
        'A collaborative task management application with real-time updates and team collaboration features.',
      technologies: ['React', 'TypeScript', 'Firebase', 'Material-UI'],
      image: 'project-2',
      link: '#',
      github: '#',
    },
    {
      id: 3,
      title: 'Weather Dashboard',
      description:
        'A beautiful weather dashboard with location-based forecasts and interactive maps.',
      technologies: ['React', 'API Integration', 'Chart.js', 'CSS3'],
      image: 'project-3',
      link: '#',
      github: '#',
    },
    {
      id: 4,
      title: 'Social Media Analytics',
      description:
        'Analytics platform for social media metrics with data visualization and reporting.',
      technologies: ['React', 'Python', 'D3.js', 'PostgreSQL'],
      image: 'project-4',
      link: '#',
      github: '#',
    },
  ]

  return (
    <section id="projects" className="projects">
      <div className="container">
        <h2 className="section-title">Featured Projects</h2>
        <p className="section-subtitle">
          A selection of projects I've worked on recently
        </p>
        <div className="projects-grid">
          {projects.map((project) => (
            <div
              key={project.id}
              className="project-card"
              onMouseEnter={() => setHoveredProject(project.id)}
              onMouseLeave={() => setHoveredProject(null)}
            >
              <div className="project-image">
                <div className="project-placeholder">
                  <div className="placeholder-content">
                    <span>{project.title}</span>
                  </div>
                </div>
                <div
                  className={`project-overlay ${hoveredProject === project.id ? 'active' : ''}`}
                >
                  <div className="project-links">
                    {project.link && (
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="project-link"
                      >
                        Live Demo
                      </a>
                    )}
                    {project.github && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="project-link"
                      >
                        GitHub
                      </a>
                    )}
                  </div>
                </div>
              </div>
              <div className="project-content">
                <h3 className="project-title">{project.title}</h3>
                <p className="project-description">{project.description}</p>
                <div className="project-technologies">
                  {project.technologies.map((tech, index) => (
                    <span key={index} className="tech-tag">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Projects
