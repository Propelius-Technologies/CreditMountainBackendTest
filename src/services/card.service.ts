import CardEntity from "../entities/Card.entity";
import ChildService from "./child.service";

class CardService {

  private childService: ChildService

  constructor() {
    this.childService = new ChildService()
  }

  getAllCards = async (childId: number) => {
    try {
      return await CardEntity.find({where: {childId}});
    }catch (e){
      return []
    }
  }

  getCard = async (cardId: number) => {
    try {
      return await CardEntity.findOne({where: {id: cardId}});
    }catch (e){
      return null
    }
  }

  createCard = async (childId: number, card: Partial<CardEntity>) => {
    try {
      const child = await this.childService.getChild(childId)

      if(!child) {
        return null
      }

      const newCard = CardEntity.create({...card, child});

      return await newCard.save();
    }catch (e){
      return null
    }
  }

  updateCard = async (cardId: number, monthlyLimit: number) => {
    try {
      return await CardEntity.update({ id: cardId }, { monthlyLimit })
    }catch (e){
      return null
    }
  }

  deleteCard = async (cardId: number) => {
    try {
      const card = await this.getCard(cardId);

      if(!card){
        return null
      }

      return await CardEntity.softRemove(card)
    }catch (e){
      return null
    }
  }
}

export default CardService
