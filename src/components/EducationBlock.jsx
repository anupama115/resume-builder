import { useState } from 'react'
import { MdAddCircleOutline, MdEdit, MdDelete } from 'react-icons/md';
import { useSelector, useDispatch } from 'react-redux';
import { addEducation, editEducation, removeEducation } from '../store/slices/EducationSlice';

function Education() {
  const [modal, setModal] = useState({ show: false, editId: null });
  const [deleteId, setDeleteId] = useState(null);
  const [form, setForm] = useState({
    institute: "", degree: "", grade: "", fieldOfStudy: "", startYear: "", endYear: ""
  });

  const educationList = useSelector(state => state.education);
  const dispatch = useDispatch();

  const resetForm = () => setForm({ institute: "", degree: "", grade: "", fieldOfStudy: "", startYear: "", endYear: "" });
  
  const handleModal = (editId = null) => {
    setModal({ show: true, editId });
    if (editId !== null) {
      const item = educationList[editId];
      setForm({ ...item, startYear: item.startYear, endYear: item.endYear });
    } else {
      resetForm();
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { institute, degree, fieldOfStudy, grade, startYear, endYear } = form;
    if (!institute || !degree || !fieldOfStudy || !grade || !startYear || !endYear) return;
    
    const educationData = { ...form, id: modal.editId };
    dispatch(modal.editId ? editEducation(educationData) : addEducation(form));
    setModal({ show: false, editId: null });
    resetForm();
  };

  const handleDelete = () => {
    dispatch(removeEducation(deleteId));
    setDeleteId(null);
  };

  const inputClass = "mt-1 block w-full rounded border border-gray-300 p-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500";
  const fieldConfigs = [
    { name: "institute", label: "School / College", placeholder: "Ex: Government Engineering College" },
    { name: "degree", label: "Degree", placeholder: "Ex: Bachelor of Engineering" },
    { name: "fieldOfStudy", label: "Field of study", placeholder: "Ex: Computer Engineering" },
    { name: "grade", label: "Grade", placeholder: "Ex: 8.5/10 CGPA" }
  ];

  return (
    <div className="w-full max-w-2xl mx-auto p-4">
      <div className="bg-white border rounded-lg p-4">
        <div className="flex justify-between items-center mb-3">
          <h3 className="text-lg font-medium">Education</h3>
          <button onClick={() => handleModal()} className="flex items-center gap-1 text-blue-600 hover:text-blue-800">
            <MdAddCircleOutline size={20} /> Add
          </button>
        </div>

        {educationList?.map((item, id) => (
          <div key={id} className="border-b pt-3 pb-3 flex flex-wrap">
            <div className="w-full md:w-10/12 flex justify-start">
              <div className="px-3">
                <h5 className="m-0">{item.institute}</h5>
                <p className="text-muted m-0">{item.degree} • {item.fieldOfStudy}</p>
                <p className="text-muted m-0">{item.startYear} - {item.endYear} • Grade: {item.grade}</p>
              </div>
            </div>
            <div className="w-full md:w-2/12 flex flex-wrap justify-end gap-2">
              <MdEdit size={24} className="rounded edit cursor-pointer" onClick={() => handleModal(id)} />
              <MdDelete size={24} className="rounded edit cursor-pointer" onClick={() => setDeleteId(id)} />
            </div>
          </div>
        ))}
      </div>

      {modal.show && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/50" onClick={() => setModal({ show: false, editId: null })}></div>
          <div className="relative bg-white rounded shadow-lg w-11/12 md:w-2/3 max-h-[80vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b p-3">
              <h3 className="text-lg font-semibold">Education</h3>
              <button onClick={() => setModal({ show: false, editId: null })} className="text-gray-500 hover:text-gray-700">✕</button>
            </div>
            <form onSubmit={handleSubmit} className="p-4">
              {fieldConfigs.map(field => (
                <div key={field.name} className="mb-3">
                  <label className="block text-sm font-medium">{field.label}</label>
                  <input required type="text" placeholder={field.placeholder} name={field.name} 
                    value={form[field.name]} onChange={(e) => setForm({...form, [e.target.name]: e.target.value})} 
                    className={inputClass} />
                </div>
              ))}
              <div className="mb-3">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {['startYear', 'endYear'].map(field => (
                    <div key={field}>
                      <label className="block text-sm font-medium">{field === 'startYear' ? 'Start - Year' : 'End - Year'}</label>
                      <select name={field} value={form[field]} onChange={(e) => setForm({...form, [e.target.name]: e.target.value})} className={inputClass}>
                        <option value="">Select Year</option>
                        {Array.from({length: 50}, (_, i) => new Date().getFullYear() - i).map(year => 
                          <option key={year} value={year}>{year}</option>
                        )}
                      </select>
                    </div>
                  ))}
                </div>
              </div>
              <button type="submit" className="rounded px-3 py-2 bg-black text-white">Save Changes</button>
            </form>
          </div>
        </div>
      )}

      {deleteId !== null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center text-center">
          <div className="absolute inset-0 bg-black/50" onClick={() => setDeleteId(null)}></div>
          <div className="relative bg-white rounded shadow-lg w-11/12 sm:w-96 p-6">
            <h4 className="text-lg font-semibold mb-4">Are you sure?</h4>
            <div className="flex items-center justify-center gap-6">
              <button onClick={handleDelete} className="text-green-600 hover:text-green-800">✓</button>
              <button onClick={() => setDeleteId(null)} className="text-red-600 hover:text-red-800">✕</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Education;