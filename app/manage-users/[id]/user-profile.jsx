// app/manage-users/[id]/user-profile.jsx
import React, { useEffect, useState } from 'react';
import UserMap from './usersMap';
import { use } from 'react';

const UserProfile = ({ params }) => {
  const { id } = use(params);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchUser() {
      try {
        const response = await fetch(
          `https://jsonplaceholder.typicode.com/users/${id}`
        );
        const data = await response.json();
        setUser(data);
      } catch (error) {
        console.error("Error fetching user:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchUser(); // 👈 Wrap this in useEffect
  }, [id]); // 👈 Only run this if ID changes

  if (loading) {
    return <p>Loading user...</p>;
  }

  if (!user) {
    return <p>User not found.</p>;
  }

  return (
    <div style={{ padding: '20px' }}>
      <h1 style={{ fontSize: '24px', fontWeight: 'bold' }}>{user.name}</h1>
      <p>Email: {user.email}</p>
      <p>
        Address: {user?.address?.street}, {user?.address?.city}
      </p>

      <div style={{ height: '300px', marginTop: '20px' }}>
        <UserMap
          latitude={parseFloat(user?.address?.geo?.lat)}
          longitude={parseFloat(user?.address?.geo?.lng)}
        />
      </div>
    </div>
  );
};

export default UserProfile;
