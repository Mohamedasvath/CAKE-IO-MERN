// src/routes/cake.js

import express from 'express';
import { 
  getCakes, 
  getCakeById, 
  addCake, 
  updateCake, 
  deleteCake 
} from '../controllers/cake.controller.js';

const router = express.Router();

// GET all cakes
router.get('/', getCakes);

// GET a single cake by ID
router.get('/:id', getCakeById);

// POST a new cake
router.post('/', addCake);

// PUT to update a cake by ID
router.put('/:id', updateCake);

// DELETE a cake by ID
router.delete('/:id', deleteCake);

export default router;