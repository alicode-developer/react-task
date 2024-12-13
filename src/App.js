import React, { useState } from 'react';

const BookingTable = () => {
  const [formData, setFormData] = useState({
    name: '',
    date: '',
    time: '',
    guests: 1,
  });

  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  // Input change handler
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Validation logic
  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.date) newErrors.date = 'Date is required';
    if (!formData.time) newErrors.time = 'Time is required';
    if (formData.guests <= 0) newErrors.guests = 'Guests must be at least 1';
    return newErrors;
  };

  // Form submit handler
  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      setErrors({});
      setSubmitted(true);
      console.log('Booking confirmed:', formData);
    }
  };

  return (
    <div className="booking-container" aria-labelledby="booking-header">
      <h1 id="booking-header" className="booking-title">Book Your Table</h1>
      <form onSubmit={handleSubmit} noValidate>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            id="name"
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            aria-invalid={!!errors.name}
            aria-describedby="name-error"
            required
          />
          {errors.name && <span id="name-error" className="error">{errors.name}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="date">Date</label>
          <input
            id="date"
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            aria-invalid={!!errors.date}
            aria-describedby="date-error"
            required
          />
          {errors.date && <span id="date-error" className="error">{errors.date}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="time">Time</label>
          <input
            id="time"
            type="time"
            name="time"
            value={formData.time}
            onChange={handleChange}
            aria-invalid={!!errors.time}
            aria-describedby="time-error"
            required
          />
          {errors.time && <span id="time-error" className="error">{errors.time}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="guests">Number of Guests</label>
          <input
            id="guests"
            type="number"
            name="guests"
            min="1"
            value={formData.guests}
            onChange={handleChange}
            aria-invalid={!!errors.guests}
            aria-describedby="guests-error"
            required
          />
          {errors.guests && <span id="guests-error" className="error">{errors.guests}</span>}
        </div>

        <button type="submit" className="submit-button">Book Now</button>
        {submitted && <div className="success-message" role="alert">Your table has been booked successfully!</div>}
      </form>
    </div>
  );
};

export default BookingTable;
