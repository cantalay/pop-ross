import {
  Column,
  CreateDateColumn,
  Entity,
  ObjectID,
  ObjectIdColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Exclude } from 'class-transformer';

@Entity()
export class User {
  @ObjectIdColumn()
  _id: ObjectID;

  @Column({
    unique: true,
  })
  userName: string;

  @Column()
  fullName: string;

  @Column()
  @Exclude()
  password: string;

  @Column({
    unique: true,
  })
  email: string;

  @Column()
  phone: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
