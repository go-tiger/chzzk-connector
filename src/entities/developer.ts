import { Column, Entity, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Session } from './session';
import { Event } from './event';
import { Token } from './token';

@Entity('developers', { schema: 'public' })
export class Developer {
  @PrimaryGeneratedColumn({ type: 'integer' })
  id: number;

  @Column({ type: 'varchar' })
  email: string;

  @Column({ type: 'text' })
  password: string;

  @Column({ type: 'uuid', name: 'client_id', unique: true })
  clientId: string;

  @Column({ type: 'text', name: 'client_secret', unique: true })
  clientSecret: string;

  @Column({ type: 'varchar', name: 'application_id', unique: true })
  applicationId: string;

  @OneToOne(() => Session)
  sessions: Session;

  @OneToMany(() => Event, (event) => event.id)
  event: Event[];

  @OneToMany(() => Token, (token) => token.developer, { cascade: true })
  tokens: Token[];
}
