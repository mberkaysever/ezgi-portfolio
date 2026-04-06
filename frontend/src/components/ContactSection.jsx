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
      className="flex min-h-[100dvh] min-h-screen scroll-mt-24 items-center justify-center bg-white/75 px-4 py-24 pb-[max(6rem,env(safe-area-inset-bottom,0px)+4rem)] pt-20 sm:px-8 sm:py-32 md:px-12"
    >
      <div className="mx-auto max-w-4xl text-center">
        <h2 className="mb-8 text-4xl font-medium leading-tight tracking-tight sm:mb-10 sm:text-5xl md:mb-12 md:text-7xl lg:text-8xl">
          {t("contact.titleLine1")}
          <br />
          {t("contact.titleLine2")}
        </h2>

        <p className="mb-10 text-lg leading-relaxed text-gray-600 sm:mb-14 sm:text-xl md:mb-16 md:text-2xl">
          {t("contact.body")}
        </p>

        <Button
          className="mb-12 w-full max-w-md bg-black px-8 py-6 text-base text-white hover:bg-gray-800 sm:mb-16 sm:w-auto sm:px-12 sm:py-8 sm:text-xl"
          asChild
        >
          <a href={`mailto:${t("nav.contactEmail")}`}>
            <Mail className="mr-3 h-5 w-5 sm:h-6 sm:w-6" aria-hidden />
            {t("contact.cta")}
          </a>
        </Button>

        <div className="mb-16 flex items-center justify-center gap-6 sm:mb-20 sm:gap-8">
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
