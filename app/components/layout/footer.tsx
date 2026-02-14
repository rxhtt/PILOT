import {
  FacebookLogoIcon,
  InstagramLogoIcon,
  LinkedinLogoIcon,
  XLogoIcon,
} from "@phosphor-icons/react";
import { Image } from "@shopify/hydrogen";
import { useThemeSettings } from "@weaverse/hydrogen";
import { cva } from "class-variance-authority";
import { useFetcher } from "react-router";
import { Banner } from "~/components/banner";
import { Button } from "~/components/button";
import Link from "~/components/link";
import { useShopMenu } from "~/hooks/use-shop-menu";
import { cn } from "~/utils/cn";
import { CountrySelector } from "./country-selector";
import { FooterMenu } from "./menu/footer-menu";

const variants = cva("", {
  variants: {
    width: {
      full: "",
      stretch: "",
      fixed: "mx-auto max-w-(--page-width)",
    },
    padding: {
      full: "",
      stretch: "px-3 md:px-10 lg:px-16",
      fixed: "mx-auto px-3 md:px-4 lg:px-6",
    },
  },
});

export function Footer() {
  return (
    <footer className="w-full bg-black py-16 text-white border-t border-gray-800">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex flex-col items-center justify-center space-y-12">

          {/* Main Title Section */}
          <div className="text-center space-y-4">
            <h2 className="text-4xl md:text-6xl font-black tracking-tighter uppercase italic">
              PROJECT BY SMEETA
            </h2>
            <div className="h-1 w-24 bg-blue-600 mx-auto rounded-full"></div>
            <p className="max-w-2xl text-gray-400 text-lg mx-auto leading-relaxed">
              A high-performance e-commerce storefront developed as a final year academic project in computer science.
            </p>
          </div>

          {/* Stunning Credit Card */}
          <div className="w-full max-w-4xl bg-gradient-to-br from-gray-900 to-black border border-gray-800 rounded-3xl p-8 md:p-12 shadow-2xl relative overflow-hidden group">
            {/* Background Decorative Element */}
            <div className="absolute -right-20 -top-20 w-64 h-64 bg-blue-600/10 rounded-full blur-3xl group-hover:bg-blue-600/20 transition-all duration-500"></div>

            <div className="relative z-10 grid md:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <div>
                  <span className="text-blue-500 font-bold tracking-widest uppercase text-xs">Developed By</span>
                  <h3 className="text-3xl md:text-4xl font-bold mt-1 tracking-tight">SMEETA PANNAKAR</h3>
                </div>

                <div className="space-y-4 text-gray-300">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-gray-800 flex items-center justify-center border border-gray-700">🎓</div>
                    <div>
                      <p className="text-sm font-medium text-white">Academic Degree</p>
                      <p className="text-xs">BCA - Bachelor of Computer Applications</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-gray-800 flex items-center justify-center border border-gray-700">🏛️</div>
                    <div>
                      <p className="text-sm font-medium text-white">Institution</p>
                      <p className="text-xs">Government First Grade College, Dharwad</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-6 md:border-l md:border-gray-800 md:pl-12 text-sm">
                <div>
                  <span className="text-gray-500 font-medium">Student Registration ID</span>
                  <p className="text-lg font-mono text-blue-400 font-bold">U02AJ23S0440</p>
                </div>
                <div>
                  <span className="text-gray-500 font-medium">Contact Email</span>
                  <p className="font-medium hover:text-blue-400 transition-colors">smithapannakar704@gmail.com</p>
                </div>
                <div>
                  <span className="text-gray-500 font-medium">Project Designation</span>
                  <div className="mt-2 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
                    </span>
                    Final Year Major Project
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Minimal Bottom Bar */}
          <div className="w-full pt-8 border-t border-gray-900 flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-medium text-gray-500 uppercase tracking-widest">
            <p>© 2026 Smeeta Pannakar. All Rights Reserved.</p>
            <div className="flex gap-6">
              <span className="hover:text-white cursor-default transition-colors">React Router 7</span>
              <span className="hover:text-white cursor-default transition-colors">Shopify Hydrogen</span>
              <span className="hover:text-white cursor-default transition-colors">Tailwind v4</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
