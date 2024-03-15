'use client';

import { useUser } from '@auth0/nextjs-auth0/client';
import React from 'react';

export default function ProfileClient() {
  const { user, error, isLoading } = useUser();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;

  return (
<div>
  {user && (
    <div>
      {/* Use optional chaining to safely access user.picture */}
      <img src={user.picture ?? '/placeholder-image.jpg'} alt={user.name} />
      <h2>{user.name}</h2>
      <p>{user.email}</p>
    </div>
  )}
</div>
  );
}