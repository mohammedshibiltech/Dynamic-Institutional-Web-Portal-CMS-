import React, { useState, useEffect } from 'react';
import api from '../api/axios';
import './NewsTicker.css';

const NewsTicker = () => {
    const [news, setNews] = useState([]);

    useEffect(() => {
        api.get('/announcements')
            .then(res => setNews(res.data))
            .catch(err => console.error(err));
    }, []);

    if (!Array.isArray(news) || news.length === 0) return null;

    return (
        <div className="news-ticker-container bg-primary text-white overflow-hidden py-2 relative flex items-center">
            <div className="ticker-label bg-gray-900 px-4 py-1 font-bold z-10 shadow-lg whitespace-nowrap">
                LATEST NEWS
            </div>
            <div className="ticker-content flex space-x-8 animate-ticker hover:pause-animation">
                {[...news, ...news].map((item, index) => (
                    <div key={`${item.id}-${index}`} className="flex items-center space-x-2 whitespace-nowrap">
                        <span className="text-secondary font-bold">•</span>
                        <span className="text-sm font-medium tracking-wide">{item.title}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default NewsTicker;
