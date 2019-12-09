const express = require('express');

const app = express();
const port = 5000;


// ROUTES

app.get('/', (req, res) => {
  res.send("Hello!")
})

// LISTEN
app.listen(port, () => console.log(`Server started on port ${port}.`))
