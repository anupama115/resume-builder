import Container from 'react-bootstrap/Container';
import { NavLink } from 'react-router-dom';
import Profile from '../../components/Profile';
import Experience from '../../components/Experience';
import Education from '../../components/Education';
import Skills from '../../components/Skills';

const Details = () => {
    return (
        <>
            {/* Top image */}
            <Container fluid className="p-0 top-image" />
            <Container className='bg-dark text-white'>

                {/* Profile section */}
                <Profile />
                
                <Experience />

                <Education />

                <Skills />

                <div className="d-grid col-2 mx-auto my-4 text-center">
                    <NavLink className="nav-link align-middle bg-dark text-white p-2 rounded" to="/preview">Preview</NavLink>
                </div>

            </Container>
        </>
    )
}

export default Details;