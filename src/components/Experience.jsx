import { useState } from 'react'
import { MdAddCircleOutline, MdEdit, MdDelete } from 'react-icons/md';
import { useSelector, useDispatch } from 'react-redux';
import { addExperience, editExperience, removeExperience } from '../store/slices/ExperienceSlice';
import Months from './Date/Month';
import Years from './Date/Years';

function Experience() {
  const [modal, setModal] = useState({ show: false, editId: null });
  const [deleteId, setDeleteId] = useState(null);
  const [form, setForm] = useState({
    title: "",
    company: "",
    isWorking: false,
    startMonth: "",
    startYear: "",
    endMonth: "",
    endYear: "",
    location: "",
    description: ""
  });

  const experienceList = useSelector(state => state.experience);
  const dispatch = useDispatch();

  const resetForm = () => setForm({
    title: "",
    company: "",
    isWorking: false,
    startMonth: "",
    startYear: "",
    endMonth: "",
    endYear: "",
    location: "",
    description: ""
  });
  
  const handleModal = (editId = null) => {
    setModal({ show: true, editId });
    if (editId !== null) {
      const item = experienceList[editId];
      setForm({ ...item });
    } else {
      resetForm();
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { title, company, location, description, startMonth, startYear, endMonth, endYear, isWorking } = form;
    const missingRequired = !title || !company || !location || !description;
    const missingStart = !startMonth || !startYear;
    const missingEnd = !isWorking && (!endMonth || !endYear);
    
    if (missingRequired || missingStart || missingEnd) return;
    
    const experienceData = { ...form, id: modal.editId };
    dispatch(modal.editId ? editExperience(experienceData) : addExperience(form));
    setModal({ show: false, editId: null });
    resetForm();
  };

  const handleDelete = () => {
    dispatch(removeExperience(deleteId));
    setDeleteId(null);
  };

  const inputClass = "mt-1 block w-full rounded border border-gray-300 p-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500";
  const fieldConfigs = [
    { name: "title", label: "Title", placeholder: "Ex: React Developer" },
    { name: "company", label: "Company Name", placeholder: "Ex: Amazon" },
    { name: "location", label: "Location", placeholder: "Ex: Pune, India" },
    { name: "description", label: "Description", placeholder: "Ex: Worked as a Front-End Developer" }
  ];

  return (
    <div className="w-full max-w-2xl mx-auto p-4">
      <div className="bg-white border rounded-lg p-4">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-3 gap-2">
          <h3 className="text-lg font-medium">Experience</h3>
          <button onClick={() => handleModal()} className="flex items-center gap-1 text-blue-600 hover:text-blue-800 w-full sm:w-auto justify-center sm:justify-start">
            <MdAddCircleOutline size={20} /> Add Experience
          </button>
        </div>

        {experienceList?.map((item, id) => (
          <div key={id} className="border-b pt-3 pb-3 flex flex-col sm:flex-row">
            <div className="w-full sm:w-10/12 flex justify-start">
              <div className="px-3">
                <h5 className="m-0 text-base sm:text-lg">{item.title}</h5>
                <p className="text-muted m-0 text-sm">{item.company} • {item.startMonth} {item.startYear} {`${item.isWorking ? " - Present" : " - " + item.endMonth + " " + item.endYear}`}</p>
                <p className="text-muted m-0 text-sm">{item.location}</p>
                <p className="mt-1 text-sm sm:text-base">{item.description}</p>
              </div>
            </div>
            <div className="w-full sm:w-2/12 flex justify-end gap-2 mt-2 sm:mt-0">
              <MdEdit size={24} className="rounded edit cursor-pointer" onClick={() => handleModal(id)} />
              <MdDelete size={24} className="rounded edit cursor-pointer" onClick={() => setDeleteId(id)} />
            </div>
          </div>
        ))}
      </div>

      {modal.show && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/50" onClick={() => setModal({ show: false, editId: null })}></div>
          <div className="relative bg-white rounded shadow-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b p-3 sm:p-4">
              <h3 className="text-lg font-semibold">Experience</h3>
              <button onClick={() => setModal({ show: false, editId: null })} className="text-gray-500 hover:text-gray-700 text-xl">✕</button>
            </div>
            <form onSubmit={handleSubmit} className="p-4 sm:p-6">
              {fieldConfigs.map(field => (
                <div key={field.name} className="mb-3">
                  <label className="block text-sm font-medium mb-1">{field.label}</label>
                  <input required type="text" placeholder={field.placeholder} name={field.name} 
                    value={form[field.name]} onChange={(e) => setForm({...form, [e.target.name]: e.target.value})} 
                    className={inputClass} />
                </div>
              ))}
              <div className="mb-3">
                <label className="inline-flex items-center gap-2 text-sm">
                  <input type="checkbox" name="isWorking" checked={form.isWorking} 
                    onChange={(e) => setForm({...form, [e.target.name]: e.target.checked})} className="h-4 w-4" />
                  I am currently working in this role
                </label>
              </div>
              <div className="mb-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <div className="mb-2">
                      <label className="block text-sm font-medium">Start Month - Year</label>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <select name="startMonth" value={form.startMonth} 
                        onChange={(e) => setForm({...form, [e.target.name]: e.target.value})} 
                        className={inputClass}>
                        <Months />
                      </select>
                      <select name="startYear" value={form.startYear} 
                        onChange={(e) => setForm({...form, [e.target.name]: e.target.value})} 
                        className={inputClass}>
                        <Years />
                      </select>
                    </div>
                  </div>
                  <div>
                    <div className="mb-2">
                      <label className="block text-sm font-medium">End Month - Year</label>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <select name="endMonth" value={form.endMonth} 
                        onChange={(e) => setForm({...form, [e.target.name]: e.target.value})} 
                        disabled={form.isWorking} 
                        className={`${inputClass} disabled:bg-gray-100`}>
                        <Months />
                      </select>
                      <select name="endYear" value={form.endYear} 
                        onChange={(e) => setForm({...form, [e.target.name]: e.target.value})} 
                        disabled={form.isWorking} 
                        className={`${inputClass} disabled:bg-gray-100`}>
                        <Years />
                      </select>
                    </div>
                  </div>
                </div>
              </div>
              <button type="submit" className="rounded px-3 py-2 bg-black text-white">Save Changes</button>
            </form>
          </div>
        </div>
      )}

      {deleteId !== null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center text-center p-4">
          <div className="absolute inset-0 bg-black/50" onClick={() => setDeleteId(null)}></div>
          <div className="relative bg-white rounded shadow-lg w-full max-w-sm p-6">
            <h4 className="text-lg font-semibold mb-4">Are you sure you want to delete this experience?</h4>
            <div className="flex items-center justify-center gap-6">
              <button onClick={handleDelete} className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700">Yes</button>
              <button onClick={() => setDeleteId(null)} className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700">No</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Experience