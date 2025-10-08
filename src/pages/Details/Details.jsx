import { NavLink } from 'react-router-dom';
import Profile from '../../components/ProfileBlock';
import AboutMe from '../../components/AboutMeBlock';
import Experience from '../../components/ExperienceBlock';
import Education from '../../components/EducationBlock';
import Skills from '../../components/SkillBlock';

const Details = () => {
    return (
        <div className="bg-gray-100">
            <div className="p-0 w-full" />
            <div className='w-full max-w-4xl mx-auto p-4 sm:p-6'>
                <Profile />
                <AboutMe />
                <Experience />
                <Education />
                <Skills />
                <div className="flex justify-center my-6">
                    <NavLink className="inline-flex items-center justify-center bg-black text-white px-6 py-3 rounded hover:bg-gray-800 transition-colors w-full sm:w-auto" to="/preview">Preview Resume</NavLink>
                </div>

            </div>
        </div>
    )
}

export default Details;