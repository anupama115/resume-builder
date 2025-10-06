import { BsLinkedin, BsGithub, BsGlobe } from 'react-icons/bs'
import { GiGraduateCap } from 'react-icons/gi'
import { HiLocationMarker, HiOfficeBuilding, HiOutlineMail, HiPhone } from 'react-icons/hi'
import jsPDF from 'jspdf';
import html2canvas from "html2canvas";

import { useSelector } from 'react-redux';

function PdfComponent() {

    const { profile, file, aboutMe, experience, education, skills } = useSelector(state => state) //object destructuring


    const printDocument = () => {
        const input = document.getElementById('divToPrint');
        html2canvas(input)
            .then((canvas) => {
                const imgData = canvas.toDataURL('image/png');
                const pdf = new jsPDF('p', 'pt', 'a4', false);
                pdf.addImage(imgData, 'PNG', 0, 0, 600, 0, undefined, false);
                pdf.save("Resume.pdf");
            })
            ;
    };

    const GetIcon = (icon) => {
        switch (icon.icon) {
            case "HiOutlineMail":
                return <HiOutlineMail size={30} />
            case "HiPhone":
                return <HiPhone size={30} />
            case "BsLinkedin":
                return <BsLinkedin size={30} />
            case "BsGithub":
                return <BsGithub size={30} />
            case "BsGlobe":
                return <BsGlobe size={30} />
            default:
                return "●"
        }
    }
    const GetLinks = () => {
        const list = [];
        if (profile.email) {
            list.push({
                icon: "HiOutlineMail",
                link: profile.email,
            });
        }
        if (profile.contact) {
            list.push({
                icon: "HiPhone",
                link: profile.contact,
            });
        }
        if (profile.linkedin) {
            list.push({
                icon: "BsLinkedin",
                link: profile.linkedin,
            });
        }
        if (profile.github) {
            list.push({
                icon: "BsGithub",
                link: profile.github,
            });
        }
        if (profile.website) {
            list.push({
                icon: "BsGlobe",
                link: profile.website,
            });
        }

        return (
            list.map((item, id) => {
                return (
                    <div className={`flex items-center ${id % 2 === 0 ? "bg-gray-600" : "bg-gray-700"} text-white p-3`} key={id}>
                        <p className="m-0"><GetIcon icon={item.icon} /></p><span className="mx-2"></span><p className="m-0">{item.link}</p>
                    </div>
                )
            })
        )

    }

    return (
        <>

            <div className="flex justify-center p-4">

                <div className="pdf bg-gray-800 text-white flex" id="divToPrint" size="A4">

                    <div className="flex items-center justify-center w-2/5 bg-amber-50 p-0 py-2">
                        <div>
                            <div className="flex justify-center">
                                <img src={file} className="pdf-profile-image" alt="..."></img>
                            </div>

                            <div className="text-center space-y-2">
                                <span className="text-2xl font-bold m-2">{profile.name}</span>
                                <p>{profile.tagline}</p>
                                <p className="m-0 flex items-center justify-center"><HiOfficeBuilding size={20} className="mr-2" /> {profile.position}</p>
                                <p className="flex items-center justify-center"><HiLocationMarker size={20} className="mr-2" /> {profile.location}</p>
                            </div>
                            <br></br>
                            <GetLinks />

                            <br></br>
                            <div className="p-3">
                                <h4 className="font-semibold text-lg mb-2">Skills</h4>
                                <div className="flex flex-wrap gap-2">
                                    {
                                        skills.map((items, id) => {
                                            return (
                                                <span className="inline-block px-3 py-1 bg-gray-200 text-gray-800 rounded text-sm" key={id}>{items}</span>
                                            )
                                        })
                                    }
                                </div>
                            </div>
                        </div>

                    </div>
                    <div className="flex items-center w-3/5 p-0 py-4">
                        <div>
                            <div className="px-4 py-1">
                                <h4 className="font-semibold text-lg mb-2">About Me</h4>
                                <p className="break-words">
                                    {aboutMe}
                                </p>
                                <hr className="my-4"></hr>
                            </div>

                            <div className="px-4">
                                <h4 className="font-semibold text-lg mb-2">Experience</h4>
                                {
                                    experience.map((item, id) => {
                                        return (
                                            <div className="flex justify-start py-1" key={id}>
                                                <HiOfficeBuilding size={30} className="mr-3 mt-1" />
                                                <div className="px-3">
                                                    <h4 className="text-lg font-medium">{item.title}</h4>
                                                    <p className="m-0">{item.company} • {item.startMonth} {item.startYear} {`${item.isWorking ? " - Present" : " - " + item.endMonth + " " + item.endYear}`}</p>
                                                    <p className="m-0">{item.location}</p>
                                                    <p>{item.description}</p>
                                                </div>
                                            </div>
                                        )
                                    })
                                }

                                <hr className="my-4"></hr>
                            </div>

                            <div className="px-4">
                                <h4 className="font-semibold text-lg mb-2">Education</h4>
                                {
                                    education.map((item, id) => {
                                        return (
                                            <div className="flex justify-start py-1" key={id}>
                                                <GiGraduateCap size={40} className="mr-3 mt-1" />
                                                <div className="px-3">
                                                    <h4 className="text-lg font-medium">{item.institute}</h4>
                                                    <p className="m-0">{item.degree} • {item.fieldOfStudy}</p>
                                                    <p>{item.startYear} - {item.endYear} • Grade: {item.grade}</p>
                                                </div>
                                            </div>
                                        )
                                    })
                                }


                            </div>
                        </div>

                    </div>

                </div>

            </div>
            <div className="flex justify-center mt-4">
                <button className="px-6 py-3 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors duration-200" onClick={printDocument}>Download</button>
            </div>

        </>
    )
}

export default PdfComponent;