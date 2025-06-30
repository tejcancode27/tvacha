import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/HomePage.css';

const skinConditions = [
  {
    name: 'Melanocytic Nevi (Moles)',
    cause: 'Genetic factors and sun exposure.',
    effect: 'Usually harmless, may darken or change.',
    symptoms: 'Brown/black spots with round shape.',
    treatment: 'Monitoring; removed if changes observed.'
  },
  {
    name: 'Melanoma',
    cause: 'DNA damage from UV radiation.',
    effect: 'Aggressive skin cancer, can spread quickly.',
    symptoms: 'Asymmetrical, irregular moles, color variation.',
    treatment: 'Surgical removal, chemotherapy, immunotherapy.'
  },
  {
    name: 'Benign Keratosis-like Lesions',
    cause: 'Aging or sun exposure.',
    effect: 'Non-cancerous skin growth.',
    symptoms: 'Warty, rough, or scaly patches.',
    treatment: 'Cryotherapy, laser, or left untreated.'
  },
  {
    name: 'Basal Cell Carcinoma',
    cause: 'Long-term sun exposure.',
    effect: 'Slow-growing cancer, rarely spreads.',
    symptoms: 'Pearly bumps, visible blood vessels.',
    treatment: 'Surgical excision, topical therapy.'
  },
  {
    name: 'Actinic Keratoses',
    cause: 'Chronic sun damage.',
    effect: 'Pre-cancerous; can turn into carcinoma.',
    symptoms: 'Rough, scaly patches, pink or red.',
    treatment: 'Cryotherapy, creams, photodynamic therapy.'
  },
  {
    name: 'Vascular Lesions',
    cause: 'Blood vessel malformations.',
    effect: 'Usually harmless birthmarks or spots.',
    symptoms: 'Red, purple, or blue discoloration.',
    treatment: 'Laser treatment or observation.'
  },
  {
    name: 'Dermatofibroma',
    cause: 'Minor skin injury or insect bite.',
    effect: 'Benign skin nodules.',
    symptoms: 'Firm, small bumps, often on legs and arms.',
    treatment: 'Usually no treatment required; removal if bothersome.'
  }
];

const HomePage = () => {
  return (
    <div
      style={{
        minHeight: '100vh',
        background: 'linear-gradient(to bottom, #2f2f2f, #005f8f)',
        color: 'white',
        padding: '20px',
        fontFamily: 'Arial, sans-serif',
      }}
    >
      {/* Top Toggle Login Option */}
      <div className="d-flex justify-content-end mb-3">
        <button className="btn btn-outline-light">Login</button>
      </div>

      {/* Centered Logo and Title */}
      <div className="text-center mb-5">
        <img
          src="/tvachalogo.jpg"
          alt="TVACHA Logo"
          style={{ height: '150px', marginBottom: '10px' }}
        />
        <h1 style={{ fontSize: '34px', fontWeight: 'bold', letterSpacing: '2px' }}>
          TVACHA
        </h1>
      </div>

      {/* Skin Conditions Section */}
      <div className="container">
        
        <div>
          {skinConditions.map((condition, index) => (
            <div key={index} style={{ marginBottom: '30px' }}>
              <h4 style={{ color: '#ffdd57', fontWeight: 'bold' }}>{condition.name}</h4>
              
              <br></br><p><strong>Cause:</strong> {condition.cause}</p>
             <p><strong>Effect:</strong> {condition.effect}</p>
              <p><strong>Symptoms:</strong> {condition.symptoms}</p>
              <p><strong>Treatment:</strong> {condition.treatment}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
