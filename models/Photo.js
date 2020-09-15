const mongoose = require('mongoose');

const photoSchema = mongoose.Schema({
  title: { type: String, required: true},
  photoUrl: { type: String, required: true },
  description: { type: String },
  UserId: { type: String, require: true }
},
{
	timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
});


module.exports = mongoose.model('Photo', photoSchema);