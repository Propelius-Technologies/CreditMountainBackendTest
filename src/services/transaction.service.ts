import TransactionEntity from '../entities/Transaction.entity';
import CardService from './card.service';

class TransactionService {
  private cardService: CardService;

  constructor() {
    this.cardService = new CardService();
  }

  getAllTransactions = async (cardId: number) => {
    try {
      return await TransactionEntity.find({ where: { card: cardId }, relations: ['card'] });
    } catch (e) {
      return [];
    }
  };

  getTransaction = async (transactionId: number) => {
    try {
      return await TransactionEntity.findOne({ where: { id: transactionId }, relations: ['card'] });
    } catch (e) {
      return null;
    }
  };

  createCharge = async (cardId: number, amount: number, notes: string) => {
    try {
      const card = await this.cardService.getCard(cardId);

      if (!card) {
        return null;
      }

      if (card.monthlyLimit < amount) {
        return false;
      }

      const transaction = TransactionEntity.create({ amount, notes: notes || '', card });
      await transaction.save();

      card.monthlyLimit -= amount;
      await card.save();

      return transaction;
    } catch (e) {
      return null;
    }
  };
}

export default TransactionService;
