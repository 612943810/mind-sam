import React, { ChangeEvent, FormEvent, useState } from 'react';
import Navigation from '../navigation/Navigation';
import Button from '../Button/Button';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

interface RegisterData {
  username: string;
  password: string;
  dateofbirth: string;
}

export default function Register() {
  const [success, setSuccess] = useState('');
  const [user, setUser] = useState<RegisterData>({
    username: '',
    password: '',
    dateofbirth: ''
  });

  const navLink = useNavigate();

  const changeAction = (event: ChangeEvent<HTMLInputElement>) => {
    setUser({ ...user, [event.target.name]: event.target.value });
  };

  const submitData = (event: FormEvent) => {
    event.preventDefault();
    const fullData = { ...user };

    axios
      .post('http://localhost:3000/register', fullData)
      .then((res) => {
        console.log('Register response:', res.data);
        setSuccess(res.data);
        try {
          setUser({ username: '', password: '', dateofbirth: '' });
          if (res.status === 200 && (res.data.result === 'User Registered' || res.data.token)) {
            localStorage.setItem('user', JSON.stringify({ username: fullData.username }));
            navLink(`/inventory/${fullData.username}`);
          }
        } catch (inError) {
          console.log(inError);
        }
      })
      .catch((err) => {
        console.error(err);
        setSuccess('An error occurred');
      });
  };

  if (!success) {
    return (
      <div className="container mx-auto p-6">
        <form onSubmit={submitData} className="bg-white p-6 rounded-lg shadow max-w-md mx-auto space-y-4">
          <h1 className="text-2xl font-semibold text-center text-indigo-900">Please register for an account.</h1>
          <div>
            <label className="block text-sm font-medium text-gray-700">User Name</label>
            <input
              type="text"
              name="username"
              value={user.username}
              onChange={changeAction}
              className="mt-1 block w-full border rounded px-3 py-2"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="text"
              name="password"
              value={user.password}
              onChange={changeAction}
              className="mt-1 block w-full border rounded px-3 py-2"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Date of Birth</label>
            <input
              type="date"
              name="dateofbirth"
              value={user.dateofbirth}
              onChange={changeAction}
              className="mt-1 block w-full border rounded px-3 py-2"
            />
          </div>
          <div className="text-center">
            <Button buttonType="submit" text="Register" backgroundColor="#084b83ff" color="#fbc3bcff" />
          </div>
        </form>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6">
      <Navigation />
      <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow text-center">{success}</div>
    </div>
  );
}
