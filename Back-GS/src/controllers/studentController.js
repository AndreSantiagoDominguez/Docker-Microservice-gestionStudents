const StudentModel = require('../models/studentModel');
const { validationResult } = require('express-validator');

class StudentController {
  static async getAll(req, res, next) {
    try {
      const students = await StudentModel.getAll();
      res.json({
        success: true,
        count: students.length,
        data: students
      });
    } catch (error) {
      next(error);
    }
  }

  static async getById(req, res, next) {
    try {
      const { id } = req.params;
      const student = await StudentModel.getById(id);
      
      if (!student) {
        return res.status(404).json({
          success: false,
          error: 'Estudiante no encontrado'
        });
      }
      
      res.json({
        success: true,
        data: student
      });
    } catch (error) {
      next(error);
    }
  }

  static async create(req, res, next) {
    try {
      // Validar errores de express-validator
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          success: false,
          errors: errors.array()
        });
      }

      const { email } = req.body;
      
      // Verificar si el email ya existe
      const emailExists = await StudentModel.emailExists(email);
      if (emailExists) {
        return res.status(409).json({
          success: false,
          error: 'El email ya está registrado'
        });
      }

      const student = await StudentModel.create(req.body);
      
      res.status(201).json({
        success: true,
        message: 'Estudiante creado exitosamente',
        data: student
      });
    } catch (error) {
      next(error);
    }
  }

  static async update(req, res, next) {
    try {
      // Validar errores de express-validator
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          success: false,
          errors: errors.array()
        });
      }

      const { id } = req.params;
      const { email } = req.body;
      
      // Verificar si el email ya existe (excluyendo el actual)
      const emailExists = await StudentModel.emailExists(email, id);
      if (emailExists) {
        return res.status(409).json({
          success: false,
          error: 'El email ya está registrado'
        });
      }

      const student = await StudentModel.update(id, req.body);
      
      if (!student) {
        return res.status(404).json({
          success: false,
          error: 'Estudiante no encontrado'
        });
      }
      
      res.json({
        success: true,
        message: 'Estudiante actualizado exitosamente',
        data: student
      });
    } catch (error) {
      next(error);
    }
  }

  static async delete(req, res, next) {
    try {
      const { id } = req.params;
      const student = await StudentModel.delete(id);
      
      if (!student) {
        return res.status(404).json({
          success: false,
          error: 'Estudiante no encontrado'
        });
      }
      
      res.json({
        success: true,
        message: 'Estudiante eliminado exitosamente',
        data: student
      });
    } catch (error) {
      next(error);
    }
  }

  static async getStats(req, res, next) {
    try {
      const stats = await StudentModel.getStats();
      res.json({
        success: true,
        data: stats
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = StudentController;