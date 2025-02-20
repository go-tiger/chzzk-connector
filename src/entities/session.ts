import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Developer } from './developer';
import { SessionType } from 'src/enums/session-type.enum';
import { Exclude } from 'class-transformer';

@Entity('sessions', { schema: 'public' })
export class Session {
  @PrimaryGeneratedColumn({ type: 'integer', name: 'id' })
  id: number;

  @Column({ type: 'text' })
  url: string;

  @Column({ type: 'enum', enum: SessionType, name: 'session_type' })
  sessionType: SessionType;

  @ManyToOne(() => Developer, (developer) => developer.id)
  @JoinColumn({ name: 'developer_id', referencedColumnName: 'id' })
  @Exclude()
  developer: Developer;
}
