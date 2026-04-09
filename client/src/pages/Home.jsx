import React from 'react';
import Header from '../components/Header';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import Announcements from '../components/Announcements';
import NewsTicker from '../components/NewsTicker';
import Events from '../components/Events';
import About from '../components/About';
import Footer from '../components/Footer';

const Home = () => {
    return (
        <div className="flex flex-col min-h-screen bg-light dark:bg-dark transition-colors duration-300">
            <Header />
            <Navbar />
            <main className="flex-grow">
                <NewsTicker />

                <section className="py-8 bg-light dark:bg-dark overflow-hidden transition-colors duration-300">
                    <div className="container mx-auto px-4 md:px-6">
                        <div className="flex flex-col lg:flex-row gap-8 items-stretch">
                            {/* Hero Slider - 65% width on desktop */}
                            <div className="w-full lg:w-[68%] rounded-[24px] overflow-hidden shadow-2xl relative">
                                <Hero />
                            </div>

                            {/* Announcements - 35% width on desktop */}
                            <div className="w-full lg:w-[32%]">
                                <Announcements />
                            </div>
                        </div>
                    </div>
                </section>

                <div className="container mx-auto px-6">
                    <Events />
                    <About />
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default Home;
