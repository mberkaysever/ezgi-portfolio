import React from 'react';
import { Button } from './ui/button';
import { Mail, Linkedin, Instagram, Twitter } from 'lucide-react';

const ContactSection = () => {
  return (
    <section className="min-h-screen bg-white flex items-center justify-center px-12 py-32">
      <div className="max-w-4xl mx-auto text-center">
        {/* Large headline */}
        <h2 className="text-7xl md:text-8xl font-black mb-12 leading-tight">
          Let's work
          <br />
          together
        </h2>

        <p className="text-2xl text-gray-600 mb-16 leading-relaxed">
          Have a project in mind? Let's discuss how we can bring your vision to life.
        </p>

        {/* Contact button */}
        <Button 
          className="bg-black text-white hover:bg-gray-800 px-12 py-8 text-xl rounded-md mb-16"
        >
          <Mail className="w-6 h-6 mr-3" />
          Get in touch
        </Button>

        {/* Social links */}
        <div className="flex items-center justify-center gap-8 mb-20">
          <a href="#" className="text-gray-400 hover:text-black transition-colors">
            <Linkedin className="w-6 h-6" />
          </a>
          <a href="#" className="text-gray-400 hover:text-black transition-colors">
            <Instagram className="w-6 h-6" />
          </a>
          <a href="#" className="text-gray-400 hover:text-black transition-colors">
            <Twitter className="w-6 h-6" />
          </a>
        </div>

        {/* Footer */}
        <div className="border-t border-gray-200 pt-12">
          <div className="flex items-center justify-between text-sm text-gray-500">
            <p>© 2024 Studio. All rights reserved.</p>
            <div className="flex gap-8">
              <a href="#" className="hover:text-black transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-black transition-colors">Terms of Service</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;