import logo from '../assets/college-logo.png';

const Header = () => {
    return (
        <header className="bg-white dark:bg-dark py-4 px-6 border-b border-gray-200 dark:border-gray-800 transition-colors duration-300">
            <div className="container mx-auto flex items-center justify-between">
                {/* Left: Logo */}
                <div className="flex items-center gap-4">
                    <img
                        src={logo}
                        alt="College Logo"
                        className="h-16 w-16 md:h-24 md:w-24 object-contain brightness-100 dark:brightness-110"
                    />
                    {/* Center: College Name */}
                    <div className="flex flex-col leading-tight">
                        <h1 className="text-lg md:text-2xl font-extrabold text-black dark:text-white uppercase tracking-tight">
                            College of
                        </h1>
                        <h1 className="text-lg md:text-2xl font-extrabold text-black dark:text-white uppercase tracking-tight">
                            Engineering Adoor
                        </h1>
                        <p className="text-[10px] md:text-sm font-semibold text-[#f95c5c] mt-0.5">
                            Managed by I.H.R.D., A Govt. of Kerala Undertaking
                        </p>
                    </div>
                </div>

                {/* Right: Placeholder */}
                <div className="hidden md:block w-1/4">
                    {/* Future content */}
                </div>
            </div>
        </header>
    );
};

export default Header;