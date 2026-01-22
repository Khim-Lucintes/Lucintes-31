import './Skills.css'

const Skills = () => {
  const skillCategories = [
    {
      title: 'Frontend',
      skills: [
        { name: 'React', level: 90 },
        { name: 'TypeScript', level: 85 },
        { name: 'HTML/CSS', level: 95 },
        { name: 'JavaScript', level: 90 },
      ],
    },
    {
      title: 'Backend',
      skills: [
        { name: 'Node.js', level: 80 },
        { name: 'Python', level: 75 },
        { name: 'Database Design', level: 85 },
        { name: 'API Development', level: 85 },
      ],
    },
    {
      title: 'Tools & Others',
      skills: [
        { name: 'Git', level: 90 },
        { name: 'Docker', level: 70 },
        { name: 'CI/CD', level: 75 },
        { name: 'Testing', level: 80 },
      ],
    },
  ]

  return (
    <section id="skills" className="skills">
      <div className="container">
        <h2 className="section-title">Skills</h2>
        <p className="section-subtitle">
          Technologies and tools I work with to bring ideas to life
        </p>
        <div className="skills-grid">
          {skillCategories.map((category, index) => (
            <div key={index} className="skill-category">
              <h3 className="category-title">{category.title}</h3>
              <div className="skill-list">
                {category.skills.map((skill, skillIndex) => (
                  <div key={skillIndex} className="skill-item">
                    <div className="skill-header">
                      <span className="skill-name">{skill.name}</span>
                      <span className="skill-percentage">{skill.level}%</span>
                    </div>
                    <div className="skill-bar">
                      <div
                        className="skill-progress"
                        style={{ width: `${skill.level}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Skills
