import { getRepository } from 'typeorm';
import jwt from 'jsonwebtoken';
import dotEnv from 'dotenv';
import path from 'path';
import ParentEntity from '../entities/Parent.entity';

dotEnv.config({ path: path.join(__dirname, `../env/.${process.env.NODE_ENV}.env`) });

class ParentService {
  createParent = async (userData: ParentEntity) => {
    try {
      return await getRepository(ParentEntity).save({ ...userData });
    } catch (e) {
      return null;
    }
  };

  login = async (email: string, password: string) => {
    /** Find user with email */
    const user = await getRepository(ParentEntity).findOne({
      where: { email },
      select: ['id', 'password', 'email', 'fullName'],
    });

    if (!user) {
      return null;
    }

    /** Match password */
    const matched = await user.validatePassword(password);
    if (!matched) {
      return null;
    }

    const token = jwt.sign({ userId: user.id }, `${process.env.JWT_SECRET}`);
    return {
      token,
      user,
    };
  };

  updateParent = async (userId: number, email: string, fullName: string) => {
    try {
      return await getRepository(ParentEntity).update(userId, {
        email,
        fullName,
      });
    } catch (e) {
      return null;
    }
  };

  getParent = async (userId: number) => {
    try {
      return await getRepository(ParentEntity).findOne({
        where: { id: userId },
      });
    } catch (e) {
      return null;
    }
  };
}

export default ParentService;
