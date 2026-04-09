import React from 'react';
import { motion } from 'framer-motion';
import { otherLinks } from '../config/links';
import { FaExternalLinkSquareAlt } from 'react-icons/fa';

const OtherLinks = () => {
    return (
        <div className="flex flex-col space-y-4">
            <h3 className="text-lg font-bold text-white uppercase tracking-wider">Other Links</h3>

            <div className="grid grid-cols-1 gap-3">
                {otherLinks.map((link, index) => (
                    <motion.a
                        key={index}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        viewport={{ once: true }}
                        whileHover={{ x: 5, backgroundColor: 'rgba(255, 255, 255, 0.1)' }}
                        className="group flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm transition-all duration-300"
                    >
                        <div className="flex items-center space-x-3">
                            <div className="w-8 h-8 rounded-lg bg-white/10 p-1.5 flex items-center justify-center overflow-hidden group-hover:scale-110 transition-transform duration-300">
                                <img
                                    src={link.logo}
                                    alt={link.name}
                                    className="w-full h-full object-contain filter group-hover:scale-110 transition-all duration-300"
                                    loading="lazy"
                                    onError={(e) => {
                                        e.target.onerror = null;
                                        e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(link.name)}&background=003366&color=fff&size=64&bold=true`;
                                    }}
                                />
                            </div>
                            <span className="text-gray-300 text-sm font-medium group-hover:text-white transition-colors">
                                {link.name}
                            </span>
                        </div>
                        <FaExternalLinkSquareAlt className="text-gray-500 group-hover:text-accent opacity-0 group-hover:opacity-100 transition-all text-xs" />
                    </motion.a>
                ))}
            </div>
        </div>
    );
};

export default OtherLinks;
