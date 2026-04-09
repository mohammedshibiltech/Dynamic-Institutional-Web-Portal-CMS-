import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaSitemap, FaLayerGroup, FaBed, FaBus, FaChevronRight, FaPhone, FaUser } from 'react-icons/fa';
import Header from '../components/Header';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import NewsTicker from '../components/NewsTicker';
import { institutionData } from '../data/institutionData.jsx';

const Institution = () => {
    const { structure, layout, hostels, bus } = institutionData;
    const [activeSection, setActiveSection] = useState('structure');

    const sections = [
        { id: 'structure', label: 'Structure', icon: <FaSitemap /> },
        { id: 'layout', label: 'Campus Layout', icon: <FaLayerGroup /> },
        { id: 'hostels', label: 'Hostels', icon: <FaBed /> },
        { id: 'bus', label: 'College Bus', icon: <FaBus /> }
    ];

    useEffect(() => {
        const handleScroll = () => {
            const offsets = sections.map(s => {
                const el = document.getElementById(s.id);
                return el ? { id: s.id, offset: el.offsetTop - 150 } : null;
            }).filter(Boolean);

            const scrollPos = window.scrollY;
            const current = offsets.reverse().find(o => scrollPos >= o.offset);
            if (current && current.id !== activeSection) {
                setActiveSection(current.id);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [activeSection]);

    const scrollTo = (id) => {
        const el = document.getElementById(id);
        if (el) {
            window.scrollTo({
                top: el.offsetTop - 100,
                behavior: 'smooth'
            });
        }
    };

    return (
        <div className="min-h-screen bg-light dark:bg-dark flex flex-col transition-colors duration-300">
            <Header />
            <Navbar />
            <NewsTicker />

            <main className="flex-grow">
                {/* Hero Section */}
                <section className="bg-primary dark:bg-gray-950 pt-24 pb-32 text-white relative overflow-hidden transition-colors duration-300">
                    <div className="absolute inset-0 opacity-10">
                        <div className="absolute top-0 left-0 w-96 h-96 bg-accent rounded-full -translate-x-1/2 -translate-y-1/2 blur-[100px]"></div>
                        <div className="absolute bottom-0 right-0 w-80 h-80 bg-blue-400 rounded-full translate-x-1/3 translate-y-1/3 blur-[80px]"></div>
                    </div>

                    <div className="container mx-auto px-6 relative z-10 text-center">
                        <motion.h1
                            initial={{ y: -20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            className="text-5xl md:text-7xl font-black mb-6 tracking-tight"
                        >
                            Our <span className="text-accent underline decoration-8 underline-offset-8">Institution</span>
                        </motion.h1>
                        <motion.p
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.2 }}
                            className="text-xl text-blue-100 max-w-3xl mx-auto leading-relaxed"
                        >
                            Discover the framework, facilities, and services that make College of Engineering Adoor a center of excellence.
                        </motion.p>
                    </div>
                </section>

                {/* Sticky Sub-nav */}
                <div className="sticky top-20 z-40 bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border-b border-gray-200 dark:border-white/5 shadow-sm transition-colors duration-300">
                    <div className="container mx-auto px-6">
                        <div className="flex overflow-x-auto no-scrollbar py-2 gap-4 md:justify-center">
                            {sections.map(section => (
                                <button
                                    key={section.id}
                                    onClick={() => scrollTo(section.id)}
                                    className={`flex items-center gap-2 px-6 py-3 rounded-full font-bold transition-all whitespace-nowrap ${activeSection === section.id
                                        ? 'bg-primary dark:bg-accent text-white dark:text-dark shadow-lg shadow-primary/20 scale-105'
                                        : 'text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'
                                        }`}
                                >
                                    <span className={activeSection === section.id ? 'text-accent' : 'text-primary'}>
                                        {section.icon}
                                    </span>
                                    {section.label}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Content Sections */}
                <div className="container mx-auto px-6 py-16 space-y-32">

                    {/* Structure Section */}
                    <section id="structure" className="scroll-mt-32">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                            <motion.div
                                initial={{ x: -30, opacity: 0 }}
                                whileInView={{ x: 0, opacity: 1 }}
                                viewport={{ once: true }}
                            >
                                <div className="flex items-center gap-4 mb-6">
                                    <div className="w-12 h-12 bg-primary/10 dark:bg-accent/10 rounded-2xl flex items-center justify-center text-primary dark:text-accent text-xl transition-colors">
                                        <FaSitemap />
                                    </div>
                                    <h2 className="text-4xl font-black text-gray-900 dark:text-white transition-colors">{structure.title}</h2>
                                </div>
                                <p className="text-gray-600 dark:text-gray-400 text-lg mb-8 leading-relaxed italic border-l-4 border-accent pl-6 bg-accent/5 dark:bg-accent/10 py-4 rounded-r-2xl transition-colors">
                                    {structure.description}
                                </p>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    {structure.hierarchy.map((item, i) => (
                                        <div key={i} className="flex items-center gap-3 p-4 bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-white/5 shadow-sm hover:border-primary/30 dark:hover:border-accent/30 transition-all group">
                                            <FaChevronRight className="text-xs text-accent group-hover:translate-x-1 transition-transform" />
                                            <span className="font-bold text-gray-700 dark:text-gray-300 transition-colors">{item}</span>
                                        </div>
                                    ))}
                                </div>
                            </motion.div>
                            <motion.div
                                initial={{ x: 30, opacity: 0 }}
                                whileInView={{ x: 0, opacity: 1 }}
                                viewport={{ once: true }}
                                className="relative"
                            >
                                <div className="p-4 bg-white dark:bg-gray-800 rounded-[40px] shadow-2xl border border-gray-100 dark:border-white/5 transition-colors">
                                    <img
                                        src={structure.image}
                                        alt="Structure"
                                        className="w-full rounded-[32px] shadow-inner dark:brightness-90"
                                        onError={(e) => { e.target.src = 'https://via.placeholder.com/800x600?text=Structure+Image'; }}
                                    />
                                </div>
                                <div className="absolute -bottom-6 -left-6 w-24 h-24 bg-accent rounded-full flex items-center justify-center text-white border-8 border-gray-50 dark:border-dark shadow-xl transition-all">
                                    <FaSitemap className="text-3xl" />
                                </div>
                            </motion.div>
                        </div>
                    </section>

                    {/* Layout Section */}
                    <section id="layout" className="scroll-mt-32">
                        <div className="text-center mb-16">
                            <div className="flex items-center justify-center gap-4 mb-4">
                                <FaLayerGroup className="text-3xl text-accent" />
                                <h2 className="text-4xl font-black text-gray-900 dark:text-white transition-colors">{layout.title}</h2>
                            </div>
                            <p className="text-gray-500 dark:text-gray-400 max-w-2xl mx-auto transition-colors">{layout.description}</p>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
                            {layout.sections.map((section, idx) => (
                                <motion.div
                                    key={idx}
                                    initial={{ y: 20, opacity: 0 }}
                                    whileInView={{ y: 0, opacity: 1 }}
                                    transition={{ delay: idx * 0.1 }}
                                    viewport={{ once: true }}
                                    className="bg-white dark:bg-gray-800/40 p-8 rounded-[32px] border border-gray-100 dark:border-white/5 shadow-xl hover:shadow-2xl transition-all"
                                >
                                    <h3 className="text-xl font-bold text-primary dark:text-accent mb-6 flex items-center gap-3 transition-colors">
                                        <div className="w-8 h-8 rounded-lg bg-primary/10 dark:bg-accent/10 flex items-center justify-center text-sm font-black transition-colors">
                                            {idx + 1}
                                        </div>
                                        {section.name}
                                    </h3>
                                    <ul className="space-y-4">
                                        {section.details.map((detail, i) => (
                                            <li key={i} className="flex items-start gap-4 group">
                                                <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-accent group-hover:scale-150 transition-transform"></div>
                                                <span className="text-gray-600 dark:text-gray-400 text-sm font-medium leading-tight transition-colors">{detail}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </motion.div>
                            ))}
                        </div>

                        <motion.div
                            initial={{ y: 50, opacity: 0 }}
                            whileInView={{ y: 0, opacity: 1 }}
                            viewport={{ once: true }}
                            className="p-8 bg-white dark:bg-gray-800 rounded-[48px] shadow-2xl shadow-black/5 border border-gray-100 dark:border-white/5 overflow-hidden transition-colors"
                        >
                            <img
                                src={layout.image}
                                alt="Layout"
                                className="w-full h-auto rounded-3xl"
                                onError={(e) => { e.target.src = 'https://via.placeholder.com/1200x600?text=Campus+Layout'; }}
                            />
                        </motion.div>
                    </section>

                    {/* Hostels Section */}
                    <section id="hostels" className="scroll-mt-32">
                        <div className="flex flex-col lg:flex-row gap-16 items-start">
                            <div className="lg:w-1/3">
                                <div className="sticky top-48">
                                    <h2 className="text-4xl font-black text-gray-900 dark:text-white mb-6 flex items-center gap-4 transition-colors">
                                        <FaBed className="text-primary dark:text-accent" /> {hostels.title}
                                    </h2>
                                    <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-8 transition-colors">{hostels.description}</p>
                                    <div className="space-y-4">
                                        <div className="p-6 bg-primary dark:bg-secondary text-white rounded-[32px] shadow-xl shadow-primary/20 transition-colors">
                                            <h4 className="font-bold mb-4 opacity-70 text-xs uppercase tracking-widest">In-charge Wardens</h4>
                                            {hostels.items.map((item, i) => (
                                                <div key={i} className="mb-4 last:mb-0 pb-4 last:pb-0 border-b last:border-0 border-white/10">
                                                    <div className="flex items-center gap-3 text-sm font-black mb-1">
                                                        <FaUser className="text-accent" /> {item.name}
                                                    </div>
                                                    <div className="flex items-center gap-3 text-xs opacity-80 pl-6">
                                                        <FaPhone /> {item.warden}
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="lg:w-2/3 space-y-12">
                                {hostels.items.map((item, idx) => (
                                    <motion.div
                                        key={idx}
                                        initial={{ x: 30, opacity: 0 }}
                                        whileInView={{ x: 0, opacity: 1 }}
                                        viewport={{ once: true }}
                                        className="bg-white dark:bg-gray-800 rounded-[48px] overflow-hidden border border-gray-100 dark:border-white/5 shadow-xl group transition-colors"
                                    >
                                        <div className="grid grid-cols-1 md:grid-cols-2 h-full">
                                            <div className="p-10 flex flex-col justify-center">
                                                <h3 className="text-2xl font-black text-gray-900 dark:text-white mb-4 transition-colors">{item.name}</h3>
                                                <p className="text-gray-500 dark:text-gray-400 leading-relaxed italic border-l-4 border-primary dark:border-accent pl-4 transition-colors">
                                                    {item.description}
                                                </p>
                                            </div>
                                            <div className="grid grid-cols-2 gap-2 p-4 bg-gray-50 dark:bg-gray-900/50 h-[300px] transition-colors">
                                                {item.images.map((img, i) => (
                                                    <img
                                                        key={i}
                                                        src={img}
                                                        alt={`${item.name} ${i + 1}`}
                                                        className={`w-full h-full object-cover rounded-2xl shadow-lg transition-transform duration-700 group-hover:scale-105 dark:brightness-75 ${item.images.length === 1 ? 'col-span-2' : ''}`}
                                                        onError={(e) => { e.target.src = 'https://via.placeholder.com/400x300'; }}
                                                    />
                                                ))}
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </section>

                    {/* Bus Section */}
                    <section id="bus" className="scroll-mt-32">
                        <div className="bg-white dark:bg-gray-800 rounded-[64px] border border-gray-100 dark:border-white/5 shadow-2xl overflow-hidden relative transition-colors">
                            <div className="absolute top-0 right-0 w-96 h-96 bg-accent opacity-5 blur-[100px] -translate-y-1/2 translate-x-1/2"></div>
                            <div className="grid grid-cols-1 lg:grid-cols-2">
                                <div className="p-12 lg:p-20 order-2 lg:order-1">
                                    <div className="flex items-center gap-4 mb-8">
                                        <div className="w-16 h-16 bg-primary dark:bg-gray-950 rounded-[24px] flex items-center justify-center text-white text-3xl shadow-lg transition-colors">
                                            <FaBus />
                                        </div>
                                        <div>
                                            <h2 className="text-4xl font-black text-gray-900 dark:text-white transition-colors">{bus.title}</h2>
                                            <span className="text-accent font-bold text-sm tracking-widest uppercase transition-colors">PTA Managed Service</span>
                                        </div>
                                    </div>
                                    <p className="text-gray-600 dark:text-gray-400 text-lg leading-relaxed mb-10 italic transition-colors">
                                        "{bus.description}"
                                    </p>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-12">
                                        {bus.details.map((detail, i) => (
                                            <div key={i} className="flex items-center gap-4 p-5 bg-gray-50 dark:bg-gray-900/50 rounded-3xl group hover:bg-primary dark:hover:bg-accent transition-all duration-300 shadow-sm border border-gray-100 dark:border-white/5 transition-colors">
                                                <div className="w-10 h-10 rounded-2xl bg-white dark:bg-gray-800 flex items-center justify-center text-primary dark:text-accent group-hover:text-accent dark:group-hover:text-dark shadow-sm transition-all">
                                                    <FaChevronRight className="text-xs" />
                                                </div>
                                                <span className="text-sm font-bold text-gray-700 dark:text-gray-300 group-hover:text-white dark:group-hover:text-dark transition-colors">{detail}</span>
                                            </div>
                                        ))}
                                    </div>
                                    <a
                                        href={bus.guidelinePdf}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="w-full bg-primary dark:bg-accent text-white dark:text-dark py-6 rounded-3xl font-black text-lg tracking-wider hover:scale-[1.02] active:scale-95 transition-all shadow-xl shadow-primary/20 dark:shadow-accent/20 flex items-center justify-center gap-4 group"
                                    >
                                        <FaBus className="text-accent group-hover:rotate-12 transition-transform" />
                                        GET SERVICE GUIDELINES
                                    </a>
                                </div>
                                <div className="p-8 bg-gray-50 dark:bg-gray-900/50 flex flex-col gap-4 order-1 lg:order-2 transition-colors">
                                    <div className="grid grid-cols-2 gap-4 h-full">
                                        {bus.images.map((img, i) => (
                                            <div key={i} className="relative rounded-[32px] overflow-hidden shadow-2xl aspect-[3/4]">
                                                <img
                                                    src={img}
                                                    alt={`Bus ${i + 1}`}
                                                    className="w-full h-full object-cover transform hover:scale-110 transition-transform duration-1000"
                                                    onError={(e) => { e.target.src = 'https://via.placeholder.com/400x600'; }}
                                                />
                                                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default Institution;
