import {
  BaseEntity,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne, OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from "typeorm";

import type ParentEntity from './Parent.entity';
import type CardEntity from "./Card.entity";

@Entity({ name: 'children' })
export default class ChildEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn({ type: 'timestamp', name: 'createdAt' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp', name: 'updatedAt' })
  updateAt: Date;

  @DeleteDateColumn()
  deletedAt?: Date;

  @Column()
  fullName: string;

  @Column()
  age: number;

  @Column()
  parentId: number;

  @ManyToOne('ParentEntity')
  @JoinColumn()
  parent: ParentEntity;

  @OneToMany('CardEntity', (card: CardEntity) => card.child)
  @Column()
  cards: CardEntity[];
}
