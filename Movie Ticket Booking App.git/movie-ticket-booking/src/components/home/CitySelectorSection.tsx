/**
 * ==================================================
 * CitySelectorSection Component — Section 06
 * --------------------------------------------------
 * Interactive city localization with:
 * - Auto-detect city button (UI only)
 * - Search input for filtering
 * - City pill grid with cinema count
 * - Orange highlight for selected city
 * ==================================================
 */

import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Search, Navigation, ChevronRight } from 'lucide-react';
import SectionHeader from '../ui/SectionHeader';
import { CITIES } from '../../data/homeData';

/**
 * City selector section — allows users to select or search their city.
 */
const CitySelectorSection: React.FC = () => {
  const [selectedCity, setSelectedCity] = useState('Colombo');
  const [search, setSearch] = useState('');

  const filteredCities = useMemo(
    () => CITIES.filter((c) => c.name.toLowerCase().includes(search.toLowerCase())),
    [search]
  );

  const currentCity = CITIES.find((c) => c.name === selectedCity);

  return (
    <section className="py-20 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, #030712, #07111f, #030712)' }} />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">

          {/* Left: Header + search + action */}
          <div>
            <SectionHeader
              label="Find Nearby Cinemas"
              title="Select Your City"
              subtitle="Choose your city to discover cinemas, showtimes, and real-time seat availability near you."
            />

            {/* Search box */}
            <div className="relative mb-6">
              <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search your city..."
                className="w-full pl-11 pr-4 py-3.5 rounded-2xl text-white text-sm font-medium placeholder-slate-600 outline-none focus:ring-1 focus:ring-orange-500/40 transition-all"
                style={{
                  background: 'rgba(255,255,255,0.04)',
                  border: '1px solid rgba(255,255,255,0.10)',
                }}
                aria-label="Search city"
              />
            </div>

            {/* Auto-detect */}
            <motion.button
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.97 }}
              className="flex items-center gap-2 text-sm font-semibold text-orange-400 hover:text-orange-300 transition-colors mb-8"
              aria-label="Auto-detect my city"
            >
              <Navigation size={15} />
              Auto-detect my location
            </motion.button>

            {/* Selected city info */}
            {currentCity && (
              <motion.div
                key={selectedCity}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-4 p-5 rounded-2xl"
                style={{
                  background: 'rgba(255,77,0,0.08)',
                  border: '1px solid rgba(255,77,0,0.2)',
                }}
              >
                <span className="text-3xl">{currentCity.emoji}</span>
                <div className="flex-1">
                  <h3 className="text-white font-black text-lg">{currentCity.name}</h3>
                  <p className="text-slate-400 text-sm">
                    {currentCity.cinemasCount} cinemas available
                  </p>
                </div>
                <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-white text-sm font-bold transition-all"
                  style={{ background: 'linear-gradient(135deg, #FF4D00, #FF6A00)' }}>
                  Explore <ChevronRight size={14} />
                </button>
              </motion.div>
            )}
          </div>

          {/* Right: City grid */}
          <div>
            <AnimatePresence>
              <motion.div
                className="grid grid-cols-2 sm:grid-cols-3 gap-3"
                layout
              >
                {filteredCities.map((city, i) => (
                  <motion.button
                    key={city.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ delay: i * 0.04 }}
                    onClick={() => setSelectedCity(city.name)}
                    whileHover={{ y: -3, scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    className="relative flex flex-col items-center gap-2 p-4 rounded-2xl border transition-all duration-200"
                    style={
                      selectedCity === city.name
                        ? {
                            background: 'rgba(255,77,0,0.12)',
                            borderColor: 'rgba(255,77,0,0.4)',
                            boxShadow: '0 0 20px rgba(255,77,0,0.15)',
                          }
                        : {
                            background: 'rgba(255,255,255,0.03)',
                            borderColor: 'rgba(255,255,255,0.08)',
                          }
                    }
                    aria-pressed={selectedCity === city.name}
                  >
                    {city.isPopular && selectedCity !== city.name && (
                      <span className="absolute top-2 right-2 text-[9px] font-bold text-orange-400">★</span>
                    )}
                    <span className="text-2xl">{city.emoji}</span>
                    <span className={`font-bold text-sm ${selectedCity === city.name ? 'text-orange-400' : 'text-white'}`}>
                      {city.name}
                    </span>
                    <span className="text-slate-500 text-[11px]">
                      {city.cinemasCount} cinemas
                    </span>

                    {/* Selected indicator */}
                    {selectedCity === city.name && (
                      <motion.div
                        layoutId="city-selected"
                        className="absolute inset-0 rounded-2xl pointer-events-none"
                        style={{ border: '2px solid rgba(255,77,0,0.5)' }}
                      />
                    )}
                  </motion.button>
                ))}

                {filteredCities.length === 0 && (
                  <div className="col-span-3 text-center py-8 text-slate-500 text-sm">
                    <MapPin size={24} className="mx-auto mb-2 opacity-40" />
                    No cities found
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CitySelectorSection;
