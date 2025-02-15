import { Column, CreateDateColumn, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Streamer } from './streamer';

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

  @Column({ type: 'timestamp', name: 'expires_at' })
  expiresAt: Date;

  @OneToOne(() => Streamer)
  streamers: Streamer;
}
