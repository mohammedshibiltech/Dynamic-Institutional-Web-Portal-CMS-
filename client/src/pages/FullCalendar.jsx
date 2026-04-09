import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import api from '../api/axios';
import { FaCalendarAlt, FaArrowLeft, FaClock, FaMapMarkerAlt, FaTimes, FaExternalLinkAlt } from 'react-icons/fa';

const FullCalendar = () => {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedEvent, setSelectedEvent] = useState(null);

    useEffect(() => {
        api.get('/events')
            .then(res => {
                setEvents(res.data);
                setLoading(false);
            })
            .catch(err => {
                console.error(err);
                setLoading(false);
            });
    }, []);

    const getDateParts = (dateString) => {
        const date = new Date(dateString);
        return {
            day: date.getDate(),
            month: date.toLocaleString('default', { month: 'short' }).toUpperCase(),
            year: date.getFullYear(),
            time: date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
    };

    return (
        <div className="min-h-screen bg-light dark:bg-dark flex flex-col transition-colors duration-300">
            <Navbar />

            <main className="flex-grow container mx-auto px-4 md:px-6 py-12">
                <div className="max-w-6xl mx-auto">
                    {/* Header Section */}
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16 px-4">
                        <div className="space-y-4">
                            <Link to="/" className="inline-flex items-center gap-2 text-primary dark:text-accent font-bold hover:text-secondary dark:hover:text-white transition-colors group transition-colors">
                                <FaArrowLeft className="group-hover:-translate-x-1 transition-transform" />
                                Back to Home
                            </Link>
                            <h1 className="text-5xl md:text-6xl font-black text-gray-900 dark:text-white tracking-tight leading-none transition-colors">
                                Event <span className="text-primary dark:text-accent tracking-tighter">Calendar</span>
                            </h1>
                            <p className="text-gray-500 dark:text-gray-400 text-lg max-w-xl font-medium transition-colors">
                                Discover academic workshops, seminars, cultural fests, and sports meets. Stay ahead with our comprehensive schedule.
                            </p>
                        </div>
                        <div className="hidden lg:flex items-center gap-6 p-6 bg-white dark:bg-gray-800 rounded-[40px] shadow-2xl shadow-primary/5 border border-gray-100 dark:border-white/5 transition-colors">
                            <div className="flex -space-x-3">
                                {[1, 2, 3, 4].map(i => (
                                    <div key={i} className={`w-12 h-12 rounded-full border-4 border-white dark:border-gray-900 bg-gray-200 dark:bg-gray-700 transition-transform hover:-translate-y-1 cursor-pointer overflow-hidden`}>
                                        <img src={`https://i.pravatar.cc/150?u=${i}`} alt="user" />
                                    </div>
                                ))}
                            </div>
                            <div>
                                <div className="text-sm font-black text-gray-900 dark:text-white leading-tight transition-colors">Join 2000+ Students</div>
                                <div className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest transition-colors">Attending Events Weekly</div>
                            </div>
                        </div>
                    </div>

                    {loading ? (
                        <div className="flex items-center justify-center py-20">
                            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
                        </div>
                    ) : events.length === 0 ? (
                        <div className="bg-white dark:bg-gray-800 rounded-[40px] p-24 text-center shadow-2xl shadow-black/5 border border-gray-100 dark:border-white/5 transition-colors">
                            <FaCalendarAlt className="mx-auto text-8xl text-gray-100 dark:text-gray-700 mb-8 transition-colors" />
                            <h3 className="text-3xl font-black text-gray-900 dark:text-white mb-4 transition-colors">No Events Scheduled</h3>
                            <p className="text-gray-500 dark:text-gray-400 text-lg mb-8 max-w-sm mx-auto transition-colors">Our teams are busy planning exciting activities. Please check back next week!</p>
                            <Link to="/" className="inline-flex items-center gap-3 px-8 py-4 bg-primary dark:bg-accent text-white dark:text-dark rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-secondary dark:hover:bg-white transition-all shadow-xl shadow-primary/20 dark:shadow-accent/20">
                                Return to Homepage
                            </Link>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {events.map((event, index) => {
                                const { day, month, year, time } = getDateParts(event.event_date);
                                return (
                                    <motion.div
                                        key={event.id}
                                        initial={{ opacity: 0, scale: 0.95 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{ delay: index * 0.1 }}
                                        whileHover={{ y: -10 }}
                                        className="bg-white dark:bg-gray-800/40 rounded-[40px] overflow-hidden shadow-xl shadow-black/5 border border-gray-100 dark:border-white/5 group flex flex-col h-full transition-colors"
                                    >
                                        <div className="relative h-56 overflow-hidden">
                                            {event.image_url ? (
                                                <img src={event.image_url} alt={event.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                                            ) : (
                                                <div className="w-full h-full bg-primary/5 dark:bg-accent/5 flex items-center justify-center text-primary/20 dark:text-accent/20 text-7xl font-black transition-colors">CEA</div>
                                            )}
                                            <div className="absolute top-6 left-6 flex flex-col items-center bg-white/90 dark:bg-gray-900/90 backdrop-blur-md rounded-2xl p-3 min-w-[60px] shadow-xl border border-white/40 dark:border-white/10 transition-colors">
                                                <span className="text-2xl font-black text-primary dark:text-accent leading-none transition-colors">{day}</span>
                                                <span className="text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest mt-1 transition-colors">{month}</span>
                                            </div>
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent translate-y-full group-hover:translate-y-0 transition-transform duration-500 flex items-end p-8">
                                                <button onClick={() => setSelectedEvent(event)} className="w-full py-4 bg-white dark:bg-accent text-primary dark:text-dark rounded-2xl text-xs font-black uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-primary dark:hover:bg-white hover:text-white dark:hover:text-dark transition-colors">
                                                    Event Details <FaExternalLinkAlt />
                                                </button>
                                            </div>
                                        </div>
                                        <div className="p-8 flex flex-col flex-grow">
                                            <div className="flex items-center gap-4 text-xs font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-4 transition-colors">
                                                <span className="flex items-center gap-2 text-secondary"><FaClock /> {time}</span>
                                                {event.location && <span className="flex items-center gap-2"><FaMapMarkerAlt /> {event.location}</span>}
                                            </div>
                                            <h3 className="text-2xl font-black text-gray-900 dark:text-white leading-tight mb-4 group-hover:text-primary dark:group-hover:text-accent transition-colors cursor-pointer" onClick={() => setSelectedEvent(event)}>
                                                {event.title}
                                            </h3>
                                            <p className="text-gray-500 dark:text-gray-400 font-medium leading-relaxed line-clamp-3 mb-6 transition-colors">
                                                {event.description}
                                            </p>
                                            <button onClick={() => setSelectedEvent(event)} className="mt-auto text-primary dark:text-accent font-black text-xs uppercase tracking-widest flex items-center gap-3 border-t border-gray-50 dark:border-white/5 pt-6 hover:gap-5 transition-all">
                                                Read More <FaArrowLeft className="rotate-180" />
                                            </button>
                                        </div>
                                    </motion.div>
                                );
                            })}
                        </div>
                    )}
                </div>
            </main>

            <Footer />

            {/* Event Details Modal (Simplified from widget but integrated) */}
            <AnimatePresence>
                {selectedEvent && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm" onClick={() => setSelectedEvent(null)}>
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 20 }}
                            className="bg-white dark:bg-gray-800 rounded-[40px] shadow-2xl w-full max-w-3xl overflow-hidden border border-white/10 dark:border-white/5 transition-colors"
                            onClick={e => e.stopPropagation()}
                        >
                            <div className="relative h-80">
                                {selectedEvent.image_url ? (
                                    <img src={selectedEvent.image_url} alt={selectedEvent.title} className="w-full h-full object-cover" />
                                ) : (
                                    <div className="w-full h-full bg-primary dark:bg-secondary flex items-center justify-center text-white text-8xl font-black transition-colors">CEA</div>
                                )}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                                <button onClick={() => setSelectedEvent(null)} className="absolute top-8 right-8 p-3 bg-white/10 hover:bg-white/30 backdrop-blur-xl rounded-full text-white transition-all">
                                    <FaTimes size={20} />
                                </button>
                                <div className="absolute bottom-10 left-10 right-10">
                                    <div className="flex items-center gap-4 mb-4">
                                        <span className="px-4 py-1.5 bg-primary dark:bg-accent text-white dark:text-dark text-[10px] font-black rounded-full uppercase tracking-widest border border-white/20 transition-colors">Upcoming Event</span>
                                        <span className="text-white/80 text-sm font-bold flex items-center gap-2"><FaClock /> {getDateParts(selectedEvent.event_date).time}</span>
                                    </div>
                                    <h3 className="text-4xl md:text-5xl font-black text-white tracking-tight">{selectedEvent.title}</h3>
                                </div>
                            </div>
                            <div className="p-10 md:p-12">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                                    <div className="space-y-6">
                                        <div className="space-y-2">
                                            <h4 className="text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest transition-colors">Description</h4>
                                            <p className="text-gray-600 dark:text-gray-400 font-medium leading-relaxed text-lg italic transition-colors">
                                                "{selectedEvent.description}"
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex flex-col gap-4">
                                        <div className="p-6 bg-gray-50 dark:bg-gray-900/50 rounded-3xl border border-gray-100 dark:border-white/5 flex items-center gap-6 transition-colors">
                                            <div className="w-14 h-14 bg-white dark:bg-gray-800 rounded-2xl shadow-sm flex flex-col items-center justify-center transition-colors">
                                                <span className="text-xl font-black text-primary dark:text-accent leading-none transition-colors">{getDateParts(selectedEvent.event_date).day}</span>
                                                <span className="text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest transition-colors">{getDateParts(selectedEvent.event_date).month}</span>
                                            </div>
                                            <div>
                                                <div className="text-sm font-black text-gray-900 dark:text-white leading-tight transition-colors">Full Date</div>
                                                <div className="text-xs font-bold text-gray-400 dark:text-gray-500 transition-colors">{new Date(selectedEvent.event_date).toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</div>
                                            </div>
                                        </div>
                                        <button className="w-full py-6 bg-primary dark:bg-accent text-white dark:text-dark rounded-3xl font-black uppercase tracking-widest text-xs shadow-2xl shadow-primary/20 dark:shadow-accent/20 hover:bg-secondary dark:hover:bg-white transition-all transform hover:-translate-y-1">
                                            Add to My Calendar
                                        </button>
                                        <button onClick={() => setSelectedEvent(null)} className="w-full py-6 bg-gray-100 dark:bg-gray-900 text-gray-400 dark:text-gray-500 rounded-3xl font-black uppercase tracking-widest text-xs hover:bg-gray-200 dark:hover:bg-gray-700 hover:text-gray-600 dark:hover:text-gray-300 transition-all">
                                            Close Window
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default FullCalendar;
