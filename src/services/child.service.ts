import { getRepository } from 'typeorm';
import ChildEntity from '../entities/Child.entity';

class ChildService {
  createChild = async (parentId: number, child: ChildEntity) => {
    try {
      return await getRepository(ChildEntity).save({ ...child, parentId });
    } catch (e) {
      return null;
    }
  };

  getAllChildren = async (parentId: number) => {
    try {
      return await getRepository(ChildEntity).find({ where: { parentId } });
    } catch (e) {
      return [];
    }
  };

  getChild = async (childId: number) => {
    try {
      return await getRepository(ChildEntity).findOne(childId);
    } catch (e) {
      return null;
    }
  };

  updateChild = async (childId: number, age: number, fullName: string) => {
    try {
      return await getRepository(ChildEntity).update(childId, { age, fullName });
    } catch (e) {
      return null;
    }
  };

  deleteChild = async (childId: number) => {
    try {
      return await getRepository(ChildEntity).delete(childId);
    } catch (e) {
      return null;
    }
  };
}

export default ChildService;
