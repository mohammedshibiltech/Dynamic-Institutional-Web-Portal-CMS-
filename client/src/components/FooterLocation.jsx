import React from 'react';
import { motion } from 'framer-motion';
import { collegeLocation } from '../config/location';

const FooterLocation = () => {
    return (
        <div className="flex flex-col space-y-4">
            <h3 className="text-lg font-bold text-white uppercase tracking-wider">Find Us</h3>

            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="relative h-48 w-full rounded-xl overflow-hidden group shadow-lg border border-white/10"
            >
                {/* Clickable Map Wrapper */}
                <a
                    href={collegeLocation.redirectUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full h-full relative"
                    title="Open Campus Location in Google Maps"
                >
                    {/* Overlay on hover */}
                    <div className="absolute inset-0 bg-dark/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 flex items-center justify-center">
                        <span className="bg-white/10 backdrop-blur-md border border-white/20 px-4 py-2 rounded-full text-xs text-white font-medium scale-90 group-hover:scale-100 transition-transform duration-300">
                            Click to Explore
                        </span>
                    </div>

                    <iframe
                        title="College of Engineering Adoor Campus Map"
                        src={collegeLocation.embedUrl}
                        className="w-full h-full border-0 grayscale brightness-75 group-hover:grayscale-0 group-hover:brightness-100 transition-all duration-500 pointer-events-none"
                        loading="lazy"
                    ></iframe>
                </a>
            </motion.div>

            <div className="pt-2">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-[10px] font-medium bg-green-500/10 text-green-400 border border-green-500/20">
                    <span className="w-1.5 h-1.5 bg-green-500 rounded-full mr-2 animate-pulse"></span>
                    Located in Adoor, Kerala
                </span>
            </div>
        </div>
    );
};

export default FooterLocation;
