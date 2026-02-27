import { Link } from "react-router-dom";
import TMLogo from "./TMLogo";

function Footer() {
  return (
    <footer className="bg-gray-100 mt-16 border-t">
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-2 gap-10">
        
        {/* Brand */}
        <div>
          <TMLogo className="w-auto h-10" />
          <p className="text-sm text-gray-600 mb-4">
            The best toys for kids & collectors. 
            Quality, fun and fast delivery.
          </p>

          {/* Social Icons */}
          <div className="flex gap-5">
            
            {/* LinkedIn */}
            <a href="#" className="text-gray-600 hover:text-blue-700 transition-colors">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 16 16"
                className="w-5 h-5 hover:scale-110 transition-transform"
              >
                <path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854zM4.943 13.394V6.169H2.542v7.225zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248S2.4 3.226 2.4 3.934c0 .694.521 1.248 1.327 1.248zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016l.016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225z"/>
              </svg>
            </a>

            {/* Instagram */}
            <a href="#" className="text-gray-600 hover:text-pink-600 transition-colors">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 16 16"
                className="w-5 h-5 hover:scale-110 transition-transform"
              >
                <path d="M8 0C5.829 0 5.555.01 4.703.048 3.85.086 3.27.222 2.76.39c-.53.175-.98.41-1.43.86-.45.45-.685.9-.86 1.43-.168.51-.304 1.09-.342 1.943C.01 5.555 0 5.829 0 8c0 2.171.01 2.445.048 3.297.038.853.174 1.433.342 1.943.175.53.41.98.86 1.43.45.45.9.685 1.43.86.51.168 1.09.304 1.943.342C5.555 15.99 5.829 16 8 16c2.171 0 2.445-.01 3.297-.048.853-.038 1.433-.174 1.943-.342.53-.175.98-.41 1.43-.86.45-.45.685-.9.86-1.43.168-.51.304-1.09.342-1.943.038-.852.048-1.126.048-3.297 0-2.171-.01-2.445-.048-3.297-.038-.853-.174-1.433-.342-1.943-.175-.53-.41-.98-.86-1.43-.45-.45-.9-.685-1.43-.86-.51-.168-1.09-.304-1.943-.342C10.445.01 10.171 0 8 0zm0 3.993a4.007 4.007 0 110 8.014 4.007 4.007 0 010-8.014zm4.406-.406a.94.94 0 110 1.88.94.94 0 010-1.88z"/>
              </svg>
            </a>

            {/* Facebook */}
            <a href="#" className="text-gray-600 hover:text-blue-600 transition-colors">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 16 16"
                className="w-5 h-5 hover:scale-110 transition-transform"
              >
                <path d="M8.94 6.5H7.5V5.5c0-.414.336-.75.75-.75H9V2.5H8.25C6.455 2.5 5 3.955 5 5.75V6.5H3.75V9H5v6h2.5V9h1.688l.252-2.5z"/>
              </svg>
            </a>

          </div>
        </div>

        {/* Contact */}
        <div>
          <h4 className="font-semibold mb-3">Contact</h4>
          <ul className="space-y-2 text-sm text-gray-600">
            <li> contact@toymarket.com</li>
            <li> +49 123 456 789</li>
            <li> Neunkirchen, Germany</li>
          </ul>
        </div>
      </div>

      {/* Bottom */}
      <div className="border-t py-4 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} ToyMarket. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;