import { Request, Response } from "express";
import CardService from "../services/card.service";

class CardController {
  private service: CardService

  constructor() {
    this.service = new CardService()
  }

  async getAllCards(req: Request, res: Response) {
    const {childId} = req.params

    const cards = await this.service.getAllCards(+childId)

    return res.json(cards)
  }

  async getCard(req: Request, res: Response) {
    const { cardId} = req.params

    const card = await this.service.getCard(+cardId)

    return res.json(card)
  }

  async createCard(req: Request, res: Response) {
    const card = req.body
    const { childId } = req.params

    const newCard = await this.service.createCard(+childId, card)

    return res.json(newCard)
  }

  async updateCard(req: Request, res: Response) {
    const {monthlyLimit} = req.body
    const { cardId } = req.params

    const updatedCard = await this.service.updateCard(+cardId, monthlyLimit)

    return res.json(updatedCard)
  }

  async deleteCard (req: Request, res: Response) {
    const { cardId } = req.params

    await this.service.deleteCard(+cardId)

    return res.json({
      message: "Card deleted"
    })
  }
}

export default CardController
