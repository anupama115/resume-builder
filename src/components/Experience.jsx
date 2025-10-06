import { useState } from 'react'
import { MdAddCircleOutline, MdEdit, MdClose, MdDelete } from 'react-icons/md';
import { HiOfficeBuilding } from 'react-icons/hi';
import { ImCheckmark, ImCross } from 'react-icons/im'
import { useSelector, useDispatch } from 'react-redux';
import { addExperience, editExperience, removeExperience } from '../store/slices/ExperienceSlice';
import Months from './Date/Month';
import Years from './Date/Years';

function Experience() {

    const [show, setShow] = useState(false);
    const [Alert, setAlert] = useState(false);
    const [deleteId, setDeleteId] = useState(null);
    const [form, setForm] = useState({
        id: "",
        title: "",
        company: "",
        isWorking: false,
        startMonth: "",
        startYear: "",
        endMonth: "",
        endYear: "",
        location: "",
        description: "",
        isEdit: false
    });

    const experienceList = useSelector(state => state.experience)
    const dispatch = useDispatch();

    const handleClose = () => {
        setShow(false);
        setForm({
            id: "",
            title: "",
            company: "",
            isWorking: false,
            startMonth: "",
            startYear: "",
            endMonth: "",
            endYear: "",
            location: "",
            description: "",
            isEdit: false
        })
    }
    const handleShow = () => setShow(true);
    const handleAlertClose = () => setAlert(false);
    const handleAlert = (id) => {
        setDeleteId(id)
        setAlert(true);
    }


    const handleForm = (e) => {
        setForm((old) => {
            return {
                ...old,
                [e.target.name]: e.target.type === 'checkbox' ? e.target.checked : e.target.value
            }
        })
    }


    const handleSubmit = (event) => {
        event.preventDefault();
        if (form.isEdit) {
            dispatch(editExperience(form));
        }
        else {
            dispatch(addExperience(form))
        }
        setShow(false);
        setForm({
            id: "",
            title: "",
            company: "",
            isWorking: false,
            startMonth: "",
            startYear: "",
            endMonth: "",
            endYear: "",
            location: "",
            description: "",
            isEdit: false
        })
    }

    const handleEdit = (id) => {
        const form = experienceList[id];
        form.isEdit = true;
        form.id = id
        setForm(form)
        setShow(true);
    }

    const handleDelete = (id) => {
        dispatch(removeExperience(id));
        setAlert(false);
    }

    return (
        <div className="flex justify-center mt-4">
            <div className="w-full max-w-4xl">
                <div className="flex justify-between items-center bg-gray-800 rounded-lg text-white p-4 mb-4">
                    <h5 className="text-lg font-semibold m-0">Experience</h5>
                    <MdAddCircleOutline size={30} className="text-gray-300 hover:text-blue-400 cursor-pointer transition-colors duration-200" onClick={handleShow} />
                </div>
                <div className="w-full">
                    {experienceList &&
                        experienceList.map((item, id) => {
                            return (
                                <div className="border-b border-gray-200 pt-4 pb-4" key={id}>
                                    <div className="flex justify-between items-start">
                                        <div className="flex items-start space-x-4 flex-1">
                                            <div className="bg-blue-100 p-3 rounded-lg shadow-sm">
                                                <HiOfficeBuilding size={24} className="text-blue-600" />
                                            </div>
                                            <div className="flex-1">
                                                <h5 className="text-lg font-semibold text-gray-800 m-0">{item.title}</h5>
                                                <p className="text-gray-600 m-0 text-sm">{item.company} • {item.startMonth} {item.startYear} {`${item.isWorking ? " - Present" : " - " + item.endMonth + " " + item.endYear}`}</p>
                                                <p className="text-gray-600 m-0 text-sm">{item.location}</p>
                                                <p className="text-gray-700 mt-2">{item.description}</p>
                                            </div>
                                        </div>
                                        <div className="flex space-x-2 ml-4">
                                            <MdEdit size={20} className="text-gray-500 hover:text-blue-500 cursor-pointer transition-colors duration-200" onClick={() => { handleEdit(id) }} />
                                            <MdDelete size={20} className="text-gray-500 hover:text-red-500 cursor-pointer transition-colors duration-200" onClick={() => { handleAlert(id) }} />
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
            {/* Experience Modal */}
            {show && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
                        <div className="flex justify-between items-center p-6 border-b">
                            <h3 className="text-lg font-semibold text-gray-800">Experience</h3>
                            <MdClose size={24} className="text-gray-500 hover:text-gray-700 cursor-pointer" onClick={handleClose} />
                        </div>
                        <div className="p-6">
                            <form noValidate onSubmit={handleSubmit} className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
                                    <input 
                                        required 
                                        type="text" 
                                        placeholder="Ex: React Developer" 
                                        name="title" 
                                        value={form.title} 
                                        onChange={handleForm}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Company Name</label>
                                    <input 
                                        required 
                                        type="text" 
                                        placeholder="Ex: Amazon" 
                                        name="company" 
                                        value={form.company} 
                                        onChange={handleForm}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    />
                                </div>
                                <div className="flex items-center">
                                    <input 
                                        type="checkbox" 
                                        name="isWorking" 
                                        checked={form.isWorking} 
                                        onChange={handleForm}
                                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                                    />
                                    <label className="ml-2 text-sm text-gray-700">I am currently working in this role</label>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Start Month - Year</label>
                                        <div className="grid grid-cols-2 gap-2">
                                            <select name="startMonth" value={form.startMonth} onChange={handleForm} className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                                                <Months />
                                            </select>
                                            <select name="startYear" value={form.startYear} onChange={handleForm} className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                                                <Years />
                                            </select>
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">End Month - Year</label>
                                        <div className="grid grid-cols-2 gap-2">
                                            <select name="endMonth" value={form.endMonth} onChange={handleForm} disabled={form.isWorking} className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100">
                                                <Months />
                                            </select>
                                            <select name="endYear" value={form.endYear} onChange={handleForm} disabled={form.isWorking} className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100">
                                                <Years />
                                            </select>
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                                    <input 
                                        required 
                                        type="text" 
                                        placeholder="Ex: Pune, India" 
                                        name="location" 
                                        value={form.location} 
                                        onChange={handleForm}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                                    <input 
                                        required 
                                        type="text" 
                                        placeholder="Ex: Worked as a Front-End Developer" 
                                        name="description" 
                                        value={form.description} 
                                        onChange={handleForm}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    />
                                </div>
                                <div className="flex justify-end pt-4">
                                    <button 
                                        type="submit" 
                                        className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-200"
                                    >
                                        Save Changes
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}

            {/* Delete Confirmation Modal */}
            {Alert && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg shadow-xl max-w-sm w-full mx-4">
                        <div className="p-6 text-center">
                            <h4 className="text-lg font-semibold text-gray-800 mb-4">Are you sure?</h4>
                            <div className="flex justify-center space-x-4">
                                <ImCheckmark size={30} className="text-green-500 hover:text-green-600 cursor-pointer transition-colors duration-200" onClick={() => { handleDelete(deleteId) }} />
                                <ImCross size={25} className="text-red-500 hover:text-red-600 cursor-pointer transition-colors duration-200" onClick={handleAlertClose} />
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default Experience