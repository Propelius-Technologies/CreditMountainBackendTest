import { Request, Response } from 'express';
import CardService from '../services/card.service';

class CardController {
  private service: CardService;

  constructor() {
    this.service = new CardService();
  }

  getAllCards = async (req: Request, res: Response) => {
    const { childId } = req.params;

    const cards = await this.service.getAllCards(+childId);

    return res.json(cards);
  };

  getCard = async (req: Request, res: Response) => {
    const { cardId } = req.params;

    const card = await this.service.getCard(+cardId);

    if (!card) {
      return res.status(404).json({ message: 'Card not found' });
    }

    return res.json(card);
  };

  createCard = async (req: Request, res: Response) => {
    const card = req.body;
    const { childId } = req.params;

    const newCard = await this.service.createCard(+childId, card);

    return res.json(newCard);
  };

  updateCard = async (req: Request, res: Response) => {
    const { monthlyLimit } = req.body;
    const { cardId } = req.params;

    await this.service.updateCard(+cardId, monthlyLimit);

    return res.json({
      message: 'Card updated successfully',
      success: true,
    });
  };

  deleteCard = async (req: Request, res: Response) => {
    const { cardId } = req.params;

    await this.service.deleteCard(+cardId);

    return res.json({
      message: 'Card deleted',
    });
  };
}

export default CardController;
