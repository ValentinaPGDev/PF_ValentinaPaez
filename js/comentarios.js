const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');

const app = express();

// Middleware para parsear datos del formulario
app.use(bodyParser.urlencoded({ extended: true }));

// Configuración de la sesión
app.use(session({
    secret: 'miClave',
    resave: false,
    saveUninitialized: true
}));

// Ruta para mostrar el formulario (si lo sirves desde Node)
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html'); // tu archivo con el formulario
});

// Ruta para procesar el formulario
app.post('/mensajeUsuario', (req, res) => {
    const { nombreUsuario, mensajeUsuario } = req.body;

    // Inicializar la variable de sesión si no existe
    if (!req.session.comentarios) {
        req.session.comentarios = [];
    }

    // Guardar el comentario en la sesión
    req.session.comentarios.push({
        nombre: nombreUsuario,
        mensaje: mensajeUsuario
    });

    res.send(`
        <h2>Comentario guardado</h2>
        <a href="/verComentarios">Ver todos los comentarios</a>
    `);
});

// Ruta para ver los comentarios guardados en la sesión
app.get('/verComentarios', (req, res) => {
    const comentarios = req.session.comentarios || [];
    let html = '<h2>Comentarios guardados en sesión:</h2><ul>';
    comentarios.forEach(c => {
        html += `<li><strong>${c.nombre}:</strong> ${c.mensaje}</li>`;
    });
    html += '</ul><a href="/">Volver al formulario</a>';
    res.send(html);
});

app.listen(3000, () => {
    console.log('Servidor corriendo en http://localhost:3000');
});