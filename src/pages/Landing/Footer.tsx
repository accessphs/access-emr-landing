import { Link } from "react-router-dom";
import { StyleText } from "./Hero";

const Footer = () => {
  return (
    <div className="py-[50px]">
      <div className="flex mx-[100px] flex-col gap-[72px]">
        <div className="flex justify-between md:gap-32 md:flex-row flex-col">
          <div className="flex flex-col gap-6">
            <img src="/logo.png" alt="Logo" className="h-24 -ml-7" />
            <div className="flex flex-col gap-4 items-star -mt-12">
              {/* <Button className="bg-[#F2F2F2]" kinds={"normal"}>
                Sign in
              </Button> */}
              <p className="text-sm text-[#1A1A1A]">
                © accessemr Ltd {new Date().getFullYear()}
              </p>
            </div>
          </div>
          <div className="flex md:gap-20 gap-7 md:flex-row flex-col">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              {/* Company */}
              <div className="space-y-4">
                <h3 className="font-medium text-base text-gray-900">Company</h3>
                <ul className="space-y-3 text-gray-700">
                  <li>
                    <Link
                      className="hover:text-gray-900 transition"
                      to="/about"
                    >
                      About us
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="hover:text-gray-900 transition"
                      to="/terms"
                    >
                      Terms of service
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="hover:text-gray-900 transition"
                      to="/privacy"
                    >
                      Privacy policy
                    </Link>
                  </li>
                </ul>
              </div>

              {/* Contact */}
              <div className="space-y-4">
                <h3 className="font-medium text-base text-gray-900">
                  Contact us
                </h3>
                <ul className="space-y-3 text-gray-700">
                  <li>
                    <Link
                      className="hover:text-gray-900 transition"
                      to="mailto:accessemr@gmail.com"
                    >
                      accessemr@gmail.com
                    </Link>
                  </li>

                  <li>
                    <Link
                      className="hover:text-gray-900 transition"
                      to="tel:+2348169784022"
                    >
                      +2348169784022
                    </Link>
                  </li>
                </ul>
              </div>

              {/* Social Media */}
              {/* <div className="space-y-4">
                <h3 className="font-semibold text-xl text-gray-900">Social media</h3>

                <div className="flex items-center gap-5">
                  <a className="text-[#0B2A59] hover:opacity-70 transition" href="#">
                    <svg fill="currentColor" height="28" viewBox="0 0 24 24" width="28">
                      <path d="M18.36 2H21l-6.52 7.45L22 22h-6.99l-4.37-5.73L4.79 22H2l7.06-8.06L2 2h7l3.9 5.2L18.36 2z" />
                    </svg>
                  </a>

                  <a className="text-[#0B2A59] hover:opacity-70 transition" href="#">
                    <svg fill="none" height="28" stroke="currentColor" strokeWidth="1.7" viewBox="0 0 24 24" width="28">
                      <rect height="20" rx="6" width="20" x="2" y="2" />
                      <circle cx="12" cy="12" r="4" />
                      <circle cx="17" cy="7" r="1" />
                    </svg>
                  </a>

                  <a className="text-[#0B2A59] hover:opacity-70 transition" href="#">
                    <svg fill="currentColor" height="28" viewBox="0 0 32 32" width="28">
                      <path d="M16.02 3C9.38 3 4 8.38 4 15.02c0 2.65.87 5.1 2.36 7.1L4 29l7.11-2.29c1.9 1.04 4.07 1.63 6.38 1.63C22.66 28.34 28 23 28 16.36 28 9.72 22.66 4.38 16.02 4.38zm6.44 16.47c-.27.76-1.6 1.49-2.2 1.57-.56.08-1.27.11-2.05-.13-.47-.15-1.08-.35-1.86-.69-3.28-1.43-5.41-4.77-5.58-5-.16-.23-1.33-1.78-1.33-3.39 0-1.6.84-2.38 1.16-2.71.31-.33.68-.41.91-.41h.66c.21 0 .5-.08.78.6.27.69 1.09 2.57 1.19 2.76.1.18.16.4.03.63-.12.23-.19.4-.35.62-.18.21-.37.47-.52.63-.17.17-.35.35-.15.69.2.33.9 1.49 1.94 2.42 1.34 1.19 2.45 1.56 2.8 1.72.35.17.55.14.75-.09.2-.23.87-1.01 1.1-1.36.23-.35.46-.29.78-.17.33.12 2.07.97 2.43 1.15.36.18.6.27.7.42s.1.78-.17 1.53z" />
                    </svg>
                  </a>
                </div>
              </div> */}
            </div>
          </div>
        </div>
        <div className="">
          <StyleText className="font-bold text-[163px]/[180px] text-center text-[#EDEDED]">
            AccessEMR
          </StyleText>
        </div>
      </div>
    </div>
  );
};

export default Footer;
