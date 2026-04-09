import React from 'react';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';
import FooterLocation from './FooterLocation';
import OtherLinks from './OtherLinks';

const Footer = () => {
    return (
        <footer className="bg-dark text-white pt-12 pb-6">
            <div className="container mx-auto px-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
                    {/* College Info */}
                    <div>
                        <h3 className="text-xl font-bold mb-4 text-accent">College of Engineering Adoor</h3>
                        <p className="text-gray-400 mb-4">
                            Educating the next generation of leaders and innovators since 1990.
                        </p>
                        <div className="flex space-x-4">
                            <a href="#" className="text-gray-400 hover:text-white transition-colors"><FaFacebook size={20} /></a>
                            <a href="#" className="text-gray-400 hover:text-white transition-colors"><FaTwitter size={20} /></a>
                            <a href="#" className="text-gray-400 hover:text-white transition-colors"><FaInstagram size={20} /></a>
                            <a href="#" className="text-gray-400 hover:text-white transition-colors"><FaLinkedin size={20} /></a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-lg font-bold mb-4">Quick Links</h3>
                        <ul className="space-y-2 text-gray-400">
                            <li><a href="#" className="hover:text-accent transition-colors">Admissions</a></li>
                            <li><a href="#" className="hover:text-accent transition-colors">Academic Calendar</a></li>
                            <li><a href="#" className="hover:text-accent transition-colors">Results</a></li>
                            <li><a href="#" className="hover:text-accent transition-colors">Campus Life</a></li>
                        </ul>
                    </div>

                    {/* Find Us (New Position) */}
                    <FooterLocation />

                    {/* Contact */}
                    <div className="flex flex-col space-y-8">
                        {/* Other Links (Positioned above Contact) */}
                        <OtherLinks />

                        <div>
                            <h3 className="text-lg font-bold mb-4">Contact Us</h3>
                            <p className="text-gray-400 mb-2">College of Engineering Adoor</p>
                            <p className="text-gray-400 mb-2">Manakala PO, Adoor, Pathanamthitta, Kerala</p>
                            <p className="text-gray-400 mb-2">Pin: 691551</p>
                            <p className="text-gray-400 mb-2">Email : principal@cea.ac.in</p>
                            <p className="text-gray-400">Phone:  +91 8547005100</p>
                        </div>
                    </div>
                </div>

                <div className="border-t border-gray-800 pt-6 text-center text-gray-500 text-sm">
                    &copy; {new Date().getFullYear()} College of Engineering Adoor. All rights reserved.
                </div>
            </div>
        </footer>
    );
};

export default Footer;
