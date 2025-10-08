import jsPDF from 'jspdf'
import html2canvas from "html2canvas"
import { useSelector } from 'react-redux'

function PdfComponent() {
    const { profile, file, aboutMe, experience, education, skills } = useSelector(state => state)

    const downloadPdf = async () => {
        const input = document.getElementById('divToPrint')
        const canvas = await html2canvas(input, { scale: 2, backgroundColor: '#ffffff' })
        const pdf = new jsPDF('p', 'pt', 'a4')
        const pdfWidth = pdf.internal.pageSize.getWidth()
        const pdfHeight = (canvas.height * pdfWidth) / canvas.width
        pdf.addImage(canvas.toDataURL('image/png'), 'PNG', 0, 0, pdfWidth, pdfHeight)
        pdf.save('Resume.pdf')
    }

    return (
        <>
            <div className="container mx-auto flex justify-center p-2 sm:p-4">
                <div className="w-full max-w-5xl shadow-lg rounded-lg overflow-hidden bg-white" id="divToPrint">
                    <div className="grid grid-cols-1 md:grid-cols-12">
                        {/* Left column */}
                        <div className="md:col-span-4 bg-gray-50 text-gray-800 p-4 sm:p-6 space-y-4 sm:space-y-6">
                            <div className="flex flex-col items-center text-center">
                                <img src={file} className="pdf-profile-image rounded-full w-24 h-24 sm:w-32 sm:h-32 md:w-36 md:h-36" alt="profile" />
                                <span className="font-bold mt-3 text-lg sm:text-xl md:text-2xl">{profile.name}</span>
                                <p className="text-gray-600 text-sm sm:text-base">{profile.tagline}</p>
                                <p className="m-0 text-gray-700 text-sm sm:text-base">{profile.position}</p>
                                <p className="m-0 text-gray-700 text-sm sm:text-base">{profile.location}</p>
                            </div>

                            {/* Contact */}
                            <div className="space-y-2">
                                <h4 className="uppercase text-xs sm:text-sm font-semibold text-gray-700">Contact</h4>
                                {profile.email && (<p className="m-0 break-all text-xs sm:text-sm">{profile.email}</p>)}
                                {profile.contact && (<p className="m-0 break-all text-xs sm:text-sm">{profile.contact}</p>)}
                                {profile.linkedin && (
                                    <a href={profile.linkedin} target="_blank" rel="noreferrer" className="underline break-all text-xs sm:text-sm">{profile.linkedin}</a>
                                )}
                                {profile.github && (
                                    <a href={profile.github} target="_blank" rel="noreferrer" className="underline break-all text-xs sm:text-sm">{profile.github}</a>
                                )}
                                {profile.website && (
                                    <a href={profile.website} target="_blank" rel="noreferrer" className="underline break-all text-xs sm:text-sm">{profile.website}</a>
                                )}
                            </div>

                            {/* Skills */}
                            <div className="space-y-2">
                                <h4 className="uppercase tracking-wider text-xs sm:text-sm font-semibold text-gray-700">Skills</h4>
                                <div className="flex flex-wrap gap-1 sm:gap-2">
                                    {skills.map((skill, skillIndex) => (
                                        <span className="rounded px-2 py-1 text-xs sm:text-sm bg-gray-200 text-gray-800" key={skillIndex}>{skill}</span>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* about, experience, education */}
                        <div className="md:col-span-8 p-4 sm:p-6 space-y-4 sm:space-y-6 text-gray-900">
                            <div>
                                <h3 className="uppercase tracking-wider text-gray-900 text-sm sm:text-base font-semibold">About Me</h3>
                                <div className="h-0.5 bg-gray-200 my-2"></div>
                                <p className="break-words leading-relaxed text-gray-700 text-sm sm:text-base">{aboutMe}</p>
                            </div>

                            <div>
                                <h3 className="uppercase tracking-wider text-gray-900 text-sm sm:text-base font-semibold">Experience</h3>
                                <div className="h-0.5 bg-gray-200 my-2"></div>
                                <div className="space-y-3 sm:space-y-4">
                                    {experience.map((exp, expIndex) => (
                                        <div key={expIndex}>
                                            <h4 className="font-semibold text-base sm:text-lg">{exp.title}</h4>
                                            <p className="m-0 text-xs sm:text-sm text-gray-600">
                                                {exp.company} • {exp.startMonth} {exp.startYear}
                                                {exp.isWorking ? ' - Present' : ` - ${exp.endMonth} ${exp.endYear}`}
                                            </p>
                                            {exp.location && <p className="m-0 text-xs sm:text-sm text-gray-600">{exp.location}</p>}
                                            {exp.description && <p className="mt-1 text-gray-700 leading-relaxed text-sm sm:text-base">{exp.description}</p>}
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <h3 className="uppercase tracking-wider text-gray-900 text-sm sm:text-base font-semibold">Education</h3>
                                <div className="h-0.5 bg-gray-200 my-2"></div>
                                <div className="space-y-3 sm:space-y-4">
                                    {education.map((edu, eduIndex) => (
                                        <div key={eduIndex}>
                                            <h4 className="font-semibold text-base sm:text-lg">{edu.institute}</h4>
                                            <p className="m-0 text-xs sm:text-sm text-gray-600">{edu.degree} • {edu.fieldOfStudy}</p>
                                            <p className="m-0 text-xs sm:text-sm text-gray-600">{edu.startYear} - {edu.endYear} • Grade: {edu.grade}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex justify-center mt-4 p-4">
                <button className="inline-flex items-center bg-black text-white px-6 py-3 rounded hover:bg-gray-800 transition-colors w-full sm:w-auto" onClick={downloadPdf}>Download PDF</button>
            </div>
        </>
    )
}

export default PdfComponent;