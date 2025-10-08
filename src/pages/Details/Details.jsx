import { NavLink } from 'react-router-dom';
import Profile from '../../components/Profile';
import AboutMe from '../../components/AboutMe';
import Experience from '../../components/Experience';
import Education from '../../components/Education';
import Skills from '../../components/Skills';

const Details = () => {
    return (
        <>
            {/* Top image */}
            <div className="p-0 w-full" />
            <div className='w-full max-w-4xl mx-auto p-4 sm:p-6'>

                {/* Profile section */}
                <Profile />

                {/* About section */}
                <AboutMe />

                <Experience />

                <Education />

                <Skills />

                <div className="flex justify-center my-6">
                    <NavLink className="inline-flex items-center justify-center bg-black text-white px-6 py-3 rounded hover:bg-gray-800 transition-colors w-full sm:w-auto" to="/preview">Preview Resume</NavLink>
                </div>

            </div>
        </>
    )
}

export default Details;