import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../api/axios';
import { FaCalendarAlt, FaMapMarkerAlt, FaClock, FaTimes } from 'react-icons/fa';


const Events = () => {
    const [events, setEvents] = useState([]);
    const [selectedEvent, setSelectedEvent] = useState(null);


    useEffect(() => {
        api.get('/events')
            .then(res => setEvents(res.data))
            .catch(err => console.error(err));
    }, []);

    // Function to format date parts
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
        <section className="py-16 bg-light dark:bg-dark transition-colors duration-300">
            <div className="container mx-auto px-6">
                <h2 className="text-3xl font-bold text-center text-primary dark:text-accent mb-12">Event Calendar</h2>

                <div className="max-w-4xl mx-auto">
                    <div className="space-y-6">
                        {events.map((event) => {
                            const { day, month, year, time } = getDateParts(event.event_date);
                            return (
                                <div key={event.id} className="bg-white dark:bg-gray-800/50 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden flex flex-col md:flex-row border border-gray-100 dark:border-white/5">
                                    {/* Date Box */}
                                    <div className="bg-primary dark:bg-secondary text-white p-6 flex flex-col items-center justify-center min-w-[120px] md:w-32">
                                        <span className="text-3xl font-bold leading-none">{day}</span>
                                        <span className="text-sm font-medium tracking-wider mt-1">{month}</span>
                                        <span className="text-xs opacity-80 mt-1">{year}</span>
                                    </div>

                                    {/* Event Details */}
                                    <div className="p-6 flex-grow flex flex-col justify-center">
                                        <h3
                                            onClick={() => setSelectedEvent(event)}
                                            className="text-xl font-bold text-gray-800 dark:text-white mb-2 hover:text-secondary dark:hover:text-accent transition-colors cursor-pointer"
                                        >
                                            {event.title}
                                        </h3>


                                        <div className="flex flex-wrap gap-4 text-sm text-gray-600 dark:text-gray-400 mb-3">
                                            <div className="flex items-center">
                                                <FaClock className="mr-2 text-secondary dark:text-accent" />
                                                {time}
                                            </div>
                                            {event.location && (
                                                <div className="flex items-center">
                                                    <FaMapMarkerAlt className="mr-2 text-secondary dark:text-accent" />
                                                    {event.location}
                                                </div>
                                            )}
                                        </div>

                                        <p className="text-gray-600 dark:text-gray-300 line-clamp-2">
                                            {event.description}
                                        </p>
                                    </div>

                                    {/* Action Button (Optional) */}
                                    <div className="p-6 flex items-center justify-center md:border-l border-gray-100 dark:border-white/5 bg-gray-50 dark:bg-gray-800/80 md:bg-white dark:md:bg-gray-800 transition-colors">
                                        <button
                                            onClick={() => setSelectedEvent(event)}
                                            className="text-primary dark:text-accent font-semibold hover:text-secondary transition-colors text-sm uppercase tracking-wide"
                                        >
                                            Details
                                        </button>
                                    </div>

                                </div>
                            );
                        })}
                    </div>

                    {events.length === 0 && (
                        <div className="text-center py-12 bg-white dark:bg-gray-800/50 rounded-lg shadow-sm border dark:border-white/5">
                            <FaCalendarAlt className="mx-auto text-4xl text-gray-300 dark:text-gray-600 mb-4" />
                            <p className="text-gray-500 dark:text-gray-400 text-lg">No upcoming events scheduled at the moment.</p>
                        </div>
                    )}

                    <div className="mt-10 text-center">
                        <Link to="/events-calendar">
                            <button className="bg-secondary text-white px-8 py-3 rounded-full hover:bg-primary transition-colors font-medium shadow-md">
                                View Full Calendar
                            </button>
                        </Link>
                    </div>
                </div>
            </div>

            {/* Event Details Modal */}
            {selectedEvent && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300">
                    <div
                        className="bg-white dark:bg-gray-900 rounded-[2rem] shadow-2xl w-full max-w-2xl overflow-hidden animate-in zoom-in duration-300 border dark:border-white/10"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Modal Header/Image */}
                        {selectedEvent.image_url && (
                            <div className="relative h-64 overflow-hidden">
                                <img
                                    src={selectedEvent.image_url}
                                    alt={selectedEvent.title}
                                    className="w-full h-full object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                                <button
                                    onClick={() => setSelectedEvent(null)}
                                    className="absolute top-6 right-6 p-2 bg-white/20 hover:bg-white/40 backdrop-blur-md rounded-full text-white transition-all"
                                >
                                    <FaTimes size={20} />
                                </button>
                                <div className="absolute bottom-8 left-8">
                                    <h3 className="text-3xl font-black text-white tracking-tight">{selectedEvent.title}</h3>
                                </div>
                            </div>
                        )}

                        <div className="p-10 relative">
                            {!selectedEvent.image_url && (
                                <div className="flex justify-between items-start mb-8">
                                    <h3 className="text-3xl font-black text-gray-900 dark:text-white tracking-tight">{selectedEvent.title}</h3>
                                    <button
                                        onClick={() => setSelectedEvent(null)}
                                        className="p-2 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-full text-gray-500 dark:text-gray-400 transition-all"
                                    >
                                        <FaTimes size={20} />
                                    </button>
                                </div>
                            )}

                            <div className="flex flex-wrap gap-6 text-sm mb-10">
                                <div className="flex items-center gap-3 bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 px-5 py-3 rounded-2xl font-bold border border-blue-100 dark:border-blue-900/50">
                                    <FaCalendarAlt />
                                    {new Date(selectedEvent.event_date).toLocaleDateString('en-US', { dateStyle: 'long' })}
                                </div>
                                <div className="flex items-center gap-3 bg-secondary/10 dark:bg-accent/10 text-secondary dark:text-accent px-5 py-3 rounded-2xl font-bold border border-secondary/10 dark:border-accent/10 transition-colors">
                                    <FaClock />
                                    {new Date(selectedEvent.event_date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                </div>
                            </div>

                            <div className="space-y-4">
                                <h4 className="text-xs font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest">About this event</h4>
                                <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-lg font-medium transition-colors">
                                    {selectedEvent.description}
                                </p>
                            </div>

                            <div className="mt-12 flex justify-end">
                                <button
                                    onClick={() => setSelectedEvent(null)}
                                    className="px-10 py-4 bg-primary dark:bg-accent text-white dark:text-dark rounded-2xl hover:bg-secondary dark:hover:bg-opacity-90 shadow-xl shadow-primary/20 dark:shadow-accent/10 transition-all font-black uppercase tracking-widest text-xs"
                                >
                                    Close Details
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </section>

    );
};

export default Events;
