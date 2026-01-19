import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Task {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column({ nullable: true })
  dueDate: Date;

  @Column({ nullable: true })
  description: string;

  @Column()
  status: string;

  @Column()
  userId: string;
}
