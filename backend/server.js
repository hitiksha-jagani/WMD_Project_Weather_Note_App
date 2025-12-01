require('dotenv').config();
const express = require('express');
const path = require('path');
const morgan = require('morgan');
const cors = require('cors');

const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const noteRoutes = require('./routes/noteRoutes');
const { customLogger } = require('./middleware/customLogger');
const { errorHandler } = require('./middleware/errorHandler');

const app = express();
const PORT = process.env.PORT || 5000;
const HOST = process.env.HOST_NAME;

connectDB();

app.use(morgan('dev'));              
app.use(express.json());            
app.use(cors());                   
app.use(customLogger);              
app.use(express.static(path.join(__dirname, 'public')));

// view engine (EJS) for SSR pages
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/notes', noteRoutes);

// Example EJS server-side rendered pages
app.get('/', (req, res) => {
    res.render('pages/home', { title: 'Weather & Notes Home' });
});

app.get('/about', (req, res) => {
    res.render('pages/about', { title: 'About Weather Notes' });
});

app.use((req, res, next) => {
    res.status(404).render('pages/404', { url: req.originalUrl });
});

// central error handler
app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`Server started on ${HOST}${PORT}`);
});
