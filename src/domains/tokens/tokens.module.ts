import { forwardRef, Module } from '@nestjs/common';
import { TokensService } from './tokens.service';
import { TokensController } from './tokens.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Token } from 'src/entities/token';
import { HttpModule } from '@nestjs/axios';
import { DevelopersModule } from '../developers/developers.module';
import { StreamersModule } from '../streamers/streamers.module';

@Module({
  imports: [TypeOrmModule.forFeature([Token]), HttpModule, DevelopersModule, forwardRef(() => StreamersModule)],
  controllers: [TokensController],
  providers: [TokensService],
  exports: [TokensService],
})
export class TokensModule {}
