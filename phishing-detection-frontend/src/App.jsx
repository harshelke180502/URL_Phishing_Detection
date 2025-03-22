import React from 'react';
import PhishingForm from './components/PhishingForm';
import './App.css';

const App = () => {
  return (
    <div className="app-container">
      <h1>Phishing Detection App</h1>
      <PhishingForm />
    </div>
  );
};

export default App;
