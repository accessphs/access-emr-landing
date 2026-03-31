import classNames from "classnames";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

const SECTIONS = [
  { id: "home" as const, label: "Home", path: "/" },
  { id: "features" as const, label: "Features", path: "/#features" },
  {
    id: "testimonials" as const,
    label: "Testimonials",
    path: "/#testimonials",
  },
];
type SectionId = (typeof SECTIONS)[number]["id"];

const navLink = (active: boolean) =>
  classNames(
    "cursor-pointer transition-colors duration-200",
    active ? "text-primary" : "text-[#1a1a1a]/70 hover:text-[#1a1a1a]"
  );

function activeSectionAt(scrollY: number): SectionId {
  const line = scrollY + window.innerHeight * 0.22;
  let current: SectionId = "home";
  for (const { id } of SECTIONS) {
    const el = document.getElementById(id);
    if (!el) continue;
    if (line >= el.getBoundingClientRect().top + scrollY) current = id;
  }
  return current;
}

const Navbar = () => {
  const { pathname } = useLocation();
  const onLanding = pathname === "/";
  const [section, setSection] = useState<SectionId>("home");

  useEffect(() => {
    const sync = () => {
      if (pathname !== "/") return;
      const next = activeSectionAt(window.scrollY);
      setSection((p) => (p === next ? p : next));
    };
    const onScroll = () => {
      if (pathname === "/") sync();
    };
    sync();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", sync);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", sync);
    };
  }, [pathname]);

  return (
    <nav className="fixed top-0 z-50 flex w-full items-center justify-between border-b border-gray-100 bg-white/95 px-16 py-7 backdrop-blur-sm md:px-[100px] h-24">
      <img src="/logo.png" alt="Logo" className="h-24 -ml-7" />
      <ul className="flex gap-8">
        {SECTIONS.map(({ id, label, path }) =>
          onLanding ? (
            <a key={id} className={navLink(section === id)} href={`#${id}`}>
              {label}
            </a>
          ) : (
            <Link key={id} className={navLink(false)} to={path}>
              {label}
            </Link>
          )
        )}
        <Link
          className={navLink(pathname === "/video-guide")}
          to="/video-guide"
        >
          Video Guide
        </Link>
      </ul>
    </nav>
  );
};

export default Navbar;
