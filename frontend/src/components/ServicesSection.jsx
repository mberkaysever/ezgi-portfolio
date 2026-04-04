import React from 'react';
import { Palette, Camera, Layout, Lightbulb } from 'lucide-react';

const ServicesSection = () => {
  const services = [
    {
      icon: Palette,
      title: 'Brand Identity',
      description: 'Creating unique visual identities that reflect your brand values and resonate with your audience.'
    },
    {
      icon: Layout,
      title: 'Web Design',
      description: 'Designing beautiful, user-friendly websites that deliver exceptional digital experiences.'
    },
    {
      icon: Camera,
      title: 'Photography',
      description: 'Professional photography services for products, portraits, and editorial content.'
    },
    {
      icon: Lightbulb,
      title: 'Art Direction',
      description: 'Strategic creative direction to bring your vision to life with clarity and impact.'
    }
  ];

  return (
    <section className="py-32 px-12 bg-black text-white">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="mb-20">
          <h2 className="text-6xl font-black mb-4">Services</h2>
          <p className="text-xl text-gray-400">What I can do for you</p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-2 gap-16">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <div 
                key={index}
                className="group cursor-pointer"
              >
                <div className="mb-6">
                  <Icon className="w-12 h-12 text-white group-hover:text-pink-500 transition-colors duration-300" />
                </div>
                <h3 className="text-3xl font-bold mb-4 group-hover:translate-x-2 transition-transform duration-300">
                  {service.title}
                </h3>
                <p className="text-gray-400 text-lg leading-relaxed">
                  {service.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;