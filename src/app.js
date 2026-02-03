const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const authRoutes = require('./routes/auth');
const taskRoutes = require('./routes/tasks');
const errorHandler = require('./middleware/errorHandler');

const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const path = require('path');
const swaggerDocument = YAML.load(path.join(__dirname, 'docs', 'openapi.yaml'));

const app = express();
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));


app.use(morgan('dev'));
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => res.json({ message: 'Task Management API' }));

app.use('/auth', authRoutes);
app.use('/tasks', taskRoutes);

// 404
app.use((req, res, next) => {
  res.status(404).json({ message: 'Not Found' });
});

app.use(errorHandler);

module.exports = app;
