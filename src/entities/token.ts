import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Streamer } from './streamer';
import { Developer } from './developer';

@Entity('tokens', { schema: 'public' })
export class Token {
  @PrimaryGeneratedColumn({ type: 'integer' })
  id: number;

  @Column({ type: 'integer' })
  code: number;

  @Column({ type: 'text' })
  message: string;

  @Column({ type: 'text', name: 'access_token' })
  accessToken: string;

  @Column({ type: 'text', name: 'refresh_token' })
  refreshToken: string;

  @Column({ type: 'text', name: 'token_type' })
  tokenType: string;

  @Column({ type: 'integer', name: 'expires_in' })
  expiresIn: number;

  @Column({ type: 'text' })
  scope: string;

  @CreateDateColumn({ type: 'timestamp', name: 'created_at', nullable: false })
  createdAt: Date;

  @Column({ type: 'timestamp', name: 'expires_at', nullable: true })
  expiresAt: Date;

  @OneToOne(() => Streamer)
  streamers: Streamer;

  @ManyToOne(() => Developer, (developer) => developer.id)
  @JoinColumn({ name: 'developer_id', referencedColumnName: 'id' })
  developer: Developer;
}
