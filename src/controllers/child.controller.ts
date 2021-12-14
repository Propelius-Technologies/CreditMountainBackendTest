import { Request, Response } from 'express';
import ChildService from '../services/child.service';
import ParentEntity from '../entities/Parent.entity';

class ChildController {
  private service: ChildService;

  constructor() {
    this.service = new ChildService();
  }

  createChild = async (req: Request & { user?: ParentEntity }, res: Response) => {
    const newChild = await this.service.createChild(req?.user?.id || 0, req.body);

    if (!newChild) {
      return res.status(400).json({
        success: false,
        message: 'Something went wrong',
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Your child registered successfully!',
      data: newChild,
    });
  };

  getAllChildren = async (req: Request & { user?: ParentEntity }, res: Response) => {
    const children = await this.service.getAllChildren(req?.user?.id || 0);
    res.status(200).json({
      success: true,
      data: children,
    });
  };

  getChild = async (req: Request, res: Response) => {
    const child = await this.service.getChild(+req.params.id);

    if (!child) {
      return res.status(404).json({
        success: true,
        message: 'Child not found.',
      });
    }

    return res.status(200).json({
      success: true,
      data: child,
    });
  };

  updateChildCtrl = async (req: Request, res: Response) => {
    const { age, fullName } = req.body;
    const child = await this.service.updateChild(+req.params.id, age, fullName);

    if (!child) {
      return res.status(400).json({
        success: false,
        message: 'Child could not be updated.',
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Your child updated successfully!',
      data: child,
    });
  };

  deleteChild = async (req: Request, res: Response) => {
    await this.service.deleteChild(+req.params.id);

    res.status(200).json({
      success: true,
      message: 'Your child deleted successfully!',
    });
  };
}

export default ChildController;
