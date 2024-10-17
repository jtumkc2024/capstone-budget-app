import axios from "axios";
import { useEffect, useState } from "react";

interface User {
  id: number;
  username: string;
  password: string;
  email: string;
}

interface Project {
  project_id: string;
  user_id: string;
  project_title: string;
  project_description: string;
  renewable: string;
  priority: string;
  deadline: string;
}

export default function Dashboard() {
  const [users, setUsers] = useState<User[]>([]);
  const [totalUsers, setTotalUsers] = useState<number>(0);
  const [projects, setProjects] = useState<Project[]>([]);

  const fetchUsers = async () => {
    try {
      const response = await axios.get<User[]>('http://localhost:3001/api/users');
      setUsers(response.data);
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

  const fetchProject = async (id: number) => {
    try {
      const response = await axios.get<Project[]>(`http://localhost:3001/api/users/${id}`);
      setProjects(response.data);
    } catch (error) {
      console.error('There was an error fetching the project!', error);
    }
  }

  useEffect(() => {
    fetchTotalUsers();
    fetchUsers();
    fetchProject(1);

    console.log(users);
    console.log('projects', projects);
  }, []);

  return (
    <div className="h-screen bg-white text-center">
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
      <main className="flex-1 p-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-gray-100 p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-gray-700 mb-2">Total Users</h3>
            <p className="text-3xl font-bold text-blue-600">{totalUsers}</p>
          </div>
        </div>
        <div className="mt-8 bg-gray-100 p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold text-gray-700 mb-4">Projects</h3>
          <ul className="flex grid-flow-row gap-6">
            {projects.map((project) => (
              <li key={project.project_id} className="flex items-center justify-between py-2">
                <div>
                  <h4 className="text-lg font-semibold text-gray-800">{project.project_title}</h4>
                  <p className="text-sm text-gray-600">{project.project_description}</p>
                  <div className="flex items-center justify-center space-x-5">
                    <div>
                      <p className="text-sm text-gray-600">Priority</p>
                      <p className="text-sm text-gray-600">{project.priority}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Renewable</p>
                      <p className="text-sm text-gray-600">{project.renewable}</p>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </main>
    </div>
  )
}
