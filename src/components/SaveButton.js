import React from 'react';

const SaveButton = ({ isChanged }) => {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', margin: '20px 0' }}>
      <button
        disabled={!isChanged}
        style={{
          cursor: 'pointer',
          padding: '2vh 10vw',
          border: 'none',
          borderRadius: '12px',
          backgroundColor: '#8A4893',
          fontSize: '18px',
          color: 'white',
          transition: 'color 0.3s, background-color 0.3s',
        }}
      >
        Save And Next
      </button>
    </div>
  );
};

export default SaveButton;
