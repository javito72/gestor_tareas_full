// src/models/Usuario.js
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const Schema = mongoose.Schema
const UsuarioSchema = new Schema({
  nombre: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  contraseña: {
    type: String,
    required: true,
  },
  rol: {
    type: Schema.Types.ObjectId, 
    ref: 'Rol',
    required: true,
  },
  area: {
    type: Schema.Types.ObjectId, 
    ref: 'Area',
    required: true,
  },
});

// Encriptar contraseña antes de guardar
UsuarioSchema.pre('save', async function (next) {
  if (!this.isModified('contraseña')) return next();
  const salt = await bcrypt.genSalt(10);
  this.contraseña = await bcrypt.hash(this.contraseña, salt);
  next();
});

// Método para comparar contraseña
UsuarioSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.contraseña);
};

module.exports = mongoose.model('Usuario', UsuarioSchema);
