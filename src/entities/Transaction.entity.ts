import {
  BaseEntity,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from "typeorm";
import CardEntity from "./Card.entity";

@Entity({ name: 'transactions' })
export default class TransactionEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn({ type: 'timestamp', name: 'createdAt' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp', name: 'updatedAt' })
  updateAt: Date;

  @DeleteDateColumn()
  deletedAt?: Date;

  @Column('int')
  charge: number;

  @Column({ select: false })
  password: string;

  @Column()
  email: string;

  @ManyToOne('CardEntity', (card: CardEntity) => card.transactions)
  @JoinColumn()
  card: CardEntity
}
