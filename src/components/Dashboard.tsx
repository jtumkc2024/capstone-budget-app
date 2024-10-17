import axios from "axios";
import { useEffect, useState } from "react";

interface User {
  id: number;
  username: string;
  password: string;
  email: string;
}

export default function Dashboard() {
  const [users, setUsers] = useState<User[]>([]);
  const [totalUsers, setTotalUsers] = useState<number>(0);

  const fetchUsers = async () => {
    try {
      const response = await axios.get<User[]>('http://localhost:3001/api/users');
      setUsers(response.data);
      console.log(users);
    } catch (error) {
      console.error('There was an error fetching the data!', error);
    }
  };

  const fetchTotalUsers = async () => {
    try {
      const response = await axios.get<{ total_users: number }>('http://localhost:3001/api/users/count');
      setTotalUsers(response.data.total_users);
    } catch (error) {
      console.error('There was an error fetching the total number of users!', error);
    }
  };

  useEffect(() => {
    fetchTotalUsers();
    fetchUsers();
  }, []);

  return (
    <div className="h-screen bg-white text-center">
      {/* <aside className="w-64 bg-white shadow-md">
        <div className="p-4">
        </div>
        <nav className="mt-6">
        Navigation
        </nav>
        </aside> */}
      <a className="absolute left-0 top-0" href="https://www.commercebank.com/" target="_blank">
        <img className="w-48" src="https://seekvectorlogo.com/wp-content/uploads/2019/12/commerce-bank-vector-logo.png" />
      </a>
      <div className="flex justify-center align-middle h-28 w-full">
        <h1 className="text-3xl font-semibold text-gray-800 py-6">Budget App</h1>
      </div>
      <nav className="w-full">
        <ul className="flex text-gray-700 justify-center w-full">
            <li className="w-1/4 border-b-4 border-white hover:border-green-800">
                <button className="p-4 w-full">
                    User Profile/Settings
                </button>
            </li>
            <li className="w-1/4 border-b-4 border-white hover:border-green-800">
                <button className="p-4 w-full">
                    New Project
                </button>
            </li>
            <li className="w-1/4 border-b-4 border-white hover:border-green-800">
                <button className="p-4 w-full">
                    Add a Card
                </button>
            </li>
        </ul>
      </nav>
      {/* Main Content */}
      <main className="flex-1 p-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Dashboard Cards */}
          <div className="bg-gray-100 p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-gray-700 mb-2">Total Users</h3>
            <p className="text-3xl font-bold text-blue-600">{totalUsers}</p>
          </div>
        </div>
        {/* Placeholder for more dashboard content */}
        <div className="mt-8 bg-gray-100 p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold text-gray-700 mb-4">Recent Activity</h3>
          <p className="text-gray-600">Your recent activity will be displayed here.</p>
        </div>
      </main>
    </div>
  )
}
