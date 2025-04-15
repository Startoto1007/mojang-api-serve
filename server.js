const express = require('express');
const fetch = require('node-fetch');
const app = express();
const port = process.env.PORT || 3000;

app.get('/check-username/:username', async (req, res) => {
  const username = req.params.username;
  const response = await fetch(`https://api.mojang.com/users/profiles/minecraft/${username}`);
  if (response.ok) {
    res.send({ exists: true });
  } else {
    res.send({ exists: false });
  }
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
