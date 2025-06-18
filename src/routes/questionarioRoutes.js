import express from 'express';
import { verificarToken } from '../middleware/auth.js';
import { contarQuestionarios } from '../controllers/questionarioController.js';

const router = express.Router();

// Rota para contar questionários respondidos
router.get('/contagem/:id', verificarToken, contarQuestionarios);

export default router; 