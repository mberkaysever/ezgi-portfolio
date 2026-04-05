import React from "react";
import { Button } from "./ui/button";
import { Mail, Linkedin, Instagram, MessageCircle } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";

const INSTAGRAM_URL = "https://www.instagram.com/ezgiaysever_art/";
const LINKEDIN_URL = "https://www.linkedin.com/in/ezgi-aysever-94279b83/";
const WHATSAPP_URL = "https://wa.me/905330865472";

const ContactSection = () => {
  const { t } = useLanguage();

  return (
    <section
      id="contact"
      className="min-h-screen bg-white/75 flex items-center justify-center px-12 py-32 scroll-mt-24"
    >
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-7xl md:text-8xl font-black mb-12 leading-tight">
          {t("contact.titleLine1")}
          <br />
          {t("contact.titleLine2")}
        </h2>

        <p className="text-2xl text-gray-600 mb-16 leading-relaxed">
          {t("contact.body")}
        </p>

        <Button className="bg-black text-white hover:bg-gray-800 px-12 py-8 text-xl rounded-md mb-16">
          <Mail className="w-6 h-6 mr-3" aria-hidden />
          {t("contact.cta")}
        </Button>

        <div className="flex items-center justify-center gap-8 mb-20">
          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-black transition-colors"
            aria-label="Instagram"
          >
            <Instagram className="w-6 h-6" />
          </a>
          <a
            href={LINKEDIN_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-black transition-colors"
            aria-label="LinkedIn"
          >
            <Linkedin className="w-6 h-6" />
          </a>
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-black transition-colors"
            aria-label="WhatsApp"
          >
            <MessageCircle className="w-6 h-6" />
          </a>
        </div>

        <div className="border-t border-gray-200 pt-12">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6 text-sm text-gray-500">
            <p>{t("contact.rights")}</p>
            <div className="flex gap-8 justify-center sm:justify-end">
              <a href="#" className="hover:text-black transition-colors">
                {t("contact.privacy")}
              </a>
              <a href="#" className="hover:text-black transition-colors">
                {t("contact.terms")}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
