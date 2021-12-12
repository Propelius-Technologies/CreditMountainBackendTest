import path from 'path';

import dotEnv from 'dotenv';

import jwt from 'jsonwebtoken';

import { getRepository } from 'typeorm';

import { NextFunction } from 'express';

import ParentEntity from '../entities/Parent.entity';

dotEnv.config({ path: path.join(__dirname, `../env/.${process.env.NODE_ENV}.env`) });

export default {
  verifyToken: async (req: any, res: any, next: NextFunction) => {
    try {
      const token = req.headers.authorization;
      if (!token) {
        return res.status(401).json({
          success: false,
          message: 'Please authenticate',
        });
      }
      const verifyToken = await jwt.verify(
        token.replace('Bearer ', ''),
        `${process.env.JWT_SECRET}`,
      );
      const user = await getRepository(ParentEntity).findOne({ id: Object(verifyToken).userId });
      if (!user) {
        return res.status(401).json({
          success: false,
          message: 'Invalid token',
        });
      }
      req.user = user;
      next();
    } catch (err) {
      return res.status(401).json({
        success: false,
        message: 'Please authenticate',
      });
    }
  },
};
