import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import Navigation from '../navigation/Navigation';
import Button from '../Button/Button';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default interface Login {
  username: string,
  password: string,
}

export default function Login() {
  const [success, setSuccess] = useState('');
  const [loginData, setLoginData] = useState('');
  const [formStatus, setFormStatus] = useState(false);
  const [user, setUser] = useState<Login>({
    username: '',
    password: '',
  });

  let navLink = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);
      navLink(`/inventory/${parsedUser.username}`);
    }
  }, [navLink]);

  const changeAction = (event: ChangeEvent<HTMLInputElement>) => {
    setUser({ ...user, [event.target.name]: event.target.value });
  }

  const submitData = async (event: FormEvent) => {
    event.preventDefault();
    const fullData = {
      username: user.username,
      password: user.password
    }
    await axios.post(`http://localhost:3000/login`, fullData)
      .then((res: any) => {
        console.log('Login response:', res.data);
        setLoginData(res.data.result || '');
        if (res.status === 200 && res.data.result === "Success") {
          localStorage.setItem('user', JSON.stringify(fullData));
          setUser(fullData);
          console.log("Login successful, navigating to inventory page...");
          navLink(`/inventory/${fullData.username}`);
        } else if (res.data.result === "User not found") {
          setFormStatus(true);
        } else if (res.status === 200) {
          if (res.data && res.data.token) {
            localStorage.setItem('user', JSON.stringify(fullData));
            navLink(`/inventory/${fullData.username}`);
          }
        }

        setUser({ username: '', password: '' });
      })
  }

  return (
    <div className="container mx-auto p-6">
      <Navigation />
      <form onSubmit={submitData} className="bg-white p-6 rounded-lg shadow max-w-md mx-auto space-y-4">
        <h1 className="text-2xl font-semibold text-center text-indigo-900">Login to your account</h1>
        <div>
          <label className="block text-sm font-medium text-gray-700">User Name</label>
          <input type="text" name="username" value={user.username} onChange={changeAction} className="mt-1 block w-full border rounded px-3 py-2" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Password</label>
          <input type="password" name="password" value={user.password} onChange={changeAction} className="mt-1 block w-full border rounded px-3 py-2" />
        </div>
        {typeof loginData === 'string' && loginData && <div className="text-center text-sm text-red-600">{loginData}</div>}
        <div className="text-center">
          <Button buttonType='submit' text="Login" backgroundColor='#084b83ff' color='#fbc3bcff' />
        </div>
      </form>
    </div>
  );
}



