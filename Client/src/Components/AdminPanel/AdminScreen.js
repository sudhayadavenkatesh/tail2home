import React, { useState } from 'react'
import PostingPets from './PostingPets'
import AdoptingRequests from './AdoptingRequests'
import AdoptedHistory from './AdoptedHistory'
import ApprovedRequests from './ApprovedRequests'
import Dashboard from './Dashboard'
import AddBlog from './AddBlogPage'


const AdminScreen = () => {
  const [screen, setScreen] = useState('dashboard')
  const [showBlogOptions, setShowBlogOptions] = useState(false)

  return (
    <div className='admin-screen-container'>
      <div className='admin-screen-left'>
        <div>
          <p onClick={() => setScreen('dashboard')}>Dashboard</p>
          <p onClick={() => setScreen('postingPet')}>Post Pet Requests</p>
          <p onClick={() => setScreen('approvedRequests')}>Approved Pets</p>
          <p onClick={() => setScreen('adoptingPet')}>Adoption Requests</p>
          <p onClick={() => setScreen('adoptedHistory')}>Adopted History</p>
          <p onClick={() => setShowBlogOptions(!showBlogOptions)}>Blog Handler</p>
          {showBlogOptions && (
            <div className='blog-options'>
              <p onClick={() => setScreen('addBlog')}>Add Blog</p>
             
            </div>
          )}
        </div>
      </div>
      <div className='admin-screen-right'>
        {screen === 'dashboard' && <Dashboard />}
        {screen === 'postingPet' && <PostingPets />}
        {screen === 'approvedRequests' && <ApprovedRequests />}
        {screen === 'adoptingPet' && <AdoptingRequests />}
        {screen === 'adoptedHistory' && <AdoptedHistory />}
        {screen === 'addBlog' && <AddBlog />}
    
      </div>
    </div>
  )
}

export default AdminScreen