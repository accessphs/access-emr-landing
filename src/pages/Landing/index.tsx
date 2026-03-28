import Features from "./Features";
import Hero from "./Hero";
import Modules from "./Modules";
import { Testimonial } from "./Testimonial";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export const Landing = () => {
  const { hash, pathname } = useLocation();

  useEffect(() => {
    const id = hash.replace(/^#/, "");
    if (!id) return;
    const el = document.getElementById(id);
    if (!el) return;
    const frame = requestAnimationFrame(() => {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    });
    return () => cancelAnimationFrame(frame);
  }, [hash, pathname]);

  return (
    <>
      <Hero />
      <Features />
      <Modules />
      <Testimonial />
    </>
  );
};

export default Landing;
