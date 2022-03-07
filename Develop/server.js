const express = require('express');

const PORT = process.env.PORT || 3001;
const app = express();
const apiRoutes = require('./routes/apiRoutes');
const htmlRoutes = require('./routes/htmlRoutes');

app.use(express.urlencoded({ extended: true }));
app.use('/api', apiRoutes);
app.use('/', htmlRoutes);
app.use(express.json());
app.use(express.static('public'));


app.listen(PORT, () => {
    console.log(`Server is now available on port ${PORT}!!`)
})