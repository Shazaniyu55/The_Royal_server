const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  address: { type: String, required: true },
  date: { type: Date, required: true },
  time: { type: String, required: true },
  serviceType: { type: String, required: true },
  status: { type: String, default: 'pending' } // pending | confirmed | completed
}, { timestamps: true });

module.exports = mongoose.model('Booking', bookingSchema);
