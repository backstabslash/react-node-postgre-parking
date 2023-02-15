const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());
app.listen(port, () => {
    console.log(`App running on port ${port}.`);
})

app.use('/api', require('./routes/users-routes'));
app.use('/api', require('./routes/parking-routes'));
app.use('/api', require('./routes/booking-routes'));
app.use('/api', require('./routes/discount-routes'));
app.use('/api', require('./routes/vehicle-routes'));
