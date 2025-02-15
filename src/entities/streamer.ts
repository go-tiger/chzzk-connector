import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Token } from './token';
import { Subscription } from './subscription';

@Entity('streamers', { schema: 'public' })
export class Streamer {
  @PrimaryGeneratedColumn({ type: 'integer' })
  id: number;

  @Column({ type: 'varchar' })
  channel: string;

  @Column({ type: 'varchar' })
  name: string;

  @OneToOne(() => Token)
  @JoinColumn({ name: 'token_id' })
  token: Token;

  @OneToMany(() => Subscription, (subscription) => subscription.id)
  subscription: Subscription[];
}
