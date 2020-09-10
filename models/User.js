const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const userSchema = mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  username: { type: String, required: true },
  avatar: { type: String },
  isActif: { type: Boolean, default: true }
},
{
	timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
});

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', userSchema);