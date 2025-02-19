import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Developer } from './developer';
import { SessionType } from 'src/enums/session-type.enum';

@Entity('sessions', { schema: 'public' })
export class Session {
  @PrimaryGeneratedColumn({ type: 'integer', name: 'id' })
  id: number;

  @Column({ type: 'text' })
  url: string;

  @Column({ type: 'enum', enum: SessionType, name: 'session_type' })
  sessionType: SessionType;

  @OneToOne(() => Developer)
  @JoinColumn({ name: 'developer_id' })
  developer: Developer;
}
