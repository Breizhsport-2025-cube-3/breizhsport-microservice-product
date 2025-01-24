const { Op } = require('sequelize');
const Product = require('../models/products')(require('../config/db'));

module.exports = {
  // Créer un nouveau produit
  createProduct: async (req, res) => {
    try {
      const { categoryId, name, price, description, image } = req.body;

      // Validation des données
      if (!categoryId || !name || !price) {
        return res.status(400).json({ message: 'Les champs "categoryId", "name" et "price" sont requis.' });
      }

      // Création du produit
      const newProduct = await Product.create({ categoryId, name, price, description, image });
      res.status(201).json(newProduct);
    } catch (error) {
      console.error('Erreur lors de la création du produit:', error);
      res.status(500).json({ message: 'Erreur interne du serveur.', details: error.message });
    }
  },

  // Récupérer tous les produits
  getAllProducts: async (req, res) => {
    try {
      const products = await Product.findAll();
      res.status(200).json(products);
    } catch (error) {
      console.error('Erreur lors de la récupération des produits:', error);
      res.status(500).json({ message: 'Erreur interne du serveur.', details: error.message });
    }
  },

  // Récupérer un produit par ID
  getProductById: async (req, res) => {
    try {
      const { id } = req.params;

      // Récupération du produit
      const product = await Product.findByPk(id);

      if (!product) {
        return res.status(404).json({ message: 'Produit non trouvé.' });
      }

      res.status(200).json(product);
    } catch (error) {
      console.error('Erreur lors de la récupération du produit:', error);
      res.status(500).json({ message: 'Erreur interne du serveur.', details: error.message });
    }
  },

  // Mettre à jour un produit par ID
  updateProduct: async (req, res) => {
    try {
      const { id } = req.params;
      const { categoryId, name, price, description, image } = req.body;

      // Validation des données
      if (!categoryId || !name || !price) {
        return res.status(400).json({ message: 'Les champs "categoryId", "name" et "price" sont requis.' });
      }

      // Recherche du produit à mettre à jour
      const product = await Product.findByPk(id);

      if (!product) {
        return res.status(404).json({ message: 'Produit non trouvé.' });
      }

      // Mise à jour du produit
      product.categoryId = categoryId;
      product.name = name;
      product.price = price;
      product.description = description;
      product.image = image;
      await product.save();

      res.status(200).json(product);
    } catch (error) {
      console.error('Erreur lors de la mise à jour du produit:', error);
      res.status(500).json({ message: 'Erreur interne du serveur.', details: error.message });
    }
  },

  // Supprimer un produit par ID
  deleteProduct: async (req, res) => {
    try {
      const { id } = req.params;

      // Recherche du produit à supprimer
      const product = await Product.findByPk(id);

      if (!product) {
        return res.status(404).json({ message: 'Produit non trouvé.' });
      }

      // Suppression du produit
      await product.destroy();

      res.status(200).json({ message: 'Produit supprimé avec succès.' });
    } catch (error) {
      console.error('Erreur lors de la suppression du produit:', error);
      res.status(500).json({ message: 'Erreur interne du serveur.', details: error.message });
    }
  },

  // Récupérer les produits par catégorie
  getProductsByCategory: async (req, res) => {
    try {
      const { categoryId } = req.params;

      // Récupération des produits par catégorie
      const products = await Product.findAll({ where: { categoryId } });

      if (products.length === 0) {
        return res.status(404).json({ message: 'Aucun produit trouvé pour cette catégorie.' });
      }

      res.status(200).json(products);
    } catch (error) {
      console.error('Erreur lors de la récupération des produits par catégorie:', error);
      res.status(500).json({ message: 'Erreur interne du serveur.', details: error.message });
    }
  },
};