import {
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  ObjectID,
  ObjectIdColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Exclude } from 'class-transformer';
import * as bcrypt from 'bcrypt';

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

  @BeforeInsert()
  async updatePassword() {
    this.password = await bcrypt.hash(this.password, 10);
  }
}
