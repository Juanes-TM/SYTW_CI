const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

// IMPORTANTE: Ajusta esta ruta si tu modelo de usuario está en otra carpeta
// Por ejemplo: require('./src/models/User') o require('./models/usuario')
const User = require('./models/user'); 

// URI de la base de datos de pruebas (la misma que definiste en el YAML)
const mongoURI = "mongodb://localhost:27017/testdb";

async function seed() {
  try {
    // 1. Conectar a MongoDB
    await mongoose.connect(mongoURI);
    console.log("🌱 Conectado a MongoDB para sembrar datos...");

    // 2. Limpiar la base de datos para asegurar que está limpia
    await mongoose.connection.db.dropDatabase();
    console.log("🧹 Base de datos limpiada.");

    // 3. Encriptar la contraseña MANUALMENTE
    // Como estamos inyectando datos directamente a la BD y no pasando por el registro de la app,
    // tenemos que hacer el hash nosotros mismos.
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash("123456", salt);

    // 4. Crear el usuario administrador/cliente
    const usuario = new User({
      name: "Nano Test",
      email: "nano@ull.es",
      password: hashedPassword, // Guardamos la contraseña YA encriptada
      role: "cliente",          // Asegúrate de que este rol exista en tu lógica
      telefono: "123456789",    // Añado campos comunes por si acaso son requeridos
      confirmed: true           // Si tienes confirmación de email, ponlo en true
    });

    await usuario.save();
    console.log("✅ Usuario 'nano@ull.es' creado con password '123456' (hasheado).");

    // --- AQUÍ PUEDES AÑADIR MÁS DATOS SI LOS NECESITAS (Fisios, Citas, etc.) ---

    // 5. Cerrar conexión
    await mongoose.disconnect();
    console.log("👋 Seed completado con éxito.");
    process.exit(0);

  } catch (error) {
    console.error("❌ Error durante el seed:", error);
    process.exit(1);
  }
}

seed();