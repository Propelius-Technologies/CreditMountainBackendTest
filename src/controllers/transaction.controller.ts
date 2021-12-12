import { Request, Response } from "express";
import TransactionService from "../services/transaction.service";

class TransactionController {

  private service: TransactionService;

  constructor() {
    this.service = new TransactionService()
  }

  getAllTransactions = async  (req: Request, res: Response) => res.json(await this.service.getAllTransactions(+req.params.cardId))

  getTransaction = async (req: Request, res: Response) => {
    const transaction = await this.service.getTransaction(+req.params.cardId)
    if (transaction) {
      res.json(transaction)
    } else {
      res.status(404).send()
    }
  }

  createCharge = (req: Request, res: Response) => {
    const { amount } = req.body

  }
}

export default TransactionController
