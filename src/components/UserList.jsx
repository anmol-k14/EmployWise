// src/components/UserList.js
import React, { useState, useEffect } from 'react';
import { fetchUsers, updateUser, deleteUser } from '../services/api';
import { useAuth } from '../context/AuthContext';
import UserCard from './UserCard';
import EditUserModal from './EditUserModel';

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const { logout } = useAuth();

  useEffect(() => {
    loadUsers(currentPage);
  }, [currentPage]);

  const loadUsers = async (page) => {
    try {
      const response = await fetchUsers(page);
      setUsers(response.data.data);
      setTotalPages(response.data.total_pages);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const handleEdit = (user) => {
    setSelectedUser(user);
    setIsEditModalOpen(true);
  };

  const handleDelete = async (userId) => {
    try {
      await deleteUser(userId);
      setUsers(users.filter(user => user.id !== userId));
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  const handleUpdateUser = async (updatedUser) => {
    try {
      await updateUser(updatedUser.id, updatedUser);
      setUsers(users.map(user => 
        user.id === updatedUser.id ? {...user, ...updatedUser} : user
      ));
      setIsEditModalOpen(false);
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

  return (
    <div className="bg-[#190D28] flex flex-col w-full h-screen overflow-auto [&::-webkit-scrollbar]:hidden">
      <div className="p-4 flex justify-between items-center mb-4">
        <h1 className="text-2xl text-white font-bold">User Management</h1>
        <button 
          onClick={logout}
          className="border-2 border-red-500 cursor-pointer text-red-500 hover:bg-red-700 hover:text-white  py-2 px-4 rounded-full"
        >
          Logout
        </button>
      </div>
      
      <div className='flex justify-center items-center flex-grow'>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-[80%]">
        {users.map(user => (
          <UserCard 
            key={user.id} 
            user={user} 
            onEdit={() => handleEdit(user)}
            onDelete={() => handleDelete(user.id)}
          />
        ))}
      </div>
      </div>


      <div className="flex justify-center mt-4 mb-4">
        {[...Array(totalPages)].map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentPage(index + 1)}
            className={`mx-1 px-3 py-1 rounded ${
              currentPage === index + 1 
                ? 'bg-[#24183A] text-white' 
                : 'text-white'
            }`}
          >
            {index + 1}
          </button>
        ))}
      </div>

      {isEditModalOpen && (
        <EditUserModal
          user={selectedUser}
          onClose={() => setIsEditModalOpen(false)}
          onUpdate={handleUpdateUser}
        />
      )}
    </div>
  );
};

export default UserList;