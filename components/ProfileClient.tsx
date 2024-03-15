'use client';

// ChatGPT next Image LCP
import Image from 'next/image';
import { useUser } from '@auth0/nextjs-auth0/client';
import React from 'react';

const ProfileClient = ({ user }: { user: { name: string; email: string; picture: string | undefined } }) => {
  return (
    <div>
      {user && (
        <div>
          {/* Replace <img> with <Image /> */}
          <Image src={user.picture ?? '/placeholder-image.jpg'} alt={user.name} width={200} height={200} />
          <h2>{user.name}</h2>
          <p>{user.email}</p>
        </div>
      )}
    </div>
  );
};

export default ProfileClient;