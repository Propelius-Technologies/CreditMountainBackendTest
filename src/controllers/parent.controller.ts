import path from 'path';

import dotEnv from 'dotenv';

import { getRepository } from 'typeorm';

import jwt from 'jsonwebtoken';

import ParentEntity from '../entities/Parent.entity';
import ParentService from "../services/parent.service";

dotEnv.config({ path: path.join(__dirname, `../env/.${process.env.NODE_ENV}.env`) });


class ParentController {

  private service: ParentService

  constructor() {
    this.service = new ParentService();
  }

  addParentCtrl = async (req: any, res: any) => {
    const user = await getRepository(ParentEntity).save({ ...req.body });
    user.password = undefined;
    res.status(200).json({
      success: true,
      message: 'Your profile registered successfully!',
      data: user,
    });
  };

  loginCtrl = async (req: any, res: any) => {
    const { email, password } = req.body;

    /** Find user with email */
    const user = await getRepository(ParentEntity).findOne({
      where: { email },
      select: ['id', 'password', 'email', 'fullName'],
    });
    if (!user)
      return res.status(422).json({
        success: true,
        message: 'Record not found with this email.',
      });

    /** Match password */
    const isMatch = await user.validatePassword(password);
    if (!isMatch)
      return res.status(422).json({
        success: true,
        message: 'Invalid email or password',
      });

    res.status(200).json({
      success: true,
      message: 'Your profile registered successfully!',
      token: jwt.sign({ userId: user.id }, `${process.env.JWT_SECRET}`),
      data: user,
    });
  }

  updateParentCtrl = async (req: any, res: any) => {
    const { email, fullName } = req.body;

    await this.service.updateParent(req.user.id,  email, fullName );

    res.status(200).json({
      success: true,
      message: 'Your profile updated successfully!',
    });
  }

  getParentCtrl = async (req: any, res: any) => {
    const user = await this.service.getParent(req.user.id);

    res.status(200).json({
      success: true,
      data: user,
    });
  },
};
