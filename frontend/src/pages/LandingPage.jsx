// src/pages/LandingPage.jsx
import { useState, useEffect, useRef } from "react";
import { LoginForm } from "../components/auth/LoginForm";
import { RegisterForm } from "../components/auth/RegisterForm";
import { Footer } from "../components/layout/Footer";
import { LandingMockup } from "./landing_components/LandingMockup";
import { MobileLandingNav } from "./landing_components/navigation/MobileLandingNav";
import { BrandLogo } from "../components/atoms/BrandLogo";

export const LandingPage = () => {
  const [showLogin, setShowLogin] = useState(true);
  const [isNavVisible, setIsNavVisible] = useState(true);
  const authSectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        setIsNavVisible(!entry.isIntersecting);
      },
      { threshold: 0.1 },
    );

    if (authSectionRef.current) {
      observer.observe(authSectionRef.current);
    }

    return () => {
      if (authSectionRef.current) {
        observer.unobserve(authSectionRef.current);
      }
    };
  }, []);

  const handleScrollToAuth = () => {
    if (authSectionRef.current) {
      authSectionRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="flex min-h-screen flex-col bg-slate-50 relative pb-20 lg:pb-0 overflow-x-hidden">
      {/* HEADER y LOGO */}
      <header className="w-full flex justify-center pt-8 pb-2 z-20 lg:absolute lg:top-10 lg:left-10 lg:justify-start lg:p-0">
        <BrandLogo />
      </header>

      {/* Contenedor Principal: */}
      <main className="flex-1 flex flex-col lg:grid lg:grid-cols-5">
        {/* 60% (3 de 5 columnas) - Área Visual */}
        <section className="flex flex-col items-center justify-center px-6 pb-12 pt-4 text-center lg:col-span-3 lg:min-h-screen lg:p-6 lg:pb-12">
          <LandingMockup />
        </section>

        {/* 40% (2 de 5 columnas) - Área de Autenticación */}
        <section
          id="auth-section"
          ref={authSectionRef}
          className="flex flex-col items-center justify-center p-6 py-12 bg-slate-200 rounded-t-3xl shadow-inner min-h-screen lg:col-span-2 lg:rounded-none lg:shadow-none lg:border-l lg:border-slate-300 lg:bg-white"
        >
          {showLogin ? (
            <LoginForm onSwitchToRegister={() => setShowLogin(false)} />
          ) : (
            <RegisterForm onSwitchToLogin={() => setShowLogin(true)} />
          )}
        </section>
      </main>

      {/* El footer abarcará el 100% del ancho debajo de ambas columnas en escritorio */}
      <Footer />

      <MobileLandingNav
        onAction={handleScrollToAuth}
        isVisible={isNavVisible}
      />
    </div>
  );
};
