// src/Create.js
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaUser, FaClock, FaImage } from 'react-icons/fa';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Create.css'; // optional for extra styles

function Create() {
  const [photo, setPhoto] = useState(null);
  const [name, setName] = useState('');
  const [uniqueName, setUniqueName] = useState('');
  const [errors, setErrors] = useState({});
  const [previewUrl, setPreviewUrl] = useState(null);
  const [loading, setLoading] = useState(false); // ✅ NEW
  const validate = () => {
    const errs = {};
    if (!photo) errs.photo = 'Photo is required';
    if (!name.trim()) errs.name = 'Name is required';
    if (!uniqueName.trim()) errs.uniqueName = 'Unique name is required';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setPhoto(file);
    setPreviewUrl(URL.createObjectURL(file));
  };

  const handleSubmit = async () => {
    if (!validate()) return;

    const formData = new FormData();
    formData.append('photo', photo);
    formData.append('name', name);
    formData.append('uniqueName', uniqueName);
    setLoading(true);
    try {
      const res = await fetch('https://clock-backend-ykc3.onrender.com/api/clock', {
        method: 'POST',
        body: formData,
      });
      setLoading(false);
      const data = await res.json();
      if (res.ok) {
        window.location.href = data.link;
      } else {
        alert(data.error || 'Error creating clock');
      }
    } catch (err) {
      console.error(err);
      alert('Server error');
    }
  };

  return (
<>
{loading && (
      <div className="fullscreen-loader">
        <div className="text-center">
          <div className="spinner-border text-primary" style={{ width: '4rem', height: '4rem' }} role="status"></div>
          <p className="mt-3 fw-bold">Removing background, please wait...</p>
        </div>
      </div>
    )}

    <div className="container py-5">
      <div className="">
        <motion.div
          className=""
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ type: 'spring', duration: 0.6 }}
        >
          <div className="card shadow-lg border-0 rounded-4">
            <div className="card-header bg-primary text-white text-center rounded-top-4">
              <h3 className="mb-0">🕒 Create Your Clock</h3>
            </div>
            <div className="card-body bg-light rounded-bottom-4">

              <div className="mb-3 text-start">
                <label className="form-label fw-semibold">
                  <FaImage className="me-2" />
                  Upload Photo
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="form-control"
                />
                {errors.photo && <small className="text-danger">{errors.photo}</small>}
                {previewUrl && (
                  <img
                    src={previewUrl}
                    alt="preview"
                    className="img-fluid mt-2 rounded shadow"
                    style={{ maxHeight: '200px' }}
                  />
                )}
              </div>

              <div className="mb-3 text-start">
                <label className="form-label fw-semibold">
                  <FaUser className="me-2" />
                  Your Name
                </label>
                <input
                  type="text"
                  placeholder="e.g. John Doe"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="form-control"
                />
                {errors.name && <small className="text-danger">{errors.name}</small>}
              </div>

              <div className="mb-4 text-start">
                <label className="form-label fw-semibold">
                  <FaClock className="me-2" />
                  Unique Clock Name
                </label>
                <input
                  type="text"
                  placeholder="e.g. john-clock-2025"
                  value={uniqueName}
                  onChange={(e) => setUniqueName(e.target.value)}
                  className="form-control"
                />
                {errors.uniqueName && <small className="text-danger">{errors.uniqueName}</small>}
              </div>

              <button
                className="btn btn-success w-100 py-2 fw-bold"
                onClick={handleSubmit}
              >
                🚀 Generate Clock
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
    </>
  );
}

export default Create;
