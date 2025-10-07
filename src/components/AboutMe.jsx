import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { MdEdit } from 'react-icons/md';
import { setAboutMe } from '../store/slices/AboutMeSlice';

function AboutMe() {
    const [isEditing, setIsEditing] = useState(false);
    const about = useSelector(state => state.aboutMe);
    const dispatch = useDispatch();

    const handleSave = () => {
        setIsEditing(false);
    };

    const handleEdit = () => {
        setIsEditing(true);
    };

    return (
        <div className="w-full max-w-2xl mx-auto p-4">
            <div className="bg-white border rounded-lg p-4">
                <div className="flex justify-between items-center mb-3">
                    <h3 className="text-lg font-medium">About Me</h3>
                    <button 
                        onClick={isEditing ? handleSave : handleEdit}
                        className="flex items-center gap-1 text-blue-600 hover:text-blue-800"
                    >
                        <MdEdit size={20} />
                        {isEditing ? 'Save' : 'Edit'}
                    </button>
                </div>
                
                {isEditing ? (
                    <textarea
                        value={about}
                        onChange={(e) => dispatch(setAboutMe(e.target.value))}
                        placeholder="Write about yourself..."
                        className="w-full p-3 border rounded-md resize-none"
                        rows={4}
                    />
                ) : (
                    <p className="text-gray-700 leading-relaxed">
                        {about || 'Click Edit to add information about yourself.'}
                    </p>
                )}
            </div>
        </div>
    );
}

export default AboutMe;