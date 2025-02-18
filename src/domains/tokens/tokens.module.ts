import { Module } from '@nestjs/common';
import { TokensService } from './tokens.service';
import { TokensController } from './tokens.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Token } from 'src/entities/token';
import { HttpModule } from '@nestjs/axios';
import { DevelopersModule } from '../developers/developers.module';

@Module({
  imports: [TypeOrmModule.forFeature([Token]), HttpModule, DevelopersModule],
  controllers: [TokensController],
  providers: [TokensService],
})
export class TokensModule {}
