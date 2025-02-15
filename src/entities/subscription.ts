import { EventType } from 'src/enums/event-type.enum';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Event } from './event';
import { Streamer } from './streamer';

@Entity('subscriptions', { schema: 'public' })
export class Subscription {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'enum', enum: EventType, name: 'event_type' })
  eventType: EventType;

  @ManyToOne(() => Event, (event) => event.id)
  @JoinColumn({ name: 'event_id', referencedColumnName: 'id' })
  event: Event;

  @ManyToOne(() => Streamer, (streamer) => streamer.id)
  @JoinColumn({ name: 'streamer_id', referencedColumnName: 'id' })
  streamer: Streamer;
}
