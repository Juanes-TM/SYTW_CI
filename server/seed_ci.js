const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

// Asegúrate de que la ruta coincida con el nombre del archivo real (minúscula 'user')
const User = require('./models/user'); 

const mongoURI = "mongodb://localhost:27017/testdb";

async function seed() {
  try {
    await mongoose.connect(mongoURI);
    console.log("🌱 Conectado a MongoDB para sembrar datos...");

    await mongoose.connection.db.dropDatabase();
    console.log("🧹 Base de datos limpiada.");

    // Generar hash para la contraseña "123456"
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash("123456", salt);

    // Crear usuario adaptado EXACTAMENTE a tu Schema
    const usuario = new User({
      nombre: "Nano",           // Schema: required: true
      apellido: "Test",         // Schema: required: true
      email: "nano@ull.es",     // Schema: required: true
      password: hashedPassword, // Schema: required: true
      telephone: "600123456",   // Schema: required: true (ojo: es 'telephone', no 'telefono')
      rol: "cliente",           // Schema: enum ['cliente', ...], default 'cliente'
      especialidad: null        // Opcional
    });

    await usuario.save();
    console.log("✅ Usuario 'nano@ull.es' creado con éxito.");

    // --- (Opcional) Crear un Fisioterapeuta para pruebas ---
    // Si tus tests necesitan un fisio, descomenta esto:
    /*
    const fisio = new User({
      nombre: "Fisio",
      apellido: "Uno",
      email: "fisio@ull.es",
      password: hashedPassword,
      telephone: "600999888",
      rol: "fisioterapeuta",
      especialidad: "General"
    });
    await fisio.save();
    console.log("✅ Usuario 'fisio@ull.es' creado.");
    */

    await mongoose.disconnect();
    console.log("👋 Seed completado con éxito.");
    process.exit(0);

  } catch (error) {
    console.error("❌ Error durante el seed:", error);
    // Imprimir detalles de validación si existen
    if (error.errors) {
        Object.keys(error.errors).forEach(key => {
            console.error(`   -> Campo '${key}': ${error.errors[key].message}`);
        });
    }
    process.exit(1);
  }
}

seed();