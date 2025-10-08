import Home from "../pages/Home/Home";
import Details from "../pages/Details/Details";
import PdfComponent from "../pages/ResumeDownload/ResumeComponent";
import NavbarComponent from "../components/Navbar";

//creating routing path
export const routes = [
    {
        path: '/',
        element: <NavbarComponent />,
        children: [
            {
                path: '/',
                element: <Home />
            },
            {
                path: '/preview',
                element: <PdfComponent />
            },
            {
                path: '/details',
                element: <Details />
            },
        ]
    }
]
