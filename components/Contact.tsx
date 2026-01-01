
import React, { useState } from 'react';
import { contactService } from '../services/api';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [apiResponse, setApiResponse] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setApiResponse(null);
    try {
      const response = await contactService.submitForm(formData);
      setApiResponse(response);
      if (response.status === 'SUCCESS') {
        setFormData({ name: '', email: '', message: '' });
      }
    } catch (error) {
      setApiResponse({ status: 'ERROR', message: 'Something went wrong. Please try again later.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="min-h-screen py-24 px-6 lg:px-24 max-w-4xl mx-auto flex flex-col justify-center">
      <div className="flex items-center gap-4 mb-12">
        <h2 className="text-3xl font-bold text-zinc-100">04. Get In Touch</h2>
        <div className="h-px bg-zinc-800 flex-grow"></div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
        <div className="space-y-6">
          <h3 className="text-2xl font-bold text-zinc-200">Let's connect.</h3>
          <p className="text-zinc-400 leading-relaxed">
            I'm interested in working on large-scale banking platforms and financial technology. 
            Feel free to reach out if you have questions or opportunities!
          </p>
          
          <div className="space-y-4 pt-6">
            <div className="flex items-center gap-4 text-zinc-400 group">
              <div className="w-10 h-10 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center group-hover:border-emerald-500/50 transition-colors">
                <svg className="w-5 h-5 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              contact@rajkumar.dev
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {apiResponse && (
            <div className={`p-4 rounded-lg text-sm border ${
              apiResponse.status === 'SUCCESS' 
                ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400' 
                : 'bg-red-500/10 border-red-500/20 text-red-400'
            }`}>
              {apiResponse.message}
            </div>
          )}
          <div className="grid grid-cols-1 gap-4">
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              required
              value={formData.name}
              onChange={handleChange}
              className="bg-zinc-900 border border-zinc-800 rounded-lg p-3 text-sm focus:outline-none focus:border-emerald-500 transition-colors text-zinc-100"
            />
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              required
              value={formData.email}
              onChange={handleChange}
              className="bg-zinc-900 border border-zinc-800 rounded-lg p-3 text-sm focus:outline-none focus:border-emerald-500 transition-colors text-zinc-100"
            />
          </div>
          <textarea
            name="message"
            placeholder="Your message..."
            required
            rows={5}
            value={formData.message}
            onChange={handleChange}
            className="w-full bg-zinc-900 border border-zinc-800 rounded-lg p-3 text-sm focus:outline-none focus:border-emerald-500 transition-colors resize-none text-zinc-100"
          ></textarea>
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-4 bg-emerald-500 text-zinc-950 font-bold rounded-lg hover:bg-emerald-400 transition-colors disabled:opacity-50"
          >
            {isSubmitting ? 'Sending...' : 'Send Message'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Contact;
