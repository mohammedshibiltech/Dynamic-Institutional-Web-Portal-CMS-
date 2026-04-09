import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import api from '../api/axios';

const Hero = () => {
    const [slides, setSlides] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const fetchSlides = async () => {
            try {
                const res = await api.get('/slides');
                if (res.data.length > 0) {
                    setSlides(res.data);
                } else {
                    // Fallback if no slides in DB
                    setSlides([
                        { id: 1, image_url: 'https://via.placeholder.com/1920x600', title: 'Welcome', subtitle: 'To our college' }
                    ]);
                }
            } catch (err) {
                console.error('Failed to fetch slides', err);
                setSlides([
                    { id: 1, image_url: 'https://via.placeholder.com/1920x600', title: 'Welcome', subtitle: 'To our college' }
                ]);
            }
        };
        fetchSlides();
    }, []);

    useEffect(() => {
        if (slides.length === 0) return;
        const interval = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % slides.length);
        }, 5000);
        return () => clearInterval(interval);
    }, [slides]);

    if (slides.length === 0) return <div className="h-96 bg-gray-200 animate-pulse"></div>;

    return (
        <div className="relative h-[500px] overflow-hidden bg-gray-900">
            <AnimatePresence mode='wait'>
                <motion.div
                    key={currentIndex}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1 }}
                    className="absolute inset-0"
                >
                    <img
                        src={slides[currentIndex].image_url}
                        alt={slides[currentIndex].title}
                        className="w-full h-full object-cover opacity-80"
                    />
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white p-4">
                        <motion.h2
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.5 }}
                            className="text-4xl md:text-6xl font-bold mb-4 drop-shadow-lg"
                        >
                            {slides[currentIndex].title}
                        </motion.h2>
                        <motion.p
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.7 }}
                            className="text-xl md:text-2xl drop-shadow-md"
                        >
                            {slides[currentIndex].subtitle}
                        </motion.p>
                    </div>
                </motion.div>
            </AnimatePresence>

            {/* Dots Navigation */}
            <div className="absolute bottom-5 left-1/2 transform -translate-x-1/2 flex space-x-2">
                {slides.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => setCurrentIndex(index)}
                        className={`w-3 h-3 rounded-full ${index === currentIndex ? 'bg-accent' : 'bg-gray-400'}`}
                    />
                ))}
            </div>
        </div>
    );
};

export default Hero;
