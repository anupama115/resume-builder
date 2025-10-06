import { Link, NavLink, Outlet } from 'react-router-dom';

const NavbarComponent = () => {
    return (
        <>
            <nav className="bg-gray-800 text-white border-b border-gray-700 sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-center">
                        <div className="flex space-x-8">
                            <NavLink 
                                to="/" 
                                className="px-3 py-4 text-sm font-medium text-gray-300 hover:text-white hover:bg-gray-700 transition-colors duration-200"
                            >
                                Home
                            </NavLink>
                            <NavLink 
                                to="/details" 
                                className="px-3 py-4 text-sm font-medium text-gray-300 hover:text-white hover:bg-gray-700 transition-colors duration-200"
                            >
                                Details
                            </NavLink>
                        </div>
                    </div>
                </div>
            </nav>
            <Outlet />
        </>
    )
}

export default NavbarComponent;