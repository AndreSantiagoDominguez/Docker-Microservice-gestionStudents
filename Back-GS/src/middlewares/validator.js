/**
 * ========================================
 * Middleware de Validación
 * Autor: André Santiago
 * ========================================
 */

const { body } = require('express-validator');

/**
 * Validaciones para estudiante
 */
const studentValidation = {
  create: [
    body('name')
      .notEmpty().withMessage('El nombre es obligatorio')
      .trim()
      .isLength({ min: 3, max: 100 }).withMessage('El nombre debe tener entre 3 y 100 caracteres'),
    
    body('email')
      .notEmpty().withMessage('El email es obligatorio')
      .trim()
      .isEmail().withMessage('El email no es válido')
      .normalizeEmail(),
    
    body('birth_date')
      .notEmpty().withMessage('La fecha de nacimiento es obligatoria')
      .isDate({ format: 'YYYY-MM-DD' }).withMessage('Formato de fecha inválido (debe ser YYYY-MM-DD)')
      .custom((value) => {
        const birthDate = new Date(value);
        const today = new Date();
        const age = today.getFullYear() - birthDate.getFullYear();
        
        if (birthDate > today) {
          throw new Error('La fecha de nacimiento no puede ser futura');
        }
        
        if (age < 15) {
          throw new Error('El estudiante debe tener al menos 15 años');
        }
        
        if (age > 100) {
          throw new Error('Fecha de nacimiento inválida');
        }
        
        return true;
      }),
    
    body('career')
      .optional({ nullable: true, checkFalsy: true })
      .trim()
      .isLength({ max: 100 }).withMessage('La carrera no puede exceder 100 caracteres')
  ],

  update: [
    body('name')
      .notEmpty().withMessage('El nombre es obligatorio')
      .trim()
      .isLength({ min: 3, max: 100 }).withMessage('El nombre debe tener entre 3 y 100 caracteres'),
    
    body('email')
      .notEmpty().withMessage('El email es obligatorio')
      .trim()
      .isEmail().withMessage('El email no es válido')
      .normalizeEmail(),
    
    body('birth_date')
      .notEmpty().withMessage('La fecha de nacimiento es obligatoria')
      .isDate({ format: 'YYYY-MM-DD' }).withMessage('Formato de fecha inválido (debe ser YYYY-MM-DD)')
      .custom((value) => {
        const birthDate = new Date(value);
        const today = new Date();
        const age = today.getFullYear() - birthDate.getFullYear();
        
        if (birthDate > today) {
          throw new Error('La fecha de nacimiento no puede ser futura');
        }
        
        if (age < 15) {
          throw new Error('El estudiante debe tener al menos 15 años');
        }
        
        if (age > 100) {
          throw new Error('Fecha de nacimiento inválida');
        }
        
        return true;
      }),
    
    body('career')
      .optional({ nullable: true, checkFalsy: true })
      .trim()
      .isLength({ max: 100 }).withMessage('La carrera no puede exceder 100 caracteres')
  ]
};

module.exports = {
  studentValidation
};