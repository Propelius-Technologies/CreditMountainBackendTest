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
import type ChildEntity from "./Child.entity";
import type TransactionEntity from "./Transaction.entity";

@Entity({ name: 'cards' })
export default class CardEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn({ type: 'timestamp', name: 'createdAt' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp', name: 'updatedAt' })
  updateAt: Date;

  @DeleteDateColumn()
  deletedAt?: Date;

  @Column()
  type: string;

  @Column({ select: false })
  securityCode: string;

  @Column()
  expirationDate: Date;

  @Column('int')
  monthlyLimit: number;

  @ManyToOne('ChildEntity', (child: ChildEntity) => child.cards)
  @JoinColumn()
  child: ChildEntity;

  @OneToMany('TransactionEntity', (transaction: TransactionEntity) => transaction.card)
  transactions: TransactionEntity[];
}
