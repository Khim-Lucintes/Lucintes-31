import { useEffect, useState } from 'react'
import profileJpg from '../assets/profile.jpg'
import fallbackProfileImg from '../assets/profile.svg'
import './Hero.css'

const Hero = () => {
  const [typedText, setTypedText] = useState('')
  const [profileSrc, setProfileSrc] = useState<string>(profileJpg)
  const phrases = ['Developer', 'Designer', 'Problem Solver', 'Creator']
  const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => {
    const currentPhrase = phrases[currentPhraseIndex]
    let timeout: ReturnType<typeof setTimeout>

    if (!isDeleting && typedText.length < currentPhrase.length) {
      timeout = setTimeout(() => {
        setTypedText(currentPhrase.slice(0, typedText.length + 1))
      }, 100)
    } else if (!isDeleting && typedText.length === currentPhrase.length) {
      timeout = setTimeout(() => setIsDeleting(true), 2000)
    } else if (isDeleting && typedText.length > 0) {
      timeout = setTimeout(() => {
        setTypedText(currentPhrase.slice(0, typedText.length - 1))
      }, 50)
    } else if (isDeleting && typedText.length === 0) {
      setIsDeleting(false)
      setCurrentPhraseIndex((prev) => (prev + 1) % phrases.length)
    }

    return () => clearTimeout(timeout)
  }, [typedText, isDeleting, currentPhraseIndex])

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section id="home" className="hero">
      <div className="hero-container">
        <div className="hero-content">
          <h1 className="hero-title">
            Hi, I'm <span className="hero-name">Khim Lucintes</span>
          </h1>
          <h2 className="hero-subtitle">
            I'm a <span className="hero-typed">{typedText}</span>
            <span className="hero-cursor">|</span>
          </h2>
          <p className="hero-description">
            Building modern, scalable, and user-friendly applications with cutting-edge technologies.
          </p>
          <div className="hero-buttons">
            <button
              className="btn btn-primary"
              onClick={() => scrollToSection('projects')}
            >
              View My Work
            </button>
            <button
              className="btn btn-secondary"
              onClick={() => scrollToSection('contact')}
            >
              Get In Touch
            </button>
          </div>
        </div>
        <div className="hero-image">
          <div className="hero-avatar">
            <img
              src={profileSrc}
              alt="Khim Lucintes portrait"
              className="avatar-image"
              onError={() => setProfileSrc(fallbackProfileImg)}
            />
            <div className="avatar-ring" aria-hidden="true"></div>
          </div>
        </div>
      </div>
      <div className="hero-scroll">
        <div className="scroll-indicator" onClick={() => scrollToSection('about')}>
          <span></span>
        </div>
      </div>
    </section>
  )
}

export default Hero