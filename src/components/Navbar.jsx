import { NavLink, Outlet } from 'react-router-dom';

const NavbarComponent = () => {
    return (
        <>
            <nav className="fixed top-0 z-50 w-full border-b bg-white">
                <div className="container mx-auto px-20">
                    <div className="flex items-center py-4">
                        <div className="ml-auto space-x-8">
                            <NavLink to="/" className="mx-2 no-underline text-black">Home</NavLink>
                            <NavLink to="/details" className="mx-2 no-underline text-black">Details</NavLink>
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