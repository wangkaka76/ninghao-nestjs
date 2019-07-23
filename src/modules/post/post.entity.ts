import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, ManyToMany } from 'typeorm';
import { User } from '../../../dist/modules/user/user.entity';
import { type } from 'os';
import { Category } from '../category/category.entity';

@Entity()
export class Post {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column('longtext', { nullable: true })
  body: string;

  @CreateDateColumn()
  created: Date;

  @UpdateDateColumn()
  updated: Date;

  @ManyToOne(type => User, user => user.posts)
  user: User;

  @ManyToMany(type => User, user => user.voted)
  liked: User[];

  @ManyToOne(type => Category, category => category.posts)
  category: Category
}
