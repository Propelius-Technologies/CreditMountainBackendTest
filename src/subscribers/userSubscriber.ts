import { EntitySubscriberInterface, EventSubscriber, InsertEvent } from 'typeorm';

import * as bcrypt from 'bcryptjs';

import ParentEntity from '../entities/Parent.entity';

@EventSubscriber()
export default class ParentSubscriber implements EntitySubscriberInterface<ParentEntity> {
  /**
   * Called before post insertion.
   */
  beforeInsert(event: InsertEvent<ParentEntity>) {
    if (event.entity?.password) {
      event.entity.password = bcrypt.hashSync(event.entity.password, 8);
    }
  }
}
