import { Column, Entity, JoinColumn, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Developer } from './developer';
import { Subscription } from './subscription';

@Entity('events', { schema: 'public' })
export class Event {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'integer' })
  count: number;

  @Column({ type: 'jsonb' })
  lists: object;

  @Column({ type: 'timestamp', name: 'connected_date' })
  connectedDate: Date;

  @Column({ type: 'timestamp', name: 'disconnected_date' })
  disconnectedDate: Date;

  @ManyToOne(() => Developer, (developer) => developer.id)
  @JoinColumn([{ name: 'developer_id', referencedColumnName: 'id' }])
  developer: Developer;
  subscription: Subscription;
}
