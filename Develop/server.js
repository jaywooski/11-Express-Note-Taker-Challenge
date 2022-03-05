const express = require('express');

const PORT = process.env.PORT || 3001;
const app = express();
const apiRoutes = require('./routes/apiRoutes');
const htmlRoutes = require('./routes/htmlRoutes');





app.listen(PORT, () => {
    console.log(`Server is now available on port ${PORT}!!`)
})