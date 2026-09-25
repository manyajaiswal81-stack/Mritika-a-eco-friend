import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#24211D] text-[#D6CEBE] py-14 border-t border-[#3E3832]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-10 border-b border-[#3E3832]">
          
          <div className="md:col-span-5">
            <h3 className="text-2xl font-serif font-bold text-white tracking-tight">
              Mrittika
            </h3>
            <p className="mt-3 text-xs text-[#A89E92] leading-relaxed max-w-sm">
              The Living Archive of Ancient Indian Biodegradable Practices. 
              Documenting millennia-old material sciences rooted in reverence for the five cosmic elements and zero-waste living.
            </p>
            <div className="mt-4 text-[11px] text-[#8C8276] italic font-serif">
              &ldquo;न हि ज्ञानेन सदृशं पवित्रमिह विद्यते&rdquo; · There is nothing in this world as purifying as profound knowledge.
            </div>
          </div>

          <div className="md:col-span-3">
            <div className="text-xs uppercase tracking-widest font-semibold text-white mb-3">
              Core Traditions
            </div>
            <ul className="space-y-2 text-xs text-[#B8ADA0]">
              <li><a href="#practices" className="hover:text-white transition-colors">Earthen Kulhar Clay Cups</a></li>
              <li><a href="#practices" className="hover:text-white transition-colors">Stitched Sal & Palash Pattals</a></li>
              <li><a href="#practices" className="hover:text-white transition-colors">Medicinal Neem Datun Twigs</a></li>
              <li><a href="#practices" className="hover:text-white transition-colors">Soapnut Reetha Greywater Surfactants</a></li>
              <li><a href="#practices" className="hover:text-white transition-colors">Golden Jute Bast Fiber Sacks</a></li>
            </ul>
          </div>

          <div className="md:col-span-4">
            <div className="text-xs uppercase tracking-widest font-semibold text-white mb-3">
              Living Custodians
            </div>
            <p className="text-xs text-[#A89E92] leading-relaxed">
              Dedicated to over two million rural Indian potters (Kumhars), tribal forest leaf harvesters, 
              and traditional craft communities whose daily labor preserves circular living for humanity.
            </p>
            <div className="mt-4 text-xs text-[#8C8276]">
              Alluvial Clay · Forest Leaf · Neem Xylem · Bast Fiber · Natural Saponins
            </div>
          </div>

        </div>

        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-[#8C8276] gap-3">
          <div>
            Mrittika Living Archive &copy; {new Date().getFullYear()} · Preserving Classical Ecological Wisdom
          </div>
          <div className="flex items-center gap-4 text-xs">
            <a href="#practices" className="hover:text-white transition-colors">Practices</a>
            <span aria-hidden="true">·</span>
            <a href="#soil-simulator" className="hover:text-white transition-colors">Soil Simulator</a>
            <span aria-hidden="true">·</span>
            <a href="#impact-calculator" className="hover:text-white transition-colors">Impact Calculator</a>
          </div>
        </div>

      </div>
    </footer>
  );
};
