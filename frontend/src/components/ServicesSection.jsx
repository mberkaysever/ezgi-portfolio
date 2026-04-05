import React, { useMemo } from "react";
import { Palette, Camera, Layout, Lightbulb } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";

const ICONS = [Palette, Layout, Camera, Lightbulb];

const ServicesSection = () => {
  const { t } = useLanguage();
  const items = t("services.items");

  const services = useMemo(() => {
    if (!Array.isArray(items)) return [];
    return items.map((item, index) => ({
      icon: ICONS[index] ?? Palette,
      title: item.title,
      description: item.description,
    }));
  }, [items]);

  return (
    <section id="design" className="py-32 px-12 bg-black/[0.94] text-white scroll-mt-24">
      <div className="max-w-7xl mx-auto">
        <div className="mb-20">
          <h2 className="text-6xl font-black mb-4">{t("services.title")}</h2>
          <p className="text-xl text-gray-400">{t("services.subtitle")}</p>
        </div>

        <div className="grid grid-cols-2 gap-16">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <div key={index} className="group cursor-pointer">
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
