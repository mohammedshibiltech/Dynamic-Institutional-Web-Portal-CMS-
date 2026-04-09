import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import api from '../api/axios';
import { FaBullhorn, FaArrowLeft, FaCalendarAlt } from 'react-icons/fa';

const AllAnnouncements = () => {
    const [announcements, setAnnouncements] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        api.get('/announcements')
            .then(res => {
                setAnnouncements(res.data);
                setLoading(false);
            })
            .catch(err => {
                console.error(err);
                setLoading(false);
            });
    }, []);

    const isNew = (date) => {
        const itemDate = new Date(date);
        const now = new Date();
        const diff = (now - itemDate) / (1000 * 60 * 60 * 24);
        return diff < 3;
    };

    return (
        <div className="min-h-screen bg-light dark:bg-dark flex flex-col transition-colors duration-300">
            <Navbar />

            <main className="flex-grow container mx-auto px-4 md:px-6 py-12">
                <div className="max-w-5xl mx-auto">
                    {/* Header */}
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
                        <div>
                            <Link to="/" className="inline-flex items-center gap-2 text-primary dark:text-accent font-bold hover:text-secondary transition-colors mb-4 group transition-colors">
                                <FaArrowLeft className="group-hover:-translate-x-1 transition-transform" />
                                Back to Home
                            </Link>
                            <h1 className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white tracking-tight transition-colors">
                                Official <span className="text-primary dark:text-accent text-glow">Announcements</span>
                            </h1>
                            <p className="text-gray-500 dark:text-gray-400 mt-4 text-lg max-w-2xl font-medium transition-colors">
                                Stay updated with the latest news, notices, and official updates from the College of Engineering Adoor.
                            </p>
                        </div>
                        <div className="p-6 bg-white dark:bg-gray-800 rounded-3xl shadow-xl shadow-primary/5 border border-gray-100 dark:border-white/5 flex items-center gap-4 transition-colors">
                            <div className="w-12 h-12 bg-primary/10 dark:bg-accent/10 rounded-2xl flex items-center justify-center text-primary dark:text-accent text-2xl transition-colors">
                                <FaBullhorn />
                            </div>
                            <div>
                                <div className="text-2xl font-black text-primary dark:text-accent transition-colors">{announcements.length}</div>
                                <div className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest transition-colors">Total Updates</div>
                            </div>
                        </div>
                    </div>

                    {loading ? (
                        <div className="flex items-center justify-center py-20">
                            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
                        </div>
                    ) : announcements.length === 0 ? (
                        <div className="bg-white dark:bg-gray-800 rounded-[32px] p-20 text-center shadow-2xl shadow-black/5 border border-gray-100 dark:border-white/5 transition-colors">
                            <div className="text-gray-200 dark:text-gray-700 text-8xl mb-6 transition-colors">
                                <FaBullhorn />
                            </div>
                            <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-2 transition-colors">No announcements found</h3>
                            <p className="text-gray-500 dark:text-gray-400 transition-colors">Check back later for official updates.</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {announcements.map((item, index) => (
                                <motion.div
                                    key={item.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.05 }}
                                    className="bg-white dark:bg-gray-800 rounded-[32px] p-8 shadow-xl shadow-black/5 border border-gray-100 dark:border-white/5 hover:border-primary/20 dark:hover:border-accent/20 hover:shadow-primary/5 transition-all group relative overflow-hidden"
                                >
                                    {/* Decorative background number */}
                                    <div className="absolute -bottom-10 -right-10 text-9xl font-black text-gray-50 dark:text-gray-900/50 opacity-10 dark:opacity-20 select-none group-hover:text-primary/5 dark:group-hover:text-accent/5 transition-colors">
                                        {index + 1}
                                    </div>

                                    <div className="relative z-10">
                                        <div className="flex flex-wrap gap-2 mb-6">
                                            {item.is_important && (
                                                <span className="px-3 py-1 bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 text-[10px] font-black rounded-full uppercase tracking-widest border border-red-200 dark:border-red-900/50 shadow-sm animate-pulse transition-colors">
                                                    Critical Notification
                                                </span>
                                            )}
                                            {isNew(item.created_at) && (
                                                <span className="px-3 py-1 bg-accent/20 dark:bg-accent/10 text-accent text-[10px] font-black rounded-full uppercase tracking-widest border border-accent/20 dark:border-accent/10 transition-colors">
                                                    New Update
                                                </span>
                                            )}
                                            <div className="flex items-center gap-2 text-gray-400 dark:text-gray-500 text-[10px] font-black uppercase tracking-widest ml-auto transition-colors">
                                                <FaCalendarAlt />
                                                {new Date(item.created_at).toLocaleDateString(undefined, { day: 'numeric', month: 'short', year: 'numeric' })}
                                            </div>
                                        </div>

                                        <h3 className="text-2xl font-bold text-gray-900 dark:text-white group-hover:text-primary dark:group-hover:text-accent transition-colors leading-tight mb-4">
                                            {item.title}
                                        </h3>

                                        <p className="text-gray-600 dark:text-gray-400 leading-relaxed font-medium transition-colors">
                                            {item.description}
                                        </p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    )}
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default AllAnnouncements;
