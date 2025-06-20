import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import './Login.css';
import Navigation from '../navigation/Navigation';
import Button from '../Button/Button';
import { useNavigate } from 'react-router';
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
        setLoginData(res.data.result || '');
        if (res.data.result === "Success") {
          localStorage.setItem('user', JSON.stringify(fullData));
          setUser(fullData); 
          console.log("Login successful, navigating to inventory page...");
          navLink(`/inventory/${fullData.username}`);
        } else if (res.data.result === "User not found") {
          navLink(`/login`);
          setFormStatus(true);
        }

        try {
          setUser({
            username: '',
            password: '',
          })
        } catch (inError) {
          console.log(inError)
        }
      })
  }

  return (
    <>
      <Navigation />
      <form className='formDesign' onSubmit={submitData}>
        <h1 className='title'>Login to your account</h1>
        <b />
        <label> User Name </label>
        <br />
        <input type='text' name='username' value={user.username} onChange={changeAction} />
        <br />
        <br />
        <label> Password</label>
        <br />
<input type='password' name='password' value={user.password} onChange={changeAction} />
     {typeof loginData === 'string' && loginData && <h1>{loginData}</h1>}
        <br />
        <div>
          <Button buttonType='submit' text="Login" backgroundColor='#084b83ff' color='#fbc3bcff' />
        </div>
      </form>
    </>
  );
}



