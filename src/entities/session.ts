import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Developer } from './developer';

@Entity('sessions', { schema: 'public' })
export class Session {
  @PrimaryGeneratedColumn({ type: 'integer', name: 'id' })
  id: number;

  @Column({ type: 'text' })
  url: string;

  @OneToOne(() => Developer)
  @JoinColumn({ name: 'developer_id' })
  developer: Developer;
}
