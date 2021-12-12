import * as bcrypt from 'bcryptjs';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import ChildEntity from './Child.entity';

@Entity({ name: 'parents' })
export default class ParentEntity extends BaseEntity {
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

  @Column({ select: false })
  password: string;

  @Column()
  email: string;

  @OneToMany(() => ChildEntity, (child) => child.parent)
  children: ChildEntity[];

  // compare password entity method
  async validatePassword(password: string): Promise<boolean> {
    try {
      return await bcrypt.compare(password, this.password);
    } catch (error) {
      return false;
    }
  }
}
