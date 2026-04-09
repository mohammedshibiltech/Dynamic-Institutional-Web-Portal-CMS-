import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import api from '../api/axios';
import { FaBullhorn } from 'react-icons/fa';

const Announcements = () => {
    const [announcements, setAnnouncements] = useState([]);

    useEffect(() => {
        api.get('/announcements')
            .then(res => setAnnouncements(res.data))
            .catch(err => console.error(err));
    }, []);

    const isNew = (date) => {
        const itemDate = new Date(date);
        const now = new Date();
        const diff = (now - itemDate) / (1000 * 60 * 60 * 24);
        return diff < 3;
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full h-full p-1"
        >
            <div className="backdrop-blur-xl bg-white/40 dark:bg-dark/40 border border-white/40 dark:border-white/10 rounded-[24px] shadow-2xl p-6 h-[500px] flex flex-col relative overflow-hidden group hover:shadow-primary/10 transition-all duration-500">
                {/* Decorative background blobs */}
                <div className="absolute -top-10 -right-10 w-32 h-32 bg-primary/5 rounded-full blur-2xl group-hover:bg-primary/10 transition-colors"></div>

                <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6 flex items-center gap-2 z-10 transition-colors">
                    <FaBullhorn className="text-primary dark:text-accent" /> Latest Announcements
                </h2>

                <div className="flex-grow overflow-y-auto custom-scrollbar z-10">
                    {announcements.length === 0 ? (
                        <p className="text-gray-500 dark:text-gray-400 text-center mt-10">No new announcements.</p>
                    ) : (
                        <div className="space-y-4">
                            {announcements.map((item) => (
                                <motion.div
                                    key={item.id}
                                    whileHover={{ x: 5 }}
                                    className="p-4 rounded-xl bg-white/60 dark:bg-dark/40 border border-white/70 dark:border-white/10 hover:bg-white/80 dark:hover:bg-dark/60 transition-all cursor-pointer relative overflow-hidden shadow-sm"
                                >
                                    <div className="flex flex-wrap gap-2 mb-2">
                                        {!!item.is_important && (
                                            <span className="px-2 py-0.5 bg-red-500 text-white text-[10px] font-bold rounded-full uppercase tracking-wider animate-pulse">
                                                Important
                                            </span>
                                        )}
                                        {!!isNew(item.created_at) && (
                                            <span className="px-2 py-0.5 bg-accent text-white text-[10px] font-bold rounded-full uppercase tracking-wider">
                                                New
                                            </span>
                                        )}
                                    </div>
                                    <h3 className="text-md font-bold text-gray-800 dark:text-white leading-tight transition-colors">{item.title}</h3>
                                    <p className="text-gray-700 dark:text-gray-300 text-xs mt-2 line-clamp-2 transition-colors">{item.description}</p>
                                    <span className="text-[10px] text-gray-500 dark:text-gray-400 mt-2 block font-medium">
                                        {new Date(item.created_at).toLocaleDateString(undefined, { day: 'numeric', month: 'short', year: 'numeric' })}
                                    </span>
                                </motion.div>
                            ))}
                        </div>
                    )}
                </div>

                {/* View All Button */}
                <div className="mt-4 pt-4 border-t border-white/20 z-10">
                    <Link to="/all-announcements">
                        <button className="w-full py-2 bg-primary text-white rounded-xl text-sm font-bold hover:bg-gray-800 transition-colors shadow-lg shadow-primary/20">
                            View All Announcements
                        </button>
                    </Link>
                </div>
            </div>
        </motion.div>
    );
};

export default Announcements;
