import React from 'react';
import Navigation from "../navigation/Navigation";
import { useParams } from 'react-router-dom';

export default function Profile() {
  const params = useParams();
  const username = params.username || 'Guest';
  
  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto p-6 space-y-8">
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800">Profile</h1>
          <p className="text-gray-600 mt-2">Welcome back, {username}!</p>
        </header>

        <div className="grid md:grid-cols-3 gap-6">
          {/* Profile Card */}
          <div className="md:col-span-1">
            <div className="bg-white shadow-lg rounded-lg overflow-hidden">
              <div className="p-6 text-center">
                <div className="w-32 h-32 mx-auto bg-gray-300 rounded-full mb-4">
                  {/* Add profile image here */}
                  <img 
                    src={`https://ui-avatars.com/api/?name=${username}&background=random`}
                    alt="Profile"
                    className="w-full h-full rounded-full object-cover"
                  />
                </div>
                <h2 className="text-xl font-semibold text-gray-800">{username}</h2>
                <p className="text-gray-600 mt-2">Member since 2023</p>
              </div>
              <div className="border-t border-gray-200 px-6 py-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Posts</span>
                  <span className="font-semibold">24</span>
                </div>
                <div className="flex justify-between items-center mt-2">
                  <span className="text-gray-600">Following</span>
                  <span className="font-semibold">142</span>
                </div>
                <div className="flex justify-between items-center mt-2">
                  <span className="text-gray-600">Followers</span>
                  <span className="font-semibold">98</span>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content Area */}
          <div className="md:col-span-2">
            <div className="bg-white shadow-lg rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-4">About Me</h3>
              <p className="text-gray-600">
                Share your story here. Tell others about yourself and what you're interested in.
              </p>
              <div className="mt-6">
                <h4 className="font-semibold text-gray-700 mb-2">Interests</h4>
                <div className="flex flex-wrap gap-2">
                  {['Technology', 'Reading', 'Travel', 'Photography'].map((interest) => (
                    <span 
                      key={interest}
                      className="px-3 py-1 bg-blue-100 text-blue-600 rounded-full text-sm"
                    >
                      {interest}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="bg-white shadow-lg rounded-lg p-6 mt-6">
              <h3 className="text-xl font-semibold mb-4">Recent Activity</h3>
              <div className="space-y-4">
                {/* Activity items */}
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-green-400 rounded-full mr-3"></div>
                  <p className="text-gray-600">Updated profile information</p>
                  <span className="ml-auto text-sm text-gray-500">2 days ago</span>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-blue-400 rounded-full mr-3"></div>
                  <p className="text-gray-600">Posted a new article</p>
                  <span className="ml-auto text-sm text-gray-500">5 days ago</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}