import { NavLink } from 'react-router-dom';
import Profile from '../../components/Profile';
import Experience from '../../components/Experience';
import Education from '../../components/Education';
import Skills from '../../components/Skills';

const Details = () => {
    return (
        <>
            {/* Top image */}
            <div className="w-full h-40 bg-cover bg-center bg-no-repeat" style={{backgroundImage: "url('/images/background-1.jpg')"}} />
            
            <div className="bg-white text-gray-800 min-h-screen">
                <div className="max-w-6xl mx-auto px-4 py-8">
                    {/* Profile section */}
                    <Profile />
                    
                    <Experience />

                    <Education />

                    <Skills />

                    <div className="flex justify-center mt-8">
                        <NavLink 
                            className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-200 shadow-lg" 
                            to="/preview"
                        >
                            Preview Resume
                        </NavLink>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Details;