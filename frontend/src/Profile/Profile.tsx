import React from 'react';
import Navigation from "../navigation/Navigation";
import { useParams } from 'react-router-dom';

export default function Profile() {
  const params = useParams();
  const username = params.username || 'Guest';
  console.log('Profile params:', params);
  return (
    <>
      <div className="container mx-auto p-6 space-y-6">
        <header className="text-center">
          <h1 className="text-3xl font-bold">Profile</h1>
        </header>
        <section className="bg-white shadow-md rounded-lg p-4">
          <h2>Welcome {username}</h2>
        </section>
      </div>
    </>
  );
}