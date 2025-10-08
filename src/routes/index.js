import Home from "../pages/Home/Home";
import Details from "../pages/Details/Details";
import PdfComponent from "../pages/ResumeDownload/ResumeComponent";

export const routes = [
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
    }
]
