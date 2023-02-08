const express = require('express');
const cors = require('cors');
const parkingRouter = require('./routes/parking-routes');
const app = express();
const port = 3001;
app.use(cors());
app.use(express.json());
app.use('/api', parkingRouter);
app.listen(port, () => {
    console.log(`App running on port ${port}.`);
})