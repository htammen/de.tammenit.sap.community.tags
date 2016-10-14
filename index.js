const express = require('express')
const app = express();
app.use(express.static('webapp'));

app.get('/', (req, res) => {
    res.send('Welcome');
});
app.listen(3000);