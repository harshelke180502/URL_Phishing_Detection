import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './PhishingForm.css';

const PhishingForm = () => {
  const minMaxValues = {
    "PC 1":  [-4.226687, 35.570699],
    "PC 2":  [-6.240969, 19.595125],
    "PC 3":  [-9.255734, 4.348557],
    "PC 4":  [-6.133033, 17.631820],
    "PC 5":  [-19.720613, 6.838719],
    "PC 6":  [-11.506064, 9.989060],
    "PC 7":  [-7.914501, 8.575106],
    "PC 8":  [-8.058803, 6.893014],
    "PC 9":  [-11.418812, 20.032998],
    "PC 10": [-17.845098, 7.102690],
    "PC 11": [-11.465496, 9.249313],
    "PC 12": [-9.903477, 13.642979],
    "PC 13": [-9.547110, 18.195919],
    "PC 14": [-9.175750, 19.102498],
    "PC 15": [-8.568329, 14.715398],
    "PC 16": [-19.128769, 10.512718],
    "PC 17": [-22.821374, 19.902218],
    "PC 18": [-22.927868, 26.967211],
    "PC 19": [-8.241090, 30.677738],
    "PC 20": [-10.248527, 19.360769],
    "PC 21": [-27.409699, 12.671892],
    "PC 22": [-11.000425, 14.970098],
    "PC 23": [-10.068894, 25.118128],
    "PC 24": [-7.343534, 53.983427],
    "PC 25": [-15.456364, 15.937668],
    "PC 26": [-23.209794, 41.329869],
    "PC 27": [-21.298691, 24.372498],
    "PC 28": [-13.829250, 18.715145],
    "PC 29": [-9.689507, 16.133795],
    "PC 30": [-7.644466, 20.702900],
    "PC 31": [-13.495337, 21.992436],
    "PC 32": [-19.593295, 16.457143],
    "PC 33": [-7.853126, 21.980270],
    "PC 34": [-9.570675, 26.099441],
    "PC 35": [-10.530712, 10.396443],
    "PC 36": [-7.781389, 6.753716],
    "PC 37": [-7.844132, 13.416504],
    "PC 38": [-13.531582, 9.515519],
    "PC 39": [-5.875029, 8.889578],
    "PC 40": [-7.596212, 6.423875],
    "PC 41": [-9.081878, 6.705752],
    "PC 42": [-10.903687, 5.318180],
    "PC 43": [-5.985685, 5.720045],
    "PC 44": [-6.404823, 11.772116],
    "PC 45": [-5.653458, 10.121095],
    "PC 46": [-6.391635, 4.561464],
    "PC 47": [-6.499770, 7.582459],
    "PC 48": [-8.332857, 11.669335],
    "PC 49": [-6.371751, 6.188516],
    "PC 50": [-5.319383, 5.607345],
    "PC 51": [-5.811632, 10.358545],
    "PC 52": [-5.954376, 6.405089],
    "PC 53": [-5.082226, 4.622200],
    "PC 54": [-3.173840, 3.508624],
    "PC 55": [-7.041776, 4.045013],
    "PC 56": [-6.269651, 6.419501],
    "PC 57": [-6.179244, 5.944391],
    "PC 58": [-5.103857, 8.538117],
  };

  const generateRandomValues = () => {
    const newFormData = {};
    Object.keys(minMaxValues).forEach((key) => {
      const [min, max] = minMaxValues[key];
      newFormData[key] = (Math.random() * (max - min) + min).toFixed(6);
    });
    return newFormData;
  };

  const [formData, setFormData] = useState(generateRandomValues());
  const [prediction, setPrediction] = useState(null);
  const [error, setError] = useState(null);

  // Generate random values on mount
  useEffect(() => {
    setFormData(generateRandomValues());
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formattedData = Object.fromEntries(
      Object.entries(formData).map(([key, value]) => [key, parseFloat(value) || 0])
    );

    try {
      const response = await axios.post('http://localhost:5000/predict', formattedData);
      setPrediction(response.data.prediction);
      setError(null);
    } catch (err) {
      setError('Error while making prediction');
      console.error(err);
    }
  };

  // New function to randomize values
  const handleRandomize = () => {
    setFormData(generateRandomValues());
  };

  return (
    <div className="form-container">
      <h2>Phishing Detection Form</h2>
      <form onSubmit={handleSubmit} className="feature-form">
        <div className="features-grid">
          {Object.keys(formData).map((key) => (
            <div key={key} className="feature-input">
              <label htmlFor={key}>{key}:</label>
              <input
                type="text"
                id={key}
                name={key}
                value={formData[key]}
                onChange={handleChange}
                placeholder={`Enter ${key}`}
                required
              />
            </div>
          ))}
        </div>
        <div className="button-group">
          <button type="submit" className="submit-button">Predict</button>
          <button type="button" className="randomize-button" onClick={handleRandomize}>
            Randomize Values
          </button>
        </div>
      </form>
      {prediction !== null && (
        <div className={`prediction-result ${prediction ? 'phishing' : 'legitimate'}`}>
          <h3>Prediction: {prediction ? 'Phishing' : 'Legitimate'}</h3>
        </div>
      )}
      {error && <p className="error-message">{error}</p>}
    </div>
  );
};

export default PhishingForm;
