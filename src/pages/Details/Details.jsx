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
            <div className='w-full max-w-3xl mx-auto p-4'>

                {/* Profile section */}
                <Profile />

                {/* About section */}
                <AboutMe />

                <Experience />

                <Education />

                <Skills />

                <div className="grid grid-cols-2 mx-auto my-4 text-center max-w-xs">
                    <NavLink className="inline-flex items-center justify-center bg-black text-white p-2 rounded" to="/preview">Preview</NavLink>
                </div>

            </div>
        </>
    )
}

export default Details;