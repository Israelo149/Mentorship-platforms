import React from 'react'

const Footer = () => {
  return (
    <footer style={{ padding: '1rem', backgroundColor: '#222', color: '#fff', marginTop: 'auto', textAlign: 'center' }}>
      <p>&copy; {new Date().getFullYear()} Mentorship Platform. All rights reserved.</p>
    </footer>
  )
}

export default Footer
