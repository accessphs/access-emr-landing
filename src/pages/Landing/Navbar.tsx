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
    "block py-2 text-sm transition-colors duration-200 md:inline md:py-0 md:text-base",
    active ? "text-primary" : "text-white/70 hover:text-white"
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

function NavLinks({
  onLanding,
  section,
  pathname,
  onNavigate,
}: {
  onLanding: boolean;
  section: SectionId;
  pathname: string;
  onNavigate?: () => void;
}) {
  return (
    <>
      {SECTIONS.map(({ id, label, path }) =>
        onLanding ? (
          <a
            key={id}
            className={navLink(section === id)}
            href={`#${id}`}
            onClick={onNavigate}
          >
            {label}
          </a>
        ) : (
          <Link
            key={id}
            className={navLink(false)}
            to={path}
            onClick={onNavigate}
          >
            {label}
          </Link>
        )
      )}
      <Link
        className={navLink(pathname === "/video-guide")}
        to="/video-guide"
        onClick={onNavigate}
      >
        Video Guide
      </Link>
    </>
  );
}

const Navbar = () => {
  const { pathname } = useLocation();
  const onLanding = pathname === "/";
  const [section, setSection] = useState<SectionId>("home");
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

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
    <nav className="fixed top-0 z-50 w-full border-b border-gray-100 bg-[#003D32]/95 backdrop-blur-sm">
      <div className="relative mx-auto flex h-16 max-w-screen-2xl items-center justify-between px-4 md:h-24 md:px-[100px] lg:px-[100px]">
        <img
          src="/logo.png"
          alt="Logo"
          className="h-20 w-auto object-contain md:h-[6rem] md:-ml-7"
        />

        <ul className="hidden items-center gap-6 md:flex md:gap-8 lg:gap-10">
          <NavLinks
            onLanding={onLanding}
            pathname={pathname}
            section={section}
          />
        </ul>

        <button
          aria-expanded={menuOpen}
          aria-controls="mobile-nav"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          className="inline-flex h-10 w-10 items-center justify-center rounded-lg text-white hover:bg-white/10 md:hidden"
          type="button"
          onClick={() => setMenuOpen((o) => !o)}
        >
          {menuOpen ? (
            <svg
              aria-hidden
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
            >
              <path d="M18 6 6 18M6 6l12 12" />
            </svg>
          ) : (
            <svg
              aria-hidden
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
            >
              <path d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </div>

      {menuOpen ? (
        <div
          className="max-h-[calc(100dvh-4rem)] overflow-y-auto border-t border-gray-100 bg-[#003D32] px-4 py-4 shadow-lg md:hidden"
          id="mobile-nav"
        >
          <div className="flex flex-col gap-1">
            <NavLinks
              onLanding={onLanding}
              pathname={pathname}
              section={section}
              onNavigate={() => setMenuOpen(false)}
            />
          </div>
        </div>
      ) : null}
    </nav>
  );
};

export default Navbar;
