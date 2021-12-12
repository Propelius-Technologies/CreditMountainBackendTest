import { getRepository } from "typeorm";
import ParentEntity from "../entities/Parent.entity";

class ParentService {
  createParent = async () => {

  }

  login = async () => {

  }

  updateParent = async (userId: number, email: string, fullName: string) => {
    try {
      return await getRepository(ParentEntity).update(userId, {
        email,
        fullName,
      });

    } catch (e) {
      return null
    }
  }

  getParent = async (userId: number) => {
    try {
      return await getRepository(ParentEntity).findOne({
        where: { id: userId },
      });
    }catch (e) {
      return null
    }
  }

}

export default ParentService
