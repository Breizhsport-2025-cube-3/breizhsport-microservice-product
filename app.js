const express = require('express');
const sequelize = require('./config/db');
const productRoutes = require('./routes/productRoutes');

// Importez et initialisez le modèle Product
const Product = require('./models/products')(sequelize);

const app = express();
const PORT = process.env.PORT; // Ajoutez une valeur par défaut pour PORT

// Middleware pour parser le JSON
app.use(express.json());

// Routes
app.use('/products', productRoutes);

// Synchronisation de la base de données et démarrage du serveur
sequelize.sync()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Serveur démarré sur http://localhost:${PORT}`);
    });
  })
  .catch(err => console.error('Erreur de synchronisation avec la base de données:', err));