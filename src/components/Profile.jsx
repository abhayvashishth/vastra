import { useContext } from 'react';
import { SupabaseContext } from '../context/SupabaseContext';

const Profile = ({ name, bio, profilePicture, skills, email }) => {
    const {logout, loading} = useContext(SupabaseContext)
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full">
        <div className="flex flex-col items-center mb-6">
          {profilePicture && (
            <img
              src={profilePicture}
              alt="Profile"
              className="w-32 h-32 rounded-full mb-4 object-cover"
            />
          )}
          <h2 className="text-2xl font-bold">{name || 'User'}</h2>
          {bio && <p className="text-gray-600 mt-2 text-center">{bio}</p>}
        </div>

        <div className="mb-4">
          <h3 className="text-lg font-semibold mb-2">Skills</h3>
          {skills && skills.length > 0 ? (
            <ul className="list-disc list-inside text-gray-700">
              {skills.map((skill, index) => (
                <li key={index}>{skill}</li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500">No skills listed.</p>
          )}
        </div>

        {/* Example: Contact Information */}
        <div className="mb-4">
          <h3 className="text-lg font-semibold mb-2">Contact</h3>
          <p className="text-gray-700">Email: {email}</p>
          <p className="text-gray-700">Website: yourwebsite.com</p>
          {/* Add more contact information as needed */}
        </div>

        {/* Example: Edit Profile Button */}
        <div className="mt-6 text-center flex flex-col gap-1">
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md">
            Edit Profile
          </button>
          <button disabled={loading} onClick={logout} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-md">
             {
              loading? 'Logging Out...' : 'Logout'
             }
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;