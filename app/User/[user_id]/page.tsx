import React from 'react'

async function page ({params}: { params: Promise<{ user_id: string }> }) {

    const {user_id} = await params;
  return (
    <div>
      <h1>User Profile</h1>
      <p>User ID: {user_id}</p>
    </div>
  )
}

export default page
