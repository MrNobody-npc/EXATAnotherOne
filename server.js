const express = require('express');
const app = express();
const employeeRoutes = require('./routes/employee');
const errorHandler = require('./error/errorhandler');

app.use(express.json());
app.use('/api/employees', employeeRoutes);
app.use(errorHandler);

const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}/api/employees`));
