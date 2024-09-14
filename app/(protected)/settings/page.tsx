import React from 'react';
import { auth, signOut as authSignOut } from '@/auth';

export default async function SettingsPage() {

  const session = await auth();
 
  return (
    <div>
      {JSON.stringify(session)}
      <form action={async () => {
        "use server";

        await authSignOut();
      }}>
        <button 
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700"
        >
          Sign Out
        </button>
      </form>
    </div>
  )
}
