import React from 'react';
import { useNavigate } from 'react-router-dom';

function Home() {
  const navigate = useNavigate();

  const onRunButtonClicked = () => {
    navigate('/editor');
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Welcome to Banana.js Game Engine</h1>
      <p style={styles.description}>
        Start creating amazing games with Banana.js. Click below to run the
        editor.
      </p>
      <button style={styles.button} onClick={onRunButtonClicked}>
        Run Editor
      </button>
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    backgroundColor: 'yellow',
  },
  title: {
    fontSize: '2.5rem',
    marginBottom: '1rem',
    color: 'gray',
  },
  description: {
    fontSize: '1.2rem',
    marginBottom: '2rem',
    textAlign: 'center',
    color: 'gray',
  },
  button: {
    padding: '1rem 2rem',
    fontSize: '1.2rem',
    fontWeight: 'bold',
    backgroundColor: 'white',
    color: 'gray',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
  },
};

export default Home;
