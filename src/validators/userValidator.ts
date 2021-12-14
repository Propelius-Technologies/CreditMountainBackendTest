import { check } from 'express-validator';
import { getRepository, Not } from 'typeorm';
import baseValidator from './base';
import ParentEntity from '../entities/Parent.entity';

export default {
  addParentVld: [
    check('email')
      .notEmpty()
      .withMessage('Email is required.')
      .bail()
      .isEmail()
      .withMessage('Invalid email address.')
      .bail()
      .custom(async (email: string): Promise<any> => {
        const user = await getRepository(ParentEntity).findOne({ email });
        if (user) {
          // eslint-disable-next-line prefer-promise-reject-errors
          return Promise.reject('Email already exist in our records.');
        }
        return true;
      }),
    check('password')
      .notEmpty()
      .withMessage('Password is required.')
      .bail()
      .isLength({ min: 8 })
      .withMessage('Password must be eight characters long.'),
    check('fullName').notEmpty().withMessage('Full name is required.'),
    (req: any, res: any, next: any) => {
      baseValidator(req, res, next);
    },
  ],

  updateParentVld: [
    check('email')
      .notEmpty()
      .withMessage('Email is required.')
      .bail()
      .isEmail()
      .withMessage('Invalid email address.')
      .bail()
      .custom(async (email: string, { req }): Promise<any> => {
        const user = await getRepository(ParentEntity).findOne({ email, id: Not(req.user.id) });
        if (user) {
          // eslint-disable-next-line prefer-promise-reject-errors
          return Promise.reject('Email already exist in our records.');
        }
        return true;
      }),
    check('fullName').notEmpty().withMessage('Full name is required.'),
    (req: any, res: any, next: any) => {
      baseValidator(req, res, next);
    },
  ],

  loginVld: [
    check('email')
      .notEmpty()
      .withMessage('Email is required.')
      .bail()
      .isEmail()
      .withMessage('Invalid email address.'),
    check('password')
      .notEmpty()
      .withMessage('Password is required.')
      .bail()
      .isLength({ min: 8 })
      .withMessage('Password must be eight characters long.'),
    (req: any, res: any, next: any) => {
      baseValidator(req, res, next);
    },
  ],

  addChild: [
    check('age')
      .notEmpty()
      .withMessage('Age is required.')
      .bail()
      .isFloat()
      .withMessage('Invalid age.'),
    check('fullName').notEmpty().withMessage('Full name is required.'),
    (req: any, res: any, next: any) => {
      baseValidator(req, res, next);
    },
  ],
};
