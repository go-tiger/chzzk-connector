import { Column, Entity, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Session } from './session';
import { Event } from './event';

@Entity('developers', { schema: 'public' })
export class Developer {
  @PrimaryGeneratedColumn({ type: 'integer' })
  id: number;

  @Column({ type: 'uuid', name: 'client_id' })
  clientId: string;

  @Column({ type: 'text', name: 'client_secret' })
  clientSecret: string;

  @OneToOne(() => Session)
  sessions: Session;

  @OneToMany(() => Event, (event) => event.id)
  event: Event[];
}
