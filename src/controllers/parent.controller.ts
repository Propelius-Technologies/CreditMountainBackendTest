import { Request, Response } from "express";
import ParentService from "../services/parent.service";
import ParentEntity from "../entities/Parent.entity";

class ParentController {

  private service: ParentService

  constructor() {
    this.service = new ParentService();
  }

  addParent = async (req: Request, res: Response) => {
    const user = await this.service.createParent(req.body);

    if(!user){
      return res.status(400).json({
        success: false,
        message: 'User not created'
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Your profile registered successfully!',
      data: user,
    });
  };

  login = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    const data = await this.service.login(email, password);

    if(!data){
      return res.status(400).json({
        success: false,
        message: 'Invalid email or password',
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Your profile registered successfully!',
      token: data.token,
      data: data.user,
    });
  }

  updateParent = async (req: Request & {user?: ParentEntity}, res: Response) => {
    const { email, fullName } = req.body;

    await this.service.updateParent(req?.user?.id || 0,  email, fullName );

    return res.status(200).json({
      success: true,
      message: 'Your profile updated successfully!',
    });
  }

  getParent = async (req: Request & {user?: ParentEntity}, res: Response) => {
    const user = await this.service.getParent(req?.user?.id || 0);

    return res.status(200).json({
      success: true,
      data: user,
    });
  }
}

export default ParentController;
