import React from 'react';
import { ArrowUpRight } from 'lucide-react';

const PortfolioSection = () => {
  const projects = [
    {
      id: 1,
      title: 'Brand Identity Redesign',
      category: 'Design',
      image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&q=80',
      year: '2024'
    },
    {
      id: 2,
      title: 'Editorial Photography',
      category: 'Photography',
      image: 'https://images.unsplash.com/photo-1542038784456-1ea8e935640e?w=800&q=80',
      year: '2024'
    },
    {
      id: 3,
      title: 'E-commerce Platform',
      category: 'Design',
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80',
      year: '2023'
    },
    {
      id: 4,
      title: 'Product Photography',
      category: 'Photography',
      image: 'https://images.unsplash.com/photo-1606813907291-d86efa9b94db?w=800&q=80',
      year: '2023'
    }
  ];

  return (
    <section className="py-32 px-12 bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="mb-20">
          <h2 className="text-6xl font-black mb-4">Selected Work</h2>
          <p className="text-xl text-gray-600">A collection of recent projects</p>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-2 gap-12">
          {projects.map((project) => (
            <div 
              key={project.id}
              className="group cursor-pointer"
            >
              <div className="relative overflow-hidden mb-6 aspect-[4/3] bg-gray-100">
                <img 
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition-opacity duration-500"></div>
              </div>
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-2xl font-bold mb-1 group-hover:translate-x-2 transition-transform duration-300">
                    {project.title}
                  </h3>
                  <p className="text-gray-500">{project.category} • {project.year}</p>
                </div>
                <ArrowUpRight className="w-6 h-6 text-gray-400 group-hover:text-black group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PortfolioSection;