
import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../Button/Button';

const RegistrationComplete: React.FC = () => {
  return (
    <div className="container mx-auto p-6">
      <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow text-center">
        <h1 className="text-2xl font-semibold text-indigo-900 mb-4">Registration Successful!</h1>
        <p className="text-gray-700 mb-6">Thank you for registering. You can now log in with your new account.</p>
        <Link to="/login">
          <Button buttonType="button" text="Go to Login" backgroundColor="#084b83ff" color="#fbc3bcff" />
        </Link>
      </div>
    </div>
  );
};

export default RegistrationComplete;
