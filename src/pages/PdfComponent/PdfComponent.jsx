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
            <div className="container mx-auto flex justify-center p-4">
                <div className="w-full max-w-5xl shadow-lg rounded-lg overflow-hidden bg-white" id="divToPrint">
                    <div className="grid grid-cols-1 md:grid-cols-12">
                        {/* Left column */}
                        <div className="md:col-span-4 bg-gray-50 text-gray-800 p-6 space-y-6">
                            <div className="flex flex-col items-center text-center">
                                <img src={file} className="pdf-profile-image rounded-full" alt="profile" />
                                <span className="font-bold mt-3 text-2xl">{profile.name}</span>
                                <p className="text-gray-600">{profile.tagline}</p>
                                <p className="m-0 text-gray-700">{profile.position}</p>
                                <p className="m-0 text-gray-700">{profile.location}</p>
                            </div>

                            {/* Contact */}
                            <div className="space-y-2">
                                <h4 className="uppercase text-sm font-semibold text-gray-700">Contact</h4>
                                {profile.email && (<p className="m-0 break-all">{profile.email}</p>)}
                                {profile.contact && (<p className="m-0 break-all">{profile.contact}</p>)}
                                {profile.linkedin && (
                                    <a href={profile.linkedin} target="_blank" rel="noreferrer" className="underline break-all">{profile.linkedin}</a>
                                )}
                                {profile.github && (
                                    <a href={profile.github} target="_blank" rel="noreferrer" className="underline break-all">{profile.github}</a>
                                )}
                                {profile.website && (
                                    <a href={profile.website} target="_blank" rel="noreferrer" className="underline break-all">{profile.website}</a>
                                )}
                            </div>

                            {/* Skills */}
                            <div className="space-y-2">
                                <h4 className="uppercase tracking-wider text-sm font-semibold text-gray-700">Skills</h4>
                                <div className="flex flex-wrap gap-2">
                                    {skills.map((skill, skillIndex) => (
                                        <span className="rounded px-3 py-1 text-sm bg-gray-200 text-gray-800" key={skillIndex}>{skill}</span>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* about, experience, education */}
                        <div className="md:col-span-8 p-6 space-y-6 text-gray-900">
                            <div>
                                <h3 className="uppercase tracking-wider text-gray-900">About Me</h3>
                                <div className="h-0.5 bg-gray-200 my-2"></div>
                                <p className="break-words leading-relaxed text-gray-700">{aboutMe}</p>
                            </div>

                            <div>
                                <h3 className="uppercase tracking-wider text-gray-900">Experience</h3>
                                <div className="h-0.5 bg-gray-200 my-2"></div>
                                <div className="space-y-4">
                                    {experience.map((exp, expIndex) => (
                                        <div key={expIndex}>
                                            <h4 className="font-semibold text-lg">{exp.title}</h4>
                                            <p className="m-0 text-sm text-gray-600">
                                                {exp.company} • {exp.startMonth} {exp.startYear}
                                                {exp.isWorking ? ' - Present' : ` - ${exp.endMonth} ${exp.endYear}`}
                                            </p>
                                            {exp.location && <p className="m-0 text-sm text-gray-600">{exp.location}</p>}
                                            {exp.description && <p className="mt-1 text-gray-700 leading-relaxed">{exp.description}</p>}
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <h3 className="uppercase tracking-wider text-gray-900">Education</h3>
                                <div className="h-0.5 bg-gray-200 my-2"></div>
                                <div className="space-y-4">
                                    {education.map((edu, eduIndex) => (
                                        <div key={eduIndex}>
                                            <h4 className="font-semibold text-lg">{edu.institute}</h4>
                                            <p className="m-0 text-sm text-gray-600">{edu.degree} • {edu.fieldOfStudy}</p>
                                            <p className="m-0 text-sm text-gray-600">{edu.startYear} - {edu.endYear} • Grade: {edu.grade}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex justify-center mt-4">
                <button className="inline-flex items-center bg-black text-white px-4 py-2 rounded" onClick={downloadPdf}>Download</button>
            </div>
        </>
    )
}

export default PdfComponent;