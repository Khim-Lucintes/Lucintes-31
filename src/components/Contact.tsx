import { useState, FormEvent } from 'react'
import emailjs from '@emailjs/browser'
import './Contact.css'

const personalEmail = import.meta.env.VITE_CONTACT_TO_EMAIL || 'your.email@example.com'

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus('idle')

    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID
    const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY

    if (!serviceId || !templateId || !publicKey) {
      setSubmitStatus('error')
      setIsSubmitting(false)
      console.error('EmailJS configuration is missing. Please check your .env file.')
      return
    }

    try {
      await emailjs.send(
        serviceId,
        templateId,
        {
          name: formData.name,
          email: formData.email,
          message: formData.message,
          to_email: personalEmail,
        },
        publicKey
      )

      setSubmitStatus('success')
      setFormData({ name: '', email: '', message: '' })
      setTimeout(() => setSubmitStatus('idle'), 3000)
    } catch (err) {
      console.error(err)
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const socialLinks = [
    { name: 'GitHub', url: 'https://github.com', icon: 'github' },
    { name: 'LinkedIn', url: 'https://linkedin.com', icon: 'linkedin' },
    { name: 'Twitter', url: 'https://twitter.com', icon: 'twitter' },
    { name: 'Email', url: `mailto:${personalEmail}`, icon: 'email' },
  ]

  return (
    <section id="contact" className="contact">
      <div className="container">
        <h2 className="section-title">Get In Touch</h2>
        <p className="section-subtitle">
          I'm always open to discussing new projects, creative ideas, or opportunities to be
          part of your visions.
        </p>
        <div className="contact-content">
          <div className="contact-info">
            <h3>Let's Connect</h3>
            <p>
              Feel free to reach out if you're looking for a developer, have a question, or
              just want to connect.
            </p>
            <div className="social-links">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-link"
                  aria-label={social.name}
                >
                  <span className={`social-icon ${social.icon}`}>
                    {social.icon === 'github' && '📱'}
                    {social.icon === 'linkedin' && '💼'}
                    {social.icon === 'twitter' && '🐦'}
                    {social.icon === 'email' && '✉️'}
                  </span>
                  <span>{social.name}</span>
                </a>
              ))}
            </div>
          </div>
          <form className="contact-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder="Your name"
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="your.email@example.com"
              />
            </div>
            <div className="form-group">
              <label htmlFor="message">Message</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={6}
                placeholder="Your message..."
              ></textarea>
            </div>
            <button
              type="submit"
              className="btn btn-primary"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Sending...' : 'Send Message'}
            </button>
            {submitStatus === 'success' && (
              <div className="form-success">Message sent successfully!</div>
            )}
            {submitStatus === 'error' && (
              <div className="form-error">Something went wrong. Please try again.</div>
            )}
          </form>
        </div>
      </div>
    </section>
  )
}

export default Contact
