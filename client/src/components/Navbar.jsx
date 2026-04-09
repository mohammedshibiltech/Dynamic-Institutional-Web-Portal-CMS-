import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaBars, FaTimes, FaSun, FaMoon } from 'react-icons/fa';
import { useTheme } from '../context/ThemeContext';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { theme, toggleTheme } = useTheme();

    const toggleMenu = () => setIsOpen(!isOpen);

    return (
        <nav className="bg-primary dark:bg-dark text-white sticky top-0 z-50 shadow-lg transition-colors duration-300">
            <div className="container mx-auto px-6 py-3 flex justify-between items-center">
                {/* Mobile Menu Button / Logo Placeholder */}
                <div className="flex items-center gap-4">
                    <button className="md:hidden text-2xl focus:outline-none" onClick={toggleMenu}>
                        {isOpen ? <FaTimes /> : <FaBars />}
                    </button>
                    {/* Theme Toggle Mobile */}
                    <button 
                        onClick={toggleTheme} 
                        className="md:hidden text-xl p-2 rounded-full hover:bg-white/10 transition-colors"
                        aria-label="Toggle Theme"
                    >
                        {theme === 'dark' ? <FaSun className="text-accent" /> : <FaMoon />}
                    </button>
                </div>

                {/* Desktop Menu */}
                <ul className="hidden md:flex space-x-8 font-medium mx-auto items-center">
                    <li><Link to="/" className="hover:text-accent transition-colors">Home</Link></li>
                    <li><Link to="/administration" className="hover:text-accent transition-colors">Administration</Link></li>
                    <li><Link to="/admissions" className="hover:text-accent transition-colors">Admissions</Link></li>
                    <li><Link to="/department" className="hover:text-accent transition-colors">Department</Link></li>
                    <li><Link to="/activities" className="hover:text-accent transition-colors">Activities</Link></li>
                    <li><Link to="/placement" className="hover:text-accent transition-colors">Placement</Link></li>
                    <li><Link to="/institution" className="hover:text-accent transition-colors">Institution</Link></li>
                    <li><Link to="/contact" className="hover:text-accent transition-colors">Contact</Link></li>
                </ul>

                {/* Admin Login Link and Theme Toggle Desktop */}
                <div className="hidden md:flex items-center gap-4">
                    <button 
                        onClick={toggleTheme} 
                        className="text-xl p-2 rounded-full hover:bg-white/10 transition-colors"
                        aria-label="Toggle Theme"
                    >
                        {theme === 'dark' ? <FaSun className="text-accent" /> : <FaMoon />}
                    </button>
                    <Link to="/admin/login" className="bg-secondary px-4 py-2 rounded hover:bg-white hover:text-secondary transition-all">Admin Login</Link>
                </div>
            </div>

            {/* Mobile Dropdown */}
            {isOpen && (
                <div className="md:hidden bg-primary dark:bg-gray-900 border-t border-secondary dark:border-white/10 transition-colors duration-300">
                    <ul className="flex flex-col p-4 space-y-3">
                        <li><Link to="/" className="block hover:text-accent" onClick={toggleMenu}>Home</Link></li>
                        <li><Link to="/administration" className="block hover:text-accent" onClick={toggleMenu}>Administration</Link></li>
                        <li><Link to="/admissions" className="block hover:text-accent" onClick={toggleMenu}>Admissions</Link></li>
                        <li><Link to="/department" className="block hover:text-accent" onClick={toggleMenu}>Department</Link></li>
                        <li><Link to="/activities" className="block hover:text-accent" onClick={toggleMenu}>Activities</Link></li>
                        <li><Link to="/placement" className="block hover:text-accent" onClick={toggleMenu}>Placement</Link></li>
                        <li><Link to="/contact" className="block hover:text-accent" onClick={toggleMenu}>Contact</Link></li>
                        <li><Link to="/admin/login" className="block text-accent font-bold" onClick={toggleMenu}>Admin Login</Link></li>
                    </ul>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
