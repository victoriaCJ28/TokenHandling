require('dotenv').config(); // Cargar variables de entorno desde el archivo .env
const express = require('express'); // Importar el módulo express
const jwt = require('jsonwebtoken'); // Importar el módulo jsonwebtoken

const app = express(); // Crear una instancia de la aplicación Express
app.use(express.json()); // Configurar middleware para parsear JSON en los request bodies

const PORT = process.env.PORT || 3000; // Definir el puerto en el que correrá la aplicación
const SECRET_KEY = process.env.SECRET_KEY; // Clave secreta para firmar los tokens JWT

const USERS = [ // Arreglo con un usuario de ejemplo
  { username: 'admin@admin.com', password: 'password123' },
];

app.post('/login', (req, res) => { // Ruta POST para iniciar sesión
  const { username, password } = req.body; // Obtener username y password del cuerpo de la petición
  const user = USERS.find((u) => u.username === username && u.password === password); // Buscar el usuario en el arreglo

  if (!user) { // Si no se encuentra el usuario
    return res.status(401).json({ message: 'Credenciales inválidas' }); // Responder con estado 401 (Unauthorized)
  }

  const token = jwt.sign({ username }, SECRET_KEY, { expiresIn: '3m' }); // Generar un token JWT con una expiración de 1 minuto
  res.json({ token }); // Responder con el token en formato JSON
});

app.listen(PORT, () => { // Iniciar el servidor
  console.log(`Servidor corriendo en http://localhost:${PORT}`); // Imprimir mensaje en la consola indicando la URL
});

function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(403).json({ message: 'Acceso denegado. Falta el token' });
    }

    jwt.verify(token, SECRET_KEY, (err, user) => {
        if (err) {
            console.error('Error verifying token:', err);
            return res.status(403).json({ message: 'Token inválido o expirado' });
        }
        req.user = user;
        next();
    });
}


  app.get('/protected', authenticateToken, (req, res) => {
    res.json({ message: 'Acceso concedido', user: req.user });
  });
  
