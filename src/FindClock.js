// client/src/FindClock.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaSearch, FaPlus } from 'react-icons/fa';
import { motion } from 'framer-motion';

function FindClock() {
  const [uniqueName, setUniqueName] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSearch = () => {
    if (!uniqueName.trim()) {
      setError('Please enter a unique clock ID');
      return;
    }
    navigate(`/clock/${uniqueName.trim()}`);
  };

  const handleCreate = () => {
    navigate('/');
  };

  return (
    <div className="container py-5">
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: 'spring', duration: 0.6 }}
        className=""
      >
        <div className="">
          <div className="card shadow-lg border-0 rounded-4">
            <div className="card-header bg-dark text-white text-center rounded-top-4">
              <h3 className="mb-0">🔍 Find Your Clock</h3>
            </div>
            <div className="card-body bg-light rounded-bottom-4">
              
              <div className="mb-3 text-start">
                <label className="form-label fw-semibold">
                  <FaSearch className="me-2" />
                  Enter Unique Clock ID
                </label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="e.g. john-clock-2025"
                  value={uniqueName}
                  onChange={(e) => {
                    setUniqueName(e.target.value);
                    setError('');
                  }}
                />
                {error && <small className="text-danger">{error}</small>}
              </div>

              <button
                className="btn btn-primary w-100 mb-3 fw-bold"
                onClick={handleSearch}
              >
                🔎 View Clock
              </button>

              <hr className="my-4" />

              <p className="text-muted text-center mb-2">Don't have a clock yet?</p>
              <button
                className="btn btn-outline-success w-100 fw-bold"
                onClick={handleCreate}
              >
                <FaPlus className="me-2" />
                Create Your Clock
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default FindClock;
