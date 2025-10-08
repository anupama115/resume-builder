import { NavLink, Outlet } from 'react-router-dom';

const NavbarComponent = () => {
    return (
        <>
            <nav className="fixed top-0 z-50 w-full border-b bg-white shadow-lg">
                <div className="container mx-auto px-4 sm:px-6 lg:px-20">
                    <div className="flex items-center justify-between py-4">
                        <div className="text-lg font-semibold text-gray-800">Resume Builder</div>
                        <div className="flex space-x-4 sm:space-x-8">
                            <NavLink 
                                to="/" 
                                className={({ isActive }) => 
                                    `no-underline text-black hover:text-gray-600 transition-colors px-3 py-2 rounded-md ${
                                        isActive ? 'bg-gray-100 font-medium' : ''
                                    }`
                                }
                            >
                                Home
                            </NavLink>
                            <NavLink 
                                to="/details" 
                                className={({ isActive }) => 
                                    `no-underline text-black hover:text-gray-600 transition-colors px-3 py-2 rounded-md ${
                                        isActive ? 'bg-gray-100 font-medium' : ''
                                    }`
                                }
                            >
                                Build Resume
                            </NavLink>
                            <NavLink 
                                to="/preview" 
                                className={({ isActive }) => 
                                    `no-underline text-black hover:text-gray-600 transition-colors px-3 py-2 rounded-md ${
                                        isActive ? 'bg-gray-100 font-medium' : ''
                                    }`
                                }
                            >
                                Preview
                            </NavLink>
                        </div>
                    </div>
                </div>
            </nav>
            <div className="h-16" />
            <Outlet />
        </>
    )
}

export default NavbarComponent;
