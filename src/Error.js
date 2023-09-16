import React from 'react';

const containerStyle = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  minHeight: '100vh', // Ensure the container takes up the full viewport height
};

function PageNotFound() {
  return (
    <div style={containerStyle}>
      <h1>404| Page Not Found</h1>
    </div>
  );
}

export default PageNotFound;
