import React from 'react';
import { Button } from './ui/button';

const HeroSection = () => {
  const brands = ['AUDIBLE', 'TISSOT', 'OLYMPIA', 'VEUVE CLICQUOT'];

  return (
    <section className="relative min-h-screen bg-white flex items-center justify-center overflow-hidden pt-20">
      {/* Small intro text at top center */}
      <div className="absolute top-28 left-1/2 transform -translate-x-1/2 z-30">
        <p className="text-base text-gray-600 whitespace-nowrap">
          Hi, my name is Alex and I am a freelance
        </p>
      </div>

      {/* Main typography layers */}
      <div className="relative w-full h-screen flex items-center justify-center">
        {/* Outlined text - & Photographer (behind) */}
        <h2 
          className="absolute font-black z-10 select-none pointer-events-none"
          style={{
            fontSize: 'clamp(5rem, 14vw, 16rem)',
            lineHeight: '0.85',
            letterSpacing: '-0.04em',
            WebkitTextStroke: '2px #000000',
            WebkitTextFillColor: 'transparent',
            color: 'transparent',
            whiteSpace: 'nowrap',
            top: '52%',
            left: '50%',
            transform: 'translate(-50%, -50%)'
          }}
        >
          & Photographer
        </h2>

        {/* Portrait image (middle layer) */}
        <div 
          className="absolute z-15 select-none"
          style={{
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)'
          }}
        >
          <img 
            src="https://images.unsplash.com/photo-1635349090262-431052479144?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDQ2NDF8MHwxfHNlYXJjaHw0fHxwaG90b2dyYXBoZXIlMjBwb3J0cmFpdHxlbnwwfHx8fDE3NzUzMjAzOTN8MA&ixlib=rb-4.1.0&q=85"
            alt="Portrait"
            className="grayscale opacity-95"
            style={{
              height: 'clamp(420px, 55vh, 650px)',
              width: 'auto',
              objectFit: 'cover',
              filter: 'contrast(1.1)'
            }}
          />
        </div>

        {/* Solid text - Webdesigner (front) */}
        <h1 
          className="absolute text-black font-black z-20 select-none pointer-events-none"
          style={{
            fontSize: 'clamp(5rem, 14vw, 16rem)',
            lineHeight: '0.85',
            letterSpacing: '-0.04em',
            whiteSpace: 'nowrap',
            top: '48%',
            left: '50%',
            transform: 'translate(-50%, -50%)'
          }}
        >
          Webdesigner
        </h1>
      </div>

      {/* Location text bottom left */}
      <div className="absolute bottom-28 left-8 md:left-16 z-30">
        <p className="text-base text-gray-700">based in New York, USA.</p>
      </div>

      {/* Brand logos */}
      <div className="absolute bottom-28 left-1/2 transform -translate-x-1/2 z-30">
        <div className="flex items-center gap-10 opacity-30">
          {brands.map((brand, index) => (
            <span 
              key={index} 
              className="text-xs font-semibold tracking-wider text-gray-800"
            >
              {brand}
            </span>
          ))}
        </div>
      </div>

      {/* CTA Buttons */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-30">
        <div className="flex gap-4">
          <Button 
            variant="default"
            className="bg-gray-900 text-white hover:bg-black px-8 py-6 text-sm font-medium rounded-md transition-all duration-300 hover:scale-105"
          >
            You need a designer
          </Button>
          <Button 
            variant="outline"
            className="border-2 border-gray-900 bg-white text-gray-900 hover:bg-gray-100 px-8 py-6 text-sm font-medium rounded-md transition-all duration-300 hover:scale-105"
          >
            You need a photographer
          </Button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;