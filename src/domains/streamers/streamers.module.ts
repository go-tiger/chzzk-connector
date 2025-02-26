import { forwardRef, Module } from '@nestjs/common';
import { StreamersService } from './streamers.service';
import { StreamersController } from './streamers.controller';
import { TokensModule } from '../tokens/tokens.module';
import { HttpModule } from '@nestjs/axios';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Streamer } from 'src/entities/streamer';
import { Token } from 'src/entities/token';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    TypeOrmModule.forFeature([Streamer, Token]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    forwardRef(() => TokensModule),
    HttpModule,
  ],
  controllers: [StreamersController],
  providers: [StreamersService],
  exports: [StreamersService],
})
export class StreamersModule {}
