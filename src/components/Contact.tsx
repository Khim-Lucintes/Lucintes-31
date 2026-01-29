import { useState, FormEvent, useEffect, useMemo } from 'react'
import emailjs from '@emailjs/browser'
import './Contact.css'

const personalEmail = import.meta.env.VITE_CONTACT_TO_EMAIL || 'kjlucentes@gmail.com'

interface FormData {
  name: string
  email: string
  message: string
}

type SubmitStatus = 'idle' | 'success' | 'error'

const Contact = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    message: '',
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<SubmitStatus>('idle')
  const [errorMessage, setErrorMessage] = useState('')

  // Memoize environment variables
  const emailConfig = useMemo(() => {
    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID?.trim()
    const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID?.trim()
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY?.trim()

    return {
      serviceId,
      templateId,
      publicKey,
      isValid: Boolean(serviceId && templateId && publicKey),
    }
  }, [])

  useEffect(() => {
    if (emailConfig.publicKey) {
      emailjs.init(emailConfig.publicKey)
    }
  }, [emailConfig.publicKey])

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus('idle')
    setErrorMessage('')

    // Validate EmailJS configuration
    if (!emailConfig.isValid) {
      const missingVars: string[] = []
      if (!emailConfig.serviceId || emailConfig.serviceId.includes('your_') || emailConfig.serviceId.includes('here')) {
        missingVars.push('VITE_EMAILJS_SERVICE_ID')
      }
      if (!emailConfig.templateId || emailConfig.templateId.includes('your_') || emailConfig.templateId.includes('here')) {
        missingVars.push('VITE_EMAILJS_TEMPLATE_ID')
      }
      if (!emailConfig.publicKey || emailConfig.publicKey.includes('your_') || emailConfig.publicKey.includes('here')) {
        missingVars.push('VITE_EMAILJS_PUBLIC_KEY')
      }

      setSubmitStatus('error')
      setErrorMessage(
        `EmailJS configuration is missing: ${missingVars.join(', ')}. Please check your .env file and restart the dev server.`
      )
      setIsSubmitting(false)
      return
    }

    // Validate form data
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setSubmitStatus('error')
      setErrorMessage('Please fill in all fields.')
      setIsSubmitting(false)
      return
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(formData.email)) {
      setSubmitStatus('error')
      setErrorMessage('Please enter a valid email address.')
      setIsSubmitting(false)
      return
    }

    try {
      const result = await emailjs.send(
        emailConfig.serviceId!,
        emailConfig.templateId!,
        {
          from_name: formData.name.trim(),
          from_email: formData.email.trim(),
          message: formData.message.trim(),
          to_email: personalEmail,
          reply_to: formData.email.trim(),
        },
        emailConfig.publicKey!
      )

      if (result.status === 200 && result.text === 'OK') {
        setSubmitStatus('success')
        setErrorMessage('')
        setFormData({ name: '', email: '', message: '' })
        setTimeout(() => setSubmitStatus('idle'), 5000)
      } else {
        throw new Error(result.text || 'EmailJS returned an error')
      }
    } catch (err: unknown) {
      const error = err as { text?: string; message?: string; status?: number }
      console.error('EmailJS Error:', error)
      setSubmitStatus('error')
      
      // Provide user-friendly error messages
      if (error.status === 0) {
        setErrorMessage('Network error. Please check your internet connection and try again.')
      } else if (error.text) {
        setErrorMessage(`Failed to send: ${error.text}`)
      } else if (error.message) {
        setErrorMessage(`Failed to send: ${error.message}`)
      } else {
        setErrorMessage('Failed to send message. Please try again later.')
      }
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    
    // Clear error message when user starts typing
    if (submitStatus === 'error') {
      setSubmitStatus('idle')
      setErrorMessage('')
    }
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
              <div className="form-error">
                {errorMessage || 'Something went wrong. Please try again.'}
              </div>
            )}
          </form>
        </div>
      </div>
    </section>
  )
}

export default Contact
