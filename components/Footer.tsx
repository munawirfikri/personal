import React, { useState, useRef } from 'react';
import ReCAPTCHA from "react-google-recaptcha";
import { SOCIALS, PROFILE } from '../constants';
import { SectionId } from '../types';

const Footer: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [errors, setErrors] = useState<{name?: string, email?: string, message?: string, captcha?: string}>({});
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const recaptchaRef = useRef<any>(null);

  const validate = () => {
    const newErrors: {name?: string, email?: string, message?: string, captcha?: string} = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    if (!formData.message.trim()) newErrors.message = 'Message is required';
    if (!captchaToken) newErrors.captcha = 'Please verify that you are not a robot';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      setIsSubmitting(true);
      // Simulate API call
      try {
        console.log("Submitting with captcha token:", captchaToken);
        await new Promise(resolve => setTimeout(resolve, 1500));
        setSubmitStatus('success');
        setFormData({ name: '', email: '', message: '' });
        setCaptchaToken(null);
        recaptchaRef.current?.reset();
        setTimeout(() => setSubmitStatus('idle'), 5000);
      } catch (error) {
        setSubmitStatus('error');
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name as keyof typeof errors]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const handleCaptchaChange = (token: string | null) => {
    setCaptchaToken(token);
    if (errors.captcha && token) {
      setErrors(prev => ({ ...prev, captcha: undefined }));
    }
  };

  return (
    <footer id={SectionId.CONTACT} className="pt-24 pb-32 md:pb-24 border-t border-border bg-background relative overflow-hidden scroll-mt-28">
      <div className="container mx-auto px-4 md:px-6">
        
        <div className="grid md:grid-cols-2 gap-12 lg:gap-24 mb-20">
            {/* Contact Info */}
            <div className="order-2 md:order-1">
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Let's work together</h2>
                <p className="text-secondary text-lg mb-12">
                    Have a project in mind or want to discuss modern backend solutions? 
                    I'm always open to discussing new projects, creative ideas or opportunities to be part of your visions.
                </p>

                <div className="space-y-8">
                    <div>
                        <h4 className="text-sm font-bold uppercase tracking-wider text-gray-500 mb-2">Email</h4>
                        <a href={`mailto:${PROFILE.email}`} className="text-xl text-white hover:underline decoration-gray-500 underline-offset-4 break-all">
                            {PROFILE.email}
                        </a>
                    </div>
                    
                    <div>
                        <h4 className="text-sm font-bold uppercase tracking-wider text-gray-500 mb-3">Socials</h4>
                        <div className="flex gap-4">
                            {SOCIALS.map(social => (
                            <a 
                                key={social.platform} 
                                href={social.url} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="w-12 h-12 flex items-center justify-center rounded-full border border-border text-secondary hover:bg-white hover:text-black hover:border-white transition-all duration-300 group"
                                aria-label={social.platform}
                            >
                                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                                <path d={social.icon} />
                                </svg>
                            </a>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Contact Form */}
            <div className="order-1 md:order-2 bg-surfaceHighlight p-5 md:p-8 rounded-2xl border border-border shadow-2xl relative">
                <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-400 mb-2">Name</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className={`w-full px-4 py-3 rounded-lg bg-background border ${errors.name ? 'border-red-500 focus:border-red-500' : 'border-border focus:border-white'} text-white focus:outline-none transition-colors placeholder-gray-600`}
                            placeholder="John Doe"
                        />
                        {errors.name && <p className="mt-1 text-sm text-red-500 animate-fade-in">{errors.name}</p>}
                    </div>

                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-400 mb-2">Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className={`w-full px-4 py-3 rounded-lg bg-background border ${errors.email ? 'border-red-500 focus:border-red-500' : 'border-border focus:border-white'} text-white focus:outline-none transition-colors placeholder-gray-600`}
                            placeholder="john@example.com"
                        />
                        {errors.email && <p className="mt-1 text-sm text-red-500 animate-fade-in">{errors.email}</p>}
                    </div>

                    <div>
                        <label htmlFor="message" className="block text-sm font-medium text-gray-400 mb-2">Message</label>
                        <textarea
                            id="message"
                            name="message"
                            value={formData.message}
                            onChange={handleChange}
                            rows={4}
                            className={`w-full px-4 py-3 rounded-lg bg-background border ${errors.message ? 'border-red-500 focus:border-red-500' : 'border-border focus:border-white'} text-white focus:outline-none transition-colors resize-none placeholder-gray-600`}
                            placeholder="Tell me about your project..."
                        ></textarea>
                        {errors.message && <p className="mt-1 text-sm text-red-500 animate-fade-in">{errors.message}</p>}
                    </div>

                    {/* ReCAPTCHA */}
                    <div className="flex flex-col">
                        <div className="transform scale-[0.85] origin-top-left md:scale-100 sm:scale-100">
                          <ReCAPTCHA
                              ref={recaptchaRef}
                              sitekey="6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI" // Google Test Site Key
                              onChange={handleCaptchaChange}
                              theme="dark"
                          />
                        </div>
                        {errors.captcha && <p className="mt-1 text-sm text-red-500 animate-fade-in">{errors.captcha}</p>}
                    </div>

                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full py-4 bg-white text-black font-bold rounded-lg hover:bg-gray-200 transition-all transform hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none shadow-lg hover:shadow-white/10"
                    >
                        {isSubmitting ? (
                          <span className="flex items-center justify-center gap-2">
                            <span className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin"></span>
                            Sending...
                          </span>
                        ) : 'Send Message'}
                    </button>

                    {submitStatus === 'success' && (
                        <div className="absolute inset-0 bg-surfaceHighlight/95 backdrop-blur-sm flex items-center justify-center rounded-2xl animate-fade-in z-20">
                            <div className="text-center">
                                <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
                                </div>
                                <h3 className="text-xl font-bold text-white mb-2">Message Sent!</h3>
                                <p className="text-gray-400">I'll get back to you as soon as possible.</p>
                            </div>
                        </div>
                    )}
                </form>
                 {/* Decorative gradient for form */}
                 <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -z-0 pointer-events-none transform translate-x-1/2 -translate-y-1/2"></div>
            </div>
        </div>

        <div className="pt-8 border-t border-border text-center text-sm text-gray-600">
          <p>© {new Date().getFullYear()} Munawir Fikri. All rights reserved.</p>
          <p className="mt-2 text-xs">Built with React, Tailwind, and Gemini AI.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;