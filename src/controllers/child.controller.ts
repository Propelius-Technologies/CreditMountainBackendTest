import { Request, Response } from "express";
import ChildService from "../services/child.service";

class ChildController{
    private service: ChildService;

    constructor() {
        this.service = new ChildService();
    }

  createChild = async (req: any, res: any) => {
    const newChild = await this.service.createChild(req.params.parentId, req.body);

    if(!newChild){
      return res.status(400).json({
        success:false,
        message: 'Something went wrong'
      })
    }

    return res.status(200).json({
      success: true,
      message: 'Your child registered successfully!',
      data: newChild,
    });
  };

  getAllChildren =  async (req: any, res: any) => {
    const children = await this.service.getAllChildren(req.params.parentId);
    res.status(200).json({
      success: true,
      data: children,
    });
  };

  getChild = async (req: any, res: any) => {
    const child = await this.service.getChild( req.params.childId);

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
    const child = await this.service.updateChild(+req.params.childId, age, fullName);

    if(!child){
      return res.status(400).json({
        success: false,
        message: 'Child could not be updated.',
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Your child updated successfully!',
      data: child
    });
  }

  deleteChild = async (req: Request, res: Response) => {
    await this.service.deleteChild(+req.params.childId);

    res.status(200).json({
      success: true,
      message: 'Your child deleted successfully!',
    });
  }
}

export default ChildController;
