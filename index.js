const express = require('express');
const fetch = require('node-fetch');  // Remarquer l'utilisation de require ici
const app = express();
const port = process.env.PORT || 3000;

app.get('/check-pseudo', async (req, res) => {
  const { pseudo } = req.query;

  if (!pseudo) {
    return res.status(400).json({ success: false, error: 'Pseudo manquant.' });
  }

  try {
    const response = await fetch(`https://api.mojang.com/users/profiles/minecraft/${pseudo}`);
    if (response.status === 200) {
      const data = await response.json();
      return res.json({ success: true, uuid: data.id });
    } else {
      return res.json({ success: false, error: 'Pseudo introuvable.' });
    }
  } catch (err) {
    return res.status(500).json({ success: false, error: 'Erreur serveur.' });
  }
});

app.listen(port, () => {
  console.log(`Serveur lancé sur le port ${port}`);
});
