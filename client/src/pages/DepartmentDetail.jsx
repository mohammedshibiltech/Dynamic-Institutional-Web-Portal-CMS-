import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Header from '../components/Header';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import NewsTicker from '../components/NewsTicker';
import { departmentData } from '../data/departmentData';
import { motion, AnimatePresence } from 'framer-motion';
import { FaEnvelope, FaPhone, FaFileAlt, FaInfoCircle, FaBullseye, FaFlask, FaUsers, FaAward, FaChevronRight, FaBullhorn, FaSpinner, FaImage, FaPlus, FaBook } from 'react-icons/fa';

import api from '../api/axios';

const UpdatingPlaceholder = ({ title, description }) => (
    <div className="flex flex-col items-center justify-center py-20 bg-gray-50 dark:bg-gray-800/50 rounded-3xl border-2 border-dashed border-gray-200 dark:border-white/10 transition-colors">
        <div className="relative mb-8">
            <div className="w-24 h-24 rounded-full border-4 border-primary/20 dark:border-accent/20 border-t-primary dark:border-t-accent animate-spin"></div>
            <FaSpinner className="absolute inset-0 m-auto text-4xl text-primary/40 dark:text-accent/40" />
        </div>
        <h2 className="text-3xl font-bold text-primary dark:text-accent mb-2">{title}</h2>
        <p className="text-gray-500 dark:text-gray-400 font-medium text-lg max-w-md text-center">
            {description || "This section is currently being updated. Please check back soon for the latest information."}
        </p>
        <div className="mt-8 flex gap-2">
            <span className="w-2 h-2 rounded-full bg-primary dark:bg-accent animate-bounce" style={{ animationDelay: '0s' }}></span>
            <span className="w-2 h-2 rounded-full bg-primary dark:bg-accent animate-bounce" style={{ animationDelay: '0.2s' }}></span>
            <span className="w-2 h-2 rounded-full bg-primary dark:bg-accent animate-bounce" style={{ animationDelay: '0.4s' }}></span>
        </div>
    </div>
);

