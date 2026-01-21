const mongoose = require('mongoose');
const bcrypt = require('bcrypt'); 

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
      trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  age: {
    type: Number,
    required: true,
    min: 0
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
    select: false
  },

  isActive: {
    type: Boolean,
    default: true
  },
  role: {
    type: String,
    default: 'user'
  },
  isDeleted: {
    type: Boolean,
    default: false
  }
});

userSchema.pre('save', async function() {
  if (!this.isModified('password')) return; // لو الباسورد متغيرش ما تعملش هاش
  this.password = await bcrypt.hash(this.password, 12);
});




// طريقة لمقارنة الباسورد
userSchema.methods.comparePassword = async function(candidatePassword) {
  try {
    return await bcrypt.compare(candidatePassword, this.password);
  } catch (error) {
    console.error('Error comparing password:', error);
    return false;
  }
};
module.exports = mongoose.models.users || mongoose.model('users', userSchema);
