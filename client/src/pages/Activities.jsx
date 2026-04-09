import React from 'react';
import Header from '../components/Header';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import NewsTicker from '../components/NewsTicker';
import { activitiesData } from '../data/activitiesData.jsx';
import { motion } from 'framer-motion';

const Activities = () => {
    // Safety check for activitiesData
    const majorActivities = activitiesData?.majorActivities || [];
    const departmentClubs = activitiesData?.departmentClubs || [];
    const studentClubs = activitiesData?.studentClubs || [];

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1
        }
    };

    return (
        <div className="flex flex-col min-h-screen bg-light dark:bg-dark transition-colors duration-300">
            <Header />
            <Navbar />
            <NewsTicker />

            <main className="flex-grow">
                {/* Hero Section */}
                <section className="relative py-20 bg-primary dark:bg-gray-950 text-white overflow-hidden transition-colors duration-300">
                    <div className="absolute inset-0 opacity-10">
                        <div className="absolute top-0 left-0 w-64 h-64 bg-white rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl"></div>
                        <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent rounded-full translate-x-1/3 translate-y-1/3 blur-3xl"></div>
                    </div>
                    <div className="container mx-auto px-6 relative z-10 text-center">
                        <motion.h1
                            initial={{ y: -20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            className="text-5xl md:text-6xl font-extrabold mb-6"
                        >
                            Campus Activities
                        </motion.h1>
                        <motion.p
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.2 }}
                            className="text-xl text-blue-100 dark:text-gray-300 max-w-3xl mx-auto transition-colors"
                        >
                            Explore the vibrant student life at our college. From technical societies to cultural clubs, discover where your passions belong.
                        </motion.p>
                    </div>
                </section>

                {/* Major Activities */}
                <section className="py-20 px-6">
                    <div className="container mx-auto">
                        <div className="mb-16 text-center">
                            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white mb-4 transition-colors">Major Organizations</h2>
                            <div className="w-20 h-1 bg-accent mx-auto rounded-full transition-colors"></div>
                        </div>

                        <motion.div
                            variants={containerVariants}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                        >
                            {majorActivities.map((activity) => (
                                <motion.div
                                    key={activity.id}
                                    variants={itemVariants}
                                    className="glass-card rounded-3xl shadow-xl overflow-hidden group hover:shadow-2xl transition-all duration-300 border border-white/40"
                                >
                                    <div className="h-48 overflow-hidden relative">
                                        <img src={activity.image} alt={activity.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                                        <div className={`absolute top-4 right-4 p-3 rounded-2xl bg-gradient-to-br ${activity.color} text-white text-2xl shadow-lg`}>
                                            {activity.icon}
                                        </div>
                                    </div>
                                    <div className="p-8">
                                        <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-4 tracking-tight leading-tight transition-colors">{activity.title}</h3>
                                        <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed transition-colors">{activity.content}</p>

                                        {activity.subActivities && activity.subActivities.length > 0 && (
                                            <div className="mt-4 pt-4 border-t border-gray-100 dark:border-white/10 transition-colors">
                                                <h4 className="text-sm font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-3">Key Initiatives</h4>
                                                <div className="flex flex-wrap gap-2">
                                                    {activity.subActivities.map(sub => (
                                                        <span key={sub.id} className="px-4 py-1.5 bg-white/50 dark:bg-gray-800/50 backdrop-blur-md text-gray-700 dark:text-gray-300 text-xs font-bold rounded-full border border-gray-100 dark:border-white/5 shadow-sm transition-colors">
                                                            {sub.title}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </motion.div>
                            ))}
                        </motion.div>
                    </div>
                </section>

                {/* Department Clubs */}
                <section className="py-20 px-6 bg-gray-100/50 dark:bg-gray-900/30 transition-colors duration-300">
                    <div className="container mx-auto">
                        <div className="mb-16 text-center">
                            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white mb-4 transition-colors">Department Clubs</h2>
                            <div className="w-20 h-1 bg-primary dark:bg-accent mx-auto rounded-full transition-colors"></div>
                        </div>

                        <motion.div
                            variants={containerVariants}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
                        >
                            {departmentClubs.map((club) => (
                                <motion.div
                                    key={club.id}
                                    variants={itemVariants}
                                    className="glass-card p-8 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 flex flex-col items-center text-center border border-white/50 dark:border-white/5"
                                >
                                    <div className={`mb-6 p-5 rounded-2xl bg-gradient-to-br ${club.color} text-white text-4xl shadow-lg ring-4 ring-white/50 dark:ring-white/10`}>
                                        {club.icon}
                                    </div>
                                    <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2 transition-colors">{club.title}</h3>
                                    <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed transition-colors">{club.content}</p>
                                </motion.div>
                            ))}
                        </motion.div>
                    </div>
                </section>

                {/* Student Clubs */}
                <section className="py-20 px-6">
                    <div className="container mx-auto text-center">
                        <div className="mb-16">
                            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white mb-4 transition-colors">Student Clubs</h2>
                            <div className="w-20 h-1 bg-accent mx-auto rounded-full transition-colors"></div>
                        </div>

                        <div className="flex flex-wrap justify-center gap-6">
                            {studentClubs.map((club, index) => (
                                <motion.div
                                    key={club.id}
                                    initial={{ scale: 0.8, opacity: 0 }}
                                    whileInView={{ scale: 1, opacity: 1 }}
                                    transition={{ delay: index * 0.1 }}
                                    whileHover={{ y: -5 }}
                                    className="flex flex-col items-center p-6 bg-white dark:bg-gray-800 rounded-3xl shadow-lg border border-gray-100 dark:border-white/5 w-40 transition-colors"
                                >
                                    <div className={`w-16 h-16 mb-4 rounded-2xl bg-gradient-to-br ${club.color} text-white flex items-center justify-center text-2xl shadow-inner`}>
                                        {club.icon}
                                    </div>
                                    <span className="font-bold text-gray-700 dark:text-gray-200 text-sm whitespace-nowrap transition-colors">{club.title.split(' ')[0]}</span>
                                    <span className="text-xs text-gray-400 dark:text-gray-500 mt-1 transition-colors">
                                        {club.title.includes('(')
                                            ? (club.title.match(/\(([^)]+)\)/)?.[1] || 'Club')
                                            : 'Club'}
                                    </span>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
};

export default Activities;
