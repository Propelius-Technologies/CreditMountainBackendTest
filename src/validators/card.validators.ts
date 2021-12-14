import { check } from 'express-validator';
import { NextFunction, Request, Response } from 'express';
import baseValidator from './base';

class CardValidators {
  addCard = () => [
    check('type').notEmpty().bail().isString().withMessage('Type is required.'),
    check('number').notEmpty().isString().withMessage('Number is required.'),
    check('expirationDate').notEmpty().isDate().withMessage('Expiration date is required.'),
    check('securityCode').notEmpty().isInt().toInt().withMessage('Security code is required.'),
    check('monthlyLimit').notEmpty().isInt().toInt().withMessage('Monthly limit is required.'),

    (req: Request, res: Response, next: NextFunction) => {
      baseValidator(req, res, next);
    },
  ];

  updateCard = () => [
    check('monthlyLimit').isInt().toInt().withMessage('Monthly limit is required.'),
    (req: Request, res: Response, next: NextFunction) => {
      baseValidator(req, res, next);
    },
  ];
}

export default CardValidators;
