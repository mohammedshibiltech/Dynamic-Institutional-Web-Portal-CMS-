import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import NewsTicker from '../components/NewsTicker';
import { placementData } from '../data/placementData.jsx';
import { motion, AnimatePresence } from 'framer-motion';
import { FaGraduationCap, FaBuilding, FaBriefcase, FaChartLine, FaEnvelope, FaChevronRight, FaChevronLeft } from 'react-icons/fa';
import api from '../api/axios';

const Placement = () => {
    const { stats, overview, team, recruiters } = placementData;
    const [slides, setSlides] = useState([]);
    const [currentSlide, setCurrentSlide] = useState(0);

    useEffect(() => {
        const fetchSlides = async () => {
            try {
                const res = await api.get('/placement-slides');
                if (res.data.length > 0) {
                    setSlides(res.data);
                }
            } catch (err) {
                console.error('Failed to fetch placement slides', err);
            }
        };
        fetchSlides();
    }, []);

    useEffect(() => {
        if (slides.length === 0) return;
        const interval = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % slides.length);
        }, 5000);
        return () => clearInterval(interval);
    }, [slides]);

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
                <section className="relative py-24 bg-primary dark:bg-gray-950 text-white overflow-hidden transition-colors duration-300">
                    <div className="absolute inset-0 opacity-15">
                        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-accent rounded-full translate-x-1/2 -translate-y-1/2 blur-[120px]"></div>
                        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-blue-400 rounded-full -translate-x-1/3 translate-y-1/3 blur-[100px]"></div>
                    </div>

                    <div className="container mx-auto px-6 relative z-10">
                        <div className="text-center max-w-4xl mx-auto mb-16">
                            <motion.h1
                                initial={{ y: -30, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                className="text-5xl md:text-7xl font-extrabold mb-6 tracking-tight"
                            >
                                Empowering Careers, <span className="text-accent">Shaping Futures</span>
                            </motion.h1>
                            <motion.p
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.2 }}
                                className="text-xl text-blue-100/90 leading-relaxed"
                            >
                                The Career Guidance and Placement Unit (CGPU) at CEA is dedicated to bridging the gap between talent and industry, ensuring our students reach their professional milestones.
                            </motion.p>
                        </div>

                        {/* Quick Stats */}
                        <motion.div
                            variants={containerVariants}
                            initial="hidden"
                            animate="visible"
                            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto"
                        >
                            {stats.map((stat, index) => (
                                <motion.div
                                    key={index}
                                    variants={itemVariants}
                                    className="bg-white/10 dark:bg-gray-800/40 backdrop-blur-xl border border-white/20 dark:border-white/5 p-8 rounded-[32px] text-center group hover:bg-white/20 dark:hover:bg-gray-800 transition-all duration-300"
                                >
                                    <div className={`w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br ${stat.color} flex items-center justify-center text-3xl shadow-lg ring-4 ring-white/10`}>
                                        {stat.icon}
                                    </div>
                                    <div className="text-4xl font-black mb-1">{stat.value}</div>
                                    <div className="text-blue-100/70 dark:text-gray-400 font-medium tracking-wide border-t border-white/10 dark:border-white/5 pt-2 mt-2 transition-colors">{stat.label}</div>
                                </motion.div>
                            ))}
                        </motion.div>
                    </div>
                </section>

                {/* Overview & Slider Section */}
                <section className="py-24 px-6 relative">
                    <div className="container mx-auto">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                            <motion.div
                                initial={{ x: -50, opacity: 0 }}
                                whileInView={{ x: 0, opacity: 1 }}
                                viewport={{ once: true }}
                            >
                                <span className="text-primary dark:text-accent font-bold tracking-widest uppercase text-sm mb-4 block transition-colors">About CGPU</span>
                                <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-8 leading-tight transition-colors">
                                    Your Gateway to <br />
                                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent dark:from-accent dark:to-blue-400">Corporate Excellence</span>
                                </h2>
                                <p className="text-lg text-gray-600 dark:text-gray-400 mb-8 leading-relaxed italic border-l-4 border-accent pl-6 bg-accent/5 dark:bg-accent/10 py-4 rounded-r-2xl transition-colors">
                                    "{overview.description}"
                                </p>
                                <div className="space-y-4">
                                    {overview.activities.map((activity, i) => (
                                        <div key={i} className="flex items-center gap-4 group">
                                            <div className="w-8 h-8 rounded-full bg-primary/10 dark:bg-accent/10 flex items-center justify-center text-primary dark:text-accent group-hover:bg-primary dark:group-hover:bg-accent group-hover:text-white dark:group-hover:text-dark transition-all">
                                                <FaChevronRight className="text-xs" />
                                            </div>
                                            <span className="text-gray-700 dark:text-gray-300 font-medium transition-colors">{activity}</span>
                                        </div>
                                    ))}
                                </div>
                            </motion.div>

                            {/* Image Slider Component */}
                            <motion.div
                                initial={{ x: 50, opacity: 0 }}
                                whileInView={{ x: 0, opacity: 1 }}
                                viewport={{ once: true }}
                                className="relative group"
                            >
                                <div className="aspect-[4/3] bg-gray-100 dark:bg-gray-800/50 rounded-[48px] overflow-hidden shadow-2xl relative transition-colors">
                                    <AnimatePresence mode="wait">
                                        {slides.length > 0 ? (
                                            <motion.img
                                                key={currentSlide}
                                                src={slides[currentSlide].image_url}
                                                alt={slides[currentSlide].title || "Placement Photo"}
                                                initial={{ opacity: 0, scale: 1.1 }}
                                                animate={{ opacity: 1, scale: 1 }}
                                                exit={{ opacity: 0, scale: 0.95 }}
                                                transition={{ duration: 0.8 }}
                                                className="w-full h-full object-cover"
                                            />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center bg-gray-200 dark:bg-gray-800 animate-pulse transition-colors">
                                                <FaChartLine className="text-6xl text-gray-400 dark:text-gray-600" />
                                            </div>
                                        )}
                                    </AnimatePresence>

                                    {/* Slider Controls */}
                                    {slides.length > 1 && (
                                        <>
                                            <button
                                                onClick={() => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)}
                                                className="absolute left-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/20 dark:bg-white/10 backdrop-blur-md text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white hover:text-primary dark:hover:bg-accent dark:hover:text-dark"
                                            >
                                                <FaChevronLeft />
                                            </button>
                                            <button
                                                onClick={() => setCurrentSlide((prev) => (prev + 1) % slides.length)}
                                                className="absolute right-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/20 dark:bg-white/10 backdrop-blur-md text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white hover:text-primary dark:hover:bg-accent dark:hover:text-dark"
                                            >
                                                <FaChevronRight />
                                            </button>
                                            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
                                                {slides.map((_, i) => (
                                                    <button
                                                        key={i}
                                                        onClick={() => setCurrentSlide(i)}
                                                        className={`h-1.5 rounded-full transition-all duration-300 ${i === currentSlide ? 'w-8 bg-accent' : 'w-2 bg-white/50'}`}
                                                    />
                                                ))}
                                            </div>
                                        </>
                                    )}
                                </div>
                                <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-accent rounded-full flex items-center justify-center text-white shadow-xl ring-8 ring-white dark:ring-dark z-20 transition-all">
                                    <FaChartLine className="text-4xl" />
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </section>

                {/* Team Section */}
                <section className="py-24 px-6 bg-gray-100/50 dark:bg-gray-900/30 transition-colors duration-300">
                    <div className="container mx-auto">
                        <div className="text-center mb-16">
                            <h2 className="text-4xl font-extrabold text-gray-900 dark:text-white mb-4 transition-colors">CGPU Coordinators</h2>
                            <div className="w-24 h-1.5 bg-accent mx-auto rounded-full mb-6"></div>
                            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto transition-colors">Connect with our dedicated faculty members who guide students through every step of the placement journey.</p>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                            {team.map((member, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ y: 30, opacity: 0 }}
                                    whileInView={{ y: 0, opacity: 1 }}
                                    transition={{ delay: index * 0.05 }}
                                    viewport={{ once: true }}
                                    className="glass-card group p-8 rounded-3xl hover:bg-white dark:hover:bg-gray-800 hover:shadow-2xl transition-all duration-300 border border-white dark:border-white/5"
                                >
                                    <div className="w-16 h-16 rounded-2xl bg-gray-100 dark:bg-gray-900/50 flex items-center justify-center text-primary dark:text-accent text-2xl mb-6 group-hover:bg-primary dark:group-hover:bg-accent group-hover:text-white dark:group-hover:text-dark transition-all">
                                        <FaGraduationCap />
                                    </div>
                                    <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-1 group-hover:text-primary dark:group-hover:text-accent transition-colors">{member.name}</h3>
                                    <p className="text-primary/60 dark:text-accent/60 font-semibold text-sm mb-3 transition-colors">{member.role}</p>
                                    <div className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest transition-colors">{member.department}</div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Recruiters Logos Grid */}
                <section className="py-24 px-6 overflow-hidden bg-white dark:bg-dark transition-colors duration-300">
                    <div className="container mx-auto">
                        <div className="text-center mb-16">
                            <h2 className="text-4xl font-extrabold text-gray-900 dark:text-white mb-4 transition-colors">Our Industry Partners</h2>
                            <p className="text-gray-500 dark:text-gray-400 transition-colors">CEA graduates are sought after by global leaders across various industries.</p>
                        </div>

                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-8">
                            {recruiters.map((recruiter, index) => (
                                <motion.div
                                    key={index}
                                    whileHover={{ scale: 1.05, y: -5 }}
                                    className="p-6 bg-gray-50 dark:bg-gray-800/40 rounded-3xl border border-gray-100 dark:border-white/5 flex flex-col items-center justify-center text-center group transition-all hover:bg-white dark:hover:bg-gray-800 hover:shadow-xl h-40"
                                >
                                    <div className="h-20 w-full flex items-center justify-center mb-4 p-2 transition-transform duration-500 group-hover:scale-110">
                                        <img
                                            src={recruiter.logo}
                                            alt={recruiter.name}
                                            className="max-h-full max-w-full object-contain dark:brightness-200 dark:grayscale dark:group-hover:grayscale-0 dark:group-hover:brightness-100 transition-all duration-500"
                                            onError={(e) => {
                                                e.target.style.display = 'none';
                                                e.target.nextSibling.style.display = 'flex';
                                            }}
                                        />
                                        <div className="hidden h-full w-full items-center justify-center text-lg font-bold text-primary dark:text-accent bg-primary/5 dark:bg-accent/5 rounded-xl transition-colors">
                                            {recruiter.name}
                                        </div>
                                    </div>
                                    <span className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-tighter group-hover:text-primary dark:group-hover:text-accent transition-colors">{recruiter.name}</span>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Contact CTA */}
                <section className="py-12 px-6">
                    <div className="container mx-auto">
                        <div className="bg-primary rounded-[48px] p-12 relative overflow-hidden text-center text-white shadow-2xl shadow-primary/30">
                            <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent"></div>
                            <div className="relative z-10 max-w-2xl mx-auto">
                                <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Start Your Career?</h2>
                                <p className="text-blue-100/80 mb-8">For recruitment queries and coordination, reach out to the CGPU office today.</p>
                                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                    <a
                                        href="mailto:cgpu@cea.ac.in"
                                        className="bg-accent text-white px-10 py-4 rounded-full font-bold flex items-center justify-center gap-3 hover:scale-105 transition-transform"
                                    >
                                        <FaEnvelope /> Contact CGPU
                                    </a>
                                    <button className="bg-white/10 backdrop-blur-md border border-white/20 text-white px-10 py-4 rounded-full font-bold hover:bg-white/20 transition-all">
                                        Download Placement Brochure
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
};

export default Placement;
