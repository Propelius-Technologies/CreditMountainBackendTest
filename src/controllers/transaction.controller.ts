import { Request, Response } from 'express';
import TransactionService from '../services/transaction.service';

class TransactionController {
  private service: TransactionService;

  constructor() {
    this.service = new TransactionService();
  }

  getAllTransactions = async (req: Request, res: Response) =>
    res.json(await this.service.getAllTransactions(+req.params.cardId));

  getTransaction = async (req: Request, res: Response) => {
    const transaction = await this.service.getTransaction(+req.params.cardId);

    if (!transaction) {
      return res.status(404).json({
        success: false,
        message: 'Transaction not found',
      });
    }

    return res.status(200).json({
      success: true,
      data: transaction,
    });
  };

  createCharge = async (req: Request, res: Response) => {
    const { amount } = req.body;
    const { cardId } = req.params;

    const charge = await this.service.createCharge(+cardId, amount);

    if (!charge) {
      return res.status(400).json({
        success: false,
        message: 'Could not create charge',
      });
    }

    return res.status(201).json({
      success: true,
      message: 'Charge created',
    });
  };
}

export default TransactionController;
