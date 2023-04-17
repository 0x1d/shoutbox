const bodyParser = require('body-parser');
const express = require('express');
const Gun = require('gun');
const app = express();
const port = 3000;

app.use(Gun.serve);
app.use(bodyParser.json());
app.use(express.static('public'));
app.get('/public');

const server = app.listen(port, () => console.log(`Listening on port ${port}!`));
Gun({ file: 'db/data', web: server });