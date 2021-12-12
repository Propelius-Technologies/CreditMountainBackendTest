import TransactionEntity from "../entities/Transaction.entity";
import CardService from "./card.service";

class TransactionService {

  private cardService: CardService

  constructor() {
    this.cardService = new CardService()
  }

  getAllTransactions = async (cardId: number) => {
    try {
      return await TransactionEntity.find({where: {cardId}});
    }catch (e){
      return []
    }
  }

  getTransaction = async (transactionId: number) => {
    try {
      return await TransactionEntity.findOne({where: {id: transactionId}});
    }catch (e){
      return null
    }
  }

  createCharge = async (cardId: number, amount: number) => {
    try {
      const card = await this.cardService.getCard(cardId)

      if(!card){
        return null
      }

      const transaction = TransactionEntity.create({charge: amount, card});
      return await transaction.save()
    }catch (e){
      return null
    }
  }

}

export default TransactionService
