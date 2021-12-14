import { check } from 'express-validator';
import { NextFunction, Request, Response } from 'express';
import baseValidator from './base';

class TransactionValidators {
  createCharge = () => [
    check('amount').notEmpty().isInt().toInt().withMessage('Amount is required.'),
    check('notes').isString().optional(),

    (req: Request, res: Response, next: NextFunction) => {
      baseValidator(req, res, next);
    },
  ];
}

export default TransactionValidators;
