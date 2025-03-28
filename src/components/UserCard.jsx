import React from 'react';

const UserCard = ({ user, onEdit, onDelete }) => {
  return (
    <div className="bg-[#24183A]  shadow-md rounded-lg p-4 flex flex-col items-center">
      <img 
        src={user.avatar} 
        alt={`${user.first_name} ${user.last_name}`} 
        className="w-24 h-24 rounded-full mb-4 border-2 p-1 border-gray-400 "
      />
      <h2 className="text-white text-xl font-bold">{`${user.first_name} ${user.last_name}`}</h2>
      <p className="text-gray-400 mb-4">{user.email}</p>
      <div className="w-full flex  flex-col gap- items-center space-x-2">
        <button 
          onClick={onEdit}
          className="w-[80%] bg-[#24183A] border-2 border-[#190D28] cursor-pointer hover:bg-[#190D28] text-white py-2 px-4 rounded-full"
        >
          Edit
        </button>
        <button 
          onClick={onDelete}
          className="hover:text-gray-300 cursor-pointer text-gray-500 underline "
        >
          <small>Delete</small>
          
        </button>
      </div>
    </div>
  );
};

export default UserCard;