const DepartmentDetail = () => {
    const { id } = useParams();
    const dept = departmentData[id];
    const [activeSection, setActiveSection] = useState('about');
    const [notices, setNotices] = useState([]);
    const [loadingNotices, setLoadingNotices] = useState(false);

    useEffect(() => {
        if (activeSection === 'notices') {
            setLoadingNotices(true);
            api.get(`/dept-notices/${id}`)
                .then(res => {
                    setNotices(res.data);
                    setLoadingNotices(false);
                })
                .catch(err => {
                    console.error(err);
                    setLoadingNotices(false);
                });
        }
    }, [activeSection, id]);

    const isNewNotice = (date) => {
        const itemDate = new Date(date);
        const now = new Date();
        const diff = (now - itemDate) / (1000 * 60 * 60 * 24);
        return diff < 3;
    };

    if (!dept) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-light dark:bg-dark transition-colors duration-300">
                <h1 className="text-4xl font-bold text-primary dark:text-accent mb-4">Department Not Found</h1>
                <Link to="/department" className="text-secondary dark:text-blue-400 hover:underline">Back to Departments</Link>
            </div>
        );
    }

    const sections = [
        { id: 'about', label: 'About', icon: <FaInfoCircle /> },
        { id: 'vision', label: 'Vision & Mission', icon: <FaBullseye /> },
        { id: 'outcomes', label: 'PEO / PSO / PO', icon: <FaAward /> },
        { id: 'notices', label: 'Notice Board', icon: <FaBullhorn /> },
        { id: 'programmes', label: 'Programmes Offered', icon: <FaFileAlt /> },
        { id: 'faculty', label: 'Faculty & Staff', icon: <FaUsers /> },
        { id: 'labs', label: 'Laboratories', icon: <FaFlask /> },
        { id: 'activities', label: 'Activities', icon: <FaUsers /> },
        { id: 'research', label: 'Research & Consultancy', icon: <FaFileAlt /> },
        { id: 'resources', label: 'Learning Resources', icon: <FaFileAlt /> },
        { id: 'syllabus', label: 'Syllabus', icon: <FaBook /> },
    ];

    return (
        <div className="flex flex-col min-h-screen bg-light dark:bg-dark transition-colors duration-300">
            <Header />
            <Navbar />
            <NewsTicker />

            <main className="flex-grow">
                {/* Hero section */}
                <div className="relative h-[300px] md:h-[400px] flex items-center overflow-hidden transition-colors duration-300">
                    <div className="absolute inset-0 bg-primary/90 dark:bg-gray-950/90 z-10 transition-colors"></div>
                    <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&q=80')] bg-cover bg-center"></div>

                    <div className="container mx-auto px-6 relative z-20 text-white">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                        >
                            <nav className="flex items-center gap-2 text-sm text-gray-300 mb-4">
                                <Link to="/" className="hover:text-white transition-colors">Home</Link>
                                <FaChevronRight className="text-[10px]" />
                                <Link to="/department" className="hover:text-white transition-colors">Departments</Link>
                                <FaChevronRight className="text-[10px]" />
                                <span className="text-white">{dept.name}</span>
                            </nav>
                            <h1 className="text-4xl md:text-6xl font-bold mb-4 tracking-tight drop-shadow-lg">
                                {dept.fullName}
                            </h1>
                            <div className="w-24 h-1.5 bg-accent rounded-full mb-6"></div>
                        </motion.div>
                    </div>
                </div>

                <div className="container mx-auto px-6 -mt-10 pb-20 relative z-30">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

                        {/* Left Sidebar: Navigation & HOD */}
                        <div className="lg:col-span-4 space-y-8">
                             {/* Desktop Nav */}
                            <div className="glass-card p-4 rounded-3xl hidden lg:block overflow-hidden dark:bg-gray-800/40 dark:border-white/5 transition-colors">
                                {sections.map((section) => (
                                    <button
                                        key={section.id}
                                        onClick={() => setActiveSection(section.id)}
                                        className={`w-full flex items-center gap-4 px-6 py-4 rounded-2xl font-semibold transition-all duration-300 ${activeSection === section.id
                                            ? 'bg-primary dark:bg-accent text-white dark:text-dark shadow-lg'
                                            : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'}`}
                                    >
                                        <span className="text-lg">{section.icon}</span>
                                        {section.label}
                                    </button>
                                ))}
                            </div>

                            {/* Mobile Nav (Select or horizontal scroll) */}
                            <div className="lg:hidden flex gap-2 overflow-x-auto pb-4 no-scrollbar">
                                {sections.map((section) => (
                                    <button
                                        key={section.id}
                                        onClick={() => setActiveSection(section.id)}
                                        className={`whitespace-nowrap flex items-center gap-3 px-6 py-3 rounded-full font-semibold transition-all ${activeSection === section.id
                                            ? 'bg-primary dark:bg-accent text-white dark:text-dark'
                                            : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-400 shadow-sm'}`}
                                    >
                                        {section.label}
                                    </button>
                                ))}
                            </div>

                             {/* HOD Card */}
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.2 }}
                                className="glass-card p-8 rounded-3xl text-center dark:bg-gray-800/40 dark:border-white/5 transition-colors"
                            >
                                <div className="relative inline-block mb-6">
                                    <div className="w-32 h-32 rounded-3xl overflow-hidden ring-4 ring-primary/10 dark:ring-accent/10 shadow-xl mx-auto">
                                        <img src={dept.hod.image} alt={dept.hod.name} className="w-full h-full object-cover" />
                                    </div>
                                    <div className="absolute -bottom-2 -right-2 p-2 bg-accent rounded-xl text-primary dark:text-dark shadow-lg ring-4 ring-white dark:ring-gray-800 transition-colors">
                                        <FaAward />
                                    </div>
                                </div>
                                <h3 className="text-xl font-bold text-dark dark:text-white mb-1 transition-colors">{dept.hod.name}</h3>
                                <p className="text-secondary dark:text-blue-400 font-medium mb-6 transition-colors">{dept.hod.designation}</p>

                                <div className="space-y-4 text-left border-t border-gray-100 dark:border-white/5 pt-6 transition-colors">
                                    <a href={`mailto:${dept.hod.email}`} className="flex items-center gap-4 text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-accent transition-colors">
                                        <div className="p-2 rounded-lg bg-gray-50 dark:bg-gray-700 text-primary dark:text-accent transition-colors"><FaEnvelope /></div>
                                        <span className="text-sm truncate">{dept.hod.email}</span>
                                    </a>
                                    <a href={`tel:${dept.hod.phone}`} className="flex items-center gap-4 text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-accent transition-colors">
                                        <div className="p-2 rounded-lg bg-gray-50 dark:bg-gray-700 text-primary dark:text-accent transition-colors"><FaPhone /></div>
                                        <span className="text-sm">{dept.hod.phone}</span>
                                    </a>
                                    <button className="w-full mt-4 bg-primary/5 dark:bg-accent/5 text-primary dark:text-accent font-bold py-3 rounded-xl hover:bg-primary dark:hover:bg-accent hover:text-white dark:hover:text-dark transition-all duration-300 flex items-center justify-center gap-2">
                                        <FaFileAlt className="text-sm" /> View Full Profile
                                    </button>
                                </div>
                            </motion.div>
                        </div>

                        {/* Right Content Area */}
                        <div className="lg:col-span-8 min-h-[600px]">
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={activeSection}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -20 }}
                                    transition={{ duration: 0.4 }}
                                    className="glass-card p-8 md:p-12 rounded-3xl h-full shadow-inner bg-white/60 dark:bg-gray-800/20 dark:border-white/5 transition-colors"
                                >
                                    {activeSection === 'about' && (
                                        <div className="space-y-6">
                                            <h2 className="text-3xl font-bold text-primary dark:text-accent flex items-center gap-4 transition-colors">
                                                <FaInfoCircle className="text-secondary dark:text-blue-400" />
                                                Overview
                                            </h2>
                                            <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-lg transition-colors">
                                                {dept.about}
                                            </p>
                                            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-10">
                                                {[
                                                    { label: "Faculty", count: "15+" },
                                                    { label: "Students", count: "240+" },
                                                    { label: "Labs", count: dept.labs.length },
                                                    { label: "Legacy", count: "25+ Yrs" }
                                                ].map((stat, i) => (
                                                    <div key={i} className="text-center p-4 rounded-2xl bg-primary/5 dark:bg-accent/5 transition-colors">
                                                        <div className="text-2xl font-bold text-primary dark:text-accent transition-colors">{stat.count}</div>
                                                        <div className="text-xs text-gray-500 dark:text-gray-400 uppercase font-semibold transition-colors">{stat.label}</div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                    {activeSection === 'vision' && (
                                        <div className="space-y-12">
                                            {(!dept.vision?.length && !dept.mission?.length) ? (
                                                <UpdatingPlaceholder title="Vision & Mission" />
                                            ) : (
                                                <>
                                                    {dept.vision?.length > 0 && (
                                                        <div>
                                                            <h2 className="text-3xl font-bold text-primary dark:text-accent flex items-center gap-4 mb-6 transition-colors">
                                                                <FaBullseye className="text-secondary dark:text-blue-400" /> Vision
                                                            </h2>
                                                            <ul className="space-y-4">
                                                                {dept.vision.map((v, i) => (
                                                                    <li key={i} className="flex gap-4 items-start bg-blue-50/50 dark:bg-blue-900/10 p-4 rounded-xl transition-colors">
                                                                        <FaChevronRight className="mt-1 text-primary dark:text-accent text-xs flex-shrink-0 transition-colors" />
                                                                        <span className="text-gray-700 dark:text-gray-300 font-medium transition-colors">{v}</span>
                                                                    </li>
                                                                ))}
                                                            </ul>
                                                        </div>
                                                    )}
                                                    {dept.mission?.length > 0 && (
                                                        <div>
                                                            <h2 className="text-3xl font-bold text-primary dark:text-accent flex items-center gap-4 mb-6 transition-colors">
                                                                <FaAward className="text-secondary dark:text-blue-400" /> Mission
                                                            </h2>
                                                            <ul className="space-y-4">
                                                                {dept.mission.map((m, i) => (
                                                                    <li key={i} className="flex items-center gap-4 text-gray-700 dark:text-gray-300 font-medium p-3 hover:bg-gray-50 dark:hover:bg-gray-700/50 rounded-lg transition-colors border-l-4 border-accent">
                                                                        {m}
                                                                    </li>
                                                                ))}
                                                            </ul>
                                                        </div>
                                                    )}
                                                </>
                                            )}
                                        </div>
                                    )}

                                    {activeSection === 'outcomes' && (
                                        <div className="space-y-12">
                                            {(!dept.peo?.length && !dept.pso?.length && !dept.po?.length) ? (
                                                <UpdatingPlaceholder title="Programme Outcomes" />
                                            ) : (
                                                <>
                                                    {/* PEO Section */}
                                                    {dept.peo && dept.peo.length > 0 && (
                                                        <div>
                                                            <h2 className="text-2xl font-bold text-white dark:text-dark bg-primary dark:bg-accent p-4 rounded-t-2xl mb-0 text-center tracking-wide uppercase transition-colors">
                                                                Programme Educational Objectives (PEO)
                                                            </h2>
                                                            <div className="border border-gray-100 dark:border-white/5 rounded-b-2xl overflow-hidden shadow-sm transition-colors">
                                                                {dept.peo.map((p, i) => (
                                                                    <div key={i} className={`flex gap-6 p-6 ${i % 2 === 0 ? 'bg-white dark:bg-gray-800/40' : 'bg-gray-50/50 dark:bg-gray-900/40'} transition-colors`}>
                                                                        <span className="font-bold text-primary dark:text-accent min-w-[60px] transition-colors">{p.id}</span>
                                                                        <p className="text-gray-700 dark:text-gray-300 leading-relaxed transition-colors">{p.text}</p>
                                                                    </div>
                                                                ))}
                                                            </div>
                                                        </div>
                                                    )}

                                                    {/* PSO Section */}
                                                    {dept.pso && dept.pso.length > 0 && (
                                                        <div>
                                                            <h2 className="text-2xl font-bold text-white dark:text-dark bg-primary dark:bg-accent p-4 rounded-t-2xl mb-0 text-center tracking-wide uppercase transition-colors">
                                                                Program Specific Outcomes (PSO)
                                                            </h2>
                                                            <div className="border border-gray-100 dark:border-white/5 rounded-b-2xl overflow-hidden shadow-sm transition-colors">
                                                                {dept.pso.map((p, i) => (
                                                                    <div key={i} className={`flex gap-6 p-6 ${i % 2 === 0 ? 'bg-white dark:bg-gray-800/40' : 'bg-gray-50/50 dark:bg-gray-900/40'} transition-colors`}>
                                                                        <span className="font-bold text-primary dark:text-accent min-w-[60px] transition-colors">{p.id}</span>
                                                                        <p className="text-gray-700 dark:text-gray-300 leading-relaxed transition-colors">{p.text}</p>
                                                                    </div>
                                                                ))}
                                                            </div>
                                                        </div>
                                                    )}

                                                    {/* PO Section */}
                                                    {dept.po && dept.po.length > 0 && (
                                                        <div>
                                                            <h2 className="text-2xl font-bold text-white dark:text-dark bg-primary dark:bg-accent p-4 rounded-t-2xl mb-0 text-center tracking-wide uppercase transition-colors">
                                                                Programme Objectives (PO)
                                                            </h2>
                                                            <div className="border border-gray-100 dark:border-white/5 rounded-b-2xl overflow-hidden shadow-sm transition-colors">
                                                                {dept.po.map((p, i) => (
                                                                    <div key={i} className={`flex gap-6 p-6 ${i % 2 === 0 ? 'bg-white dark:bg-gray-800/40' : 'bg-gray-50/50 dark:bg-gray-900/40'} transition-colors`}>
                                                                        <span className="font-bold text-primary dark:text-accent min-w-[60px] transition-colors">{p.id}</span>
                                                                        <div className="text-gray-700 dark:text-gray-300 leading-relaxed transition-colors">
                                                                            {p.title && <span className="font-bold block mb-1">{p.title}:</span>}
                                                                            {p.text}
                                                                        </div>
                                                                    </div>
                                                                ))}
                                                            </div>
                                                        </div>
                                                    )}
                                                </>
                                            )}
                                        </div>
                                    )}

                                    {activeSection === 'notices' && (

                                        <div className="space-y-6">
                                            <div className="flex justify-between items-center mb-4">
                                                <h2 className="text-3xl font-bold text-primary dark:text-accent flex items-center gap-4 transition-colors">
                                                    <FaBullhorn className="text-secondary dark:text-blue-400" /> Notice Board
                                                </h2>
                                            </div>

                                            {loadingNotices ? (
                                                <div className="flex flex-col items-center justify-center py-20 space-y-4">
                                                    <FaSpinner className="text-4xl text-primary dark:text-accent animate-spin" />
                                                    <p className="text-gray-500 dark:text-gray-400 font-medium transition-colors">Loading notices...</p>
                                                </div>
                                            ) : notices.length === 0 ? (
                                                <div className="text-center py-20 bg-gray-50 dark:bg-gray-800/50 rounded-3xl border-2 border-dashed border-gray-200 dark:border-white/10 transition-colors">
                                                    <FaBullhorn className="text-5xl text-gray-300 dark:text-gray-700 mx-auto mb-4 transition-colors" />
                                                    <p className="text-gray-500 dark:text-gray-400 font-medium text-lg transition-colors">No notices posted for this department yet.</p>
                                                </div>
                                            ) : (
                                                <div className="grid gap-4">
                                                    {notices.map((notice, index) => (
                                                        <motion.div
                                                            key={notice.id}
                                                            initial={{ opacity: 0, x: -20 }}
                                                            animate={{ opacity: 1, x: 0 }}
                                                            transition={{ delay: index * 0.1 }}
                                                            className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-white/5 hover:border-primary/30 dark:hover:border-accent/30 hover:shadow-md transition-all group relative overflow-hidden"
                                                        >
                                                            {/* Background Decoration */}
                                                            <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 dark:bg-accent/5 rounded-bl-full -mr-12 -mt-12 group-hover:bg-primary/10 dark:group-hover:bg-accent/10 transition-colors"></div>

                                                            <div className="relative z-10">
                                                                <div className="flex flex-wrap gap-2 mb-3">
                                                                    {!!notice.is_important && (
                                                                        <span className="px-3 py-1 bg-red-500 text-white text-[10px] font-bold rounded-full uppercase tracking-wider animate-pulse flex items-center gap-1 transition-colors">
                                                                            Important
                                                                        </span>
                                                                    )}

                                                                    {isNewNotice(notice.created_at) && (
                                                                        <span className="px-3 py-1 bg-accent dark:bg-accent text-white dark:text-dark text-[10px] font-bold rounded-full uppercase tracking-wider transition-colors">
                                                                            New
                                                                        </span>
                                                                    )}
                                                                    <span className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400 text-[10px] font-bold rounded-full uppercase tracking-wider transition-colors">
                                                                        {new Date(notice.created_at).toLocaleDateString(undefined, { day: 'numeric', month: 'short', year: 'numeric' })}
                                                                    </span>
                                                                </div>

                                                                <h3 className="text-xl font-bold text-gray-800 dark:text-white group-hover:text-primary dark:group-hover:text-accent transition-colors mb-2">
                                                                    {notice.title}
                                                                </h3>
                                                                <p className="text-gray-600 dark:text-gray-400 leading-relaxed whitespace-pre-wrap transition-colors">
                                                                    {notice.description}
                                                                </p>
                                                            </div>
                                                        </motion.div>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                    )}


                                    {activeSection === 'programmes' && (
                                        <div className="space-y-8">
                                            <h2 className="text-3xl font-bold text-primary dark:text-accent flex items-center gap-4 mb-8 transition-colors">
                                                <FaFileAlt className="text-secondary dark:text-blue-400" /> Programmes Offered
                                            </h2>

                                            {!dept.programmes || dept.programmes.length === 0 ? (
                                                <UpdatingPlaceholder title="Programmes" />
                                            ) : (
                                                <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl overflow-hidden border border-gray-100 dark:border-white/5 transition-colors">
                                                    <div className="overflow-x-auto">
                                                        <table className="w-full text-left border-collapse">
                                                            <thead>
                                                                <tr className="bg-primary dark:bg-accent text-white dark:text-dark transition-colors">
                                                                    <th className="p-6 text-sm font-bold uppercase tracking-widest pl-10">UG</th>
                                                                    <th className="p-6 text-sm font-bold uppercase tracking-widest text-right pr-10">INTAKE</th>
                                                                </tr>
                                                            </thead>
                                                            <tbody className="divide-y divide-gray-100 dark:divide-white/5 transition-colors">
                                                                {dept.programmes.map((prog, index) => (
                                                                    <tr key={index} className="hover:bg-gray-50/50 dark:hover:bg-gray-700/30 transition-colors">
                                                                        <td className="p-6 pl-10 text-gray-700 dark:text-gray-300 font-medium transition-colors">{prog.course}</td>
                                                                        <td className="p-6 text-right pr-10 font-bold text-primary dark:text-accent transition-colors">{prog.intake}</td>
                                                                    </tr>
                                                                ))}
                                                            </tbody>
                                                        </table>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    )}

                                    {activeSection === 'faculty' && (
                                        <UpdatingPlaceholder title="Faculty and Staff" description="The faculty and staff details are currently being updated. Please check back soon for the latest information." />
                                    )}

                                    {activeSection === 'labs' && (
                                        <div className="space-y-8">
                                            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                                                <h2 className="text-3xl font-bold text-primary dark:text-accent transition-colors">Specialized Laboratories</h2>
                                                {dept.labAmenitiesPdf && (
                                                    <a
                                                        href={dept.labAmenitiesPdf.startsWith('http') ? dept.labAmenitiesPdf : `http://localhost:5000${dept.labAmenitiesPdf}`}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="inline-flex items-center gap-2 bg-secondary dark:bg-blue-600 text-white px-6 py-3 rounded-2xl font-bold hover:bg-secondary/90 dark:hover:bg-blue-500 transition-all shadow-lg hover:shadow-xl active:scale-95 transition-colors"
                                                    >
                                                        <FaFileAlt />
                                                        Download Lab Amenities PDF
                                                    </a>
                                                )}
                                            </div>
                                            {!dept.labs || dept.labs.length === 0 ? (
                                                <UpdatingPlaceholder title="Laboratories" />
                                            ) : (
                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                    {dept.labs.map((lab, i) => {
                                                        const LabCard = (
                                                            <div className={`p-6 rounded-3xl border border-gray-100 dark:border-white/5 transition-all duration-300 group h-full ${lab.fileUrl ? 'hover:border-primary/40 dark:hover:border-accent/40 hover:shadow-xl cursor-pointer bg-white dark:bg-gray-800' : 'hover:border-primary/20 dark:hover:border-accent/20 hover:shadow-lg bg-gray-50/30 dark:bg-gray-900/10'} transition-colors`}>
                                                                <div className="w-12 h-12 rounded-2xl bg-blue-50 dark:bg-accent/10 text-primary dark:text-accent flex items-center justify-center mb-4 group-hover:bg-primary dark:group-hover:bg-accent group-hover:text-white dark:group-hover:text-dark transition-colors">
                                                                    <span className="font-bold">{i + 1}</span>
                                                                </div>
                                                                <h4 className="text-xl font-bold text-dark dark:text-white mb-2 group-hover:text-primary dark:group-hover:text-accent transition-colors">{lab.name}</h4>
                                                                <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed transition-colors">{lab.description}</p>
                                                                {lab.fileUrl && (
                                                                    <div className="mt-4 flex items-center gap-2 text-primary dark:text-accent font-bold text-sm opacity-0 group-hover:opacity-100 transition-opacity">
                                                                        <FaFileAlt /> View Documentation
                                                                    </div>
                                                                )}
                                                            </div>
                                                        );

                                                        if (lab.fileUrl) {
                                                            return (
                                                                <a
                                                                    key={i}
                                                                    href={lab.fileUrl.startsWith('http') ? lab.fileUrl : `http://localhost:5000${lab.fileUrl}`}
                                                                    target="_blank"
                                                                    rel="noopener noreferrer"
                                                                    className="block no-underline"
                                                                >
                                                                    {LabCard}
                                                                </a>
                                                            );
                                                        }

                                                        return <div key={i}>{LabCard}</div>;
                                                    })}
                                                </div>
                                            )}

                                            {/* Lab Photo Gallery */}
                                            {dept.labPhotos && dept.labPhotos.length > 0 && (
                                                <div className="mt-16 pt-16 border-t border-gray-100 dark:border-white/5 transition-colors">
                                                    <h3 className="text-2xl font-bold text-primary dark:text-accent mb-8 flex items-center gap-3 transition-colors">
                                                        <FaImage className="text-secondary dark:text-blue-400" /> Lab Photo Gallery
                                                    </h3>
                                                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                                                        {dept.labPhotos.map((photo, index) => (
                                                            <motion.div
                                                                key={index}
                                                                whileHover={{ scale: 1.05 }}
                                                                className="aspect-square rounded-2xl overflow-hidden shadow-sm border border-gray-100 dark:border-white/5 group relative cursor-pointer transition-colors"
                                                            >
                                                                <img
                                                                    src={photo.startsWith('http') ? photo : `http://localhost:5000${photo}`}
                                                                    alt={`Lab ${index + 1}`}
                                                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                                                    onError={(e) => {
                                                                        e.target.src = 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&q=80';
                                                                        e.target.parentElement.classList.add('opacity-50');
                                                                    }}
                                                                />
                                                                <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                                                    <FaPlus className="text-white text-xl" />
                                                                </div>
                                                            </motion.div>
                                                        ))}
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    )}


                                    {activeSection === 'activities' && (
                                        <div className="space-y-8">
                                            <h2 className="text-3xl font-bold text-primary dark:text-accent mb-8 transition-colors">Departmental Activities</h2>
                                            {!dept.activities || dept.activities.length === 0 ? (
                                                <UpdatingPlaceholder title="Activities" />
                                            ) : (
                                                <div className="space-y-6">
                                                    {dept.activities.map((act, i) => (
                                                        <div key={i} className="flex flex-col md:flex-row gap-6 p-6 rounded-3xl bg-gradient-to-r from-gray-50 to-white dark:from-gray-800 dark:to-gray-900 border border-gray-100 dark:border-white/5 items-center transition-colors">
                                                            <div className="w-20 h-20 rounded-2xl bg-primary/10 dark:bg-accent/10 flex items-center justify-center text-3xl text-primary dark:text-accent font-bold transition-colors">
                                                                {act.name.charAt(0)}
                                                            </div>
                                                            <div className="flex-grow text-center md:text-left">
                                                                <h4 className="text-xl font-bold text-primary dark:text-accent mb-1 transition-colors">{act.name}</h4>
                                                                <p className="text-gray-600 dark:text-gray-400 transition-colors">{act.description}</p>
                                                            </div>
                                                            <button className="px-6 py-2 rounded-full border border-primary dark:border-accent text-primary dark:text-accent font-semibold hover:bg-primary dark:hover:bg-accent hover:text-white dark:hover:text-dark transition-colors">
                                                                Explore
                                                            </button>
                                                        </div>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                    )}

                                    {activeSection === 'research' && (
                                        <div className="space-y-8">
                                            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                                                <h2 className="text-3xl font-bold text-primary dark:text-accent transition-colors">Research & Consultancy</h2>
                                                {dept.researchConsultancy?.fileUrl && (
                                                    <a
                                                        href={dept.researchConsultancy.fileUrl.startsWith('http') ? dept.researchConsultancy.fileUrl : `http://localhost:5000${dept.researchConsultancy.fileUrl}`}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="inline-flex items-center gap-2 bg-secondary dark:bg-blue-600 text-white px-6 py-3 rounded-2xl font-bold hover:bg-secondary/90 dark:hover:bg-blue-500 transition-all shadow-lg hover:shadow-xl active:scale-95 transition-colors"
                                                    >
                                                        <FaFileAlt />
                                                        Download Research & Consultancy PDF
                                                    </a>
                                                )}
                                            </div>
                                            {!dept.researchConsultancy?.description ? (
                                                <UpdatingPlaceholder title="Research & Consultancy" />
                                            ) : (
                                                <div className="glass-card p-8 rounded-3xl bg-primary/5 dark:bg-accent/5 border border-primary/10 dark:border-white/5 transition-colors">
                                                    <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-lg whitespace-pre-wrap transition-colors">
                                                        {dept.researchConsultancy.description}
                                                    </p>
                                                </div>
                                            )}
                                        </div>
                                    )}

                                    {activeSection === 'resources' && (
                                        <div className="space-y-8">
                                            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                                                <h2 className="text-3xl font-bold text-primary dark:text-accent transition-colors">Learning Resources</h2>
                                                {dept.learningResources?.fileUrl && (
                                                    <a
                                                        href={dept.learningResources.fileUrl.startsWith('http') ? dept.learningResources.fileUrl : `http://localhost:5000${dept.learningResources.fileUrl}`}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="inline-flex items-center gap-2 bg-secondary dark:bg-blue-600 text-white px-6 py-3 rounded-2xl font-bold hover:bg-secondary/90 dark:hover:bg-blue-500 transition-all shadow-lg hover:shadow-xl active:scale-95 transition-colors"
                                                    >
                                                        <FaFileAlt />
                                                        Download Learning Resources PDF
                                                    </a>
                                                )}
                                            </div>
                                            {!dept.learningResources?.description ? (
                                                <UpdatingPlaceholder title="Learning Resources" />
                                            ) : (
                                                <div className="glass-card p-8 rounded-3xl bg-primary/5 dark:bg-accent/5 border border-primary/10 dark:border-white/5 transition-colors">
                                                    <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-lg whitespace-pre-wrap transition-colors">
                                                        {dept.learningResources.description}
                                                    </p>
                                                </div>
                                            )}
                                        </div>
                                    )}

                                    {activeSection === 'syllabus' && (
                                        <div className="space-y-8">
                                            <div className="flex items-center gap-4 mb-8">
                                                <div className="p-3 rounded-2xl bg-secondary/10 dark:bg-accent/10 text-secondary dark:text-accent text-3xl shadow-inner transition-colors">
                                                    <FaBook />
                                                </div>
                                                <h2 className="text-3xl font-bold text-primary dark:text-accent transition-colors">Academic Syllabus</h2>
                                            </div>

                                            <div className="glass-card p-8 md:p-12 rounded-[40px] bg-primary/5 dark:bg-accent/5 border border-primary/10 dark:border-white/5 transition-colors overflow-hidden relative">
                                                {/* Decorative background element */}
                                                <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/3 w-64 h-64 bg-primary/10 dark:bg-accent/10 blur-[80px] rounded-full pointer-events-none transition-colors"></div>

                                                <div className="relative z-10">
                                                    <p className="text-xl text-gray-600 dark:text-gray-300 font-medium mb-10 max-w-2xl leading-relaxed transition-colors">
                                                        Access the comprehensive KTU B.Tech curriculum. Please select your respective scheme to view or download the detailed syllabus.
                                                    </p>

                                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                        <a
                                                            href="https://www.ktunotes.in/ktu-btech-2019-syllabus/"
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="group flex flex-col items-start p-8 bg-white dark:bg-gray-800 rounded-3xl border border-gray-100 dark:border-white/5 shadow-xl hover:shadow-2xl hover:bg-primary dark:hover:bg-accent transition-all duration-500 transform hover:-translate-y-2 group transition-colors"
                                                        >
                                                            <div className="p-4 rounded-xl bg-primary/10 dark:bg-accent/10 text-primary dark:text-accent mb-6 group-hover:bg-white/20 group-hover:text-white dark:group-hover:text-dark transition-all">
                                                                <FaFileAlt className="text-2xl" />
                                                            </div>
                                                            <h3 className="text-2xl font-black text-gray-900 dark:text-white mb-2 group-hover:text-white dark:group-hover:text-dark transition-colors">2019 Scheme</h3>
                                                            <p className="text-gray-500 dark:text-gray-400 font-bold text-xs uppercase tracking-widest group-hover:text-white/80 dark:group-hover:text-dark/80 transition-colors">B.Tech Curriculum</p>
                                                            <div className="mt-8 flex items-center gap-2 text-primary dark:text-accent font-black text-xs uppercase tracking-widest group-hover:text-white dark:group-hover:text-dark transition-colors">
                                                                View Syllabus <FaChevronRight className="group-hover:translate-x-1 transition-transform" />
                                                            </div>
                                                        </a>

                                                        <a
                                                            href="https://www.ktunotes.in/ktu-btech-syllabus-2024-scheme/"
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="group flex flex-col items-start p-8 bg-white dark:bg-gray-800 rounded-3xl border border-gray-100 dark:border-white/5 shadow-xl hover:shadow-2xl hover:bg-secondary dark:hover:bg-white transition-all duration-500 transform hover:-translate-y-2 group transition-colors"
                                                        >
                                                            <div className="p-4 rounded-xl bg-secondary/10 dark:bg-white/10 text-secondary dark:text-white mb-6 group-hover:bg-white/20 group-hover:text-white dark:group-hover:text-dark transition-all">
                                                                <FaFileAlt className="text-2xl" />
                                                            </div>
                                                            <h3 className="text-2xl font-black text-gray-900 dark:text-white mb-2 group-hover:text-white dark:group-hover:text-dark transition-colors">2024 Scheme</h3>
                                                            <p className="text-gray-500 dark:text-gray-400 font-bold text-xs uppercase tracking-widest group-hover:text-white/80 dark:group-hover:text-dark/80 transition-colors">New B.Tech Curriculum</p>
                                                            <div className="mt-8 flex items-center gap-2 text-secondary dark:text-white font-black text-xs uppercase tracking-widest group-hover:text-white dark:group-hover:text-dark transition-colors">
                                                                View Syllabus <FaChevronRight className="group-hover:translate-x-1 transition-transform" />
                                                            </div>
                                                        </a>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </motion.div>
                            </AnimatePresence>
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default DepartmentDetail;
