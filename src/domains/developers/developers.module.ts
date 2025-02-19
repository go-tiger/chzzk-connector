import { Module } from '@nestjs/common';
import { DevelopersService } from './developers.service';
import { DevelopersController } from './developers.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Developer } from 'src/entities/developer';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from 'src/strategies/jwt.strategy';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    TypeOrmModule.forFeature([Developer]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>('ENV_JWT_SECRET'),
        signOptions: { expiresIn: `${configService.get<string>('ENV_JWT_EXPIRES_IN')}d` },
      }),
    }),
  ],
  controllers: [DevelopersController],
  providers: [DevelopersService, JwtStrategy],
  exports: [DevelopersService, PassportModule],
})
export class DevelopersModule {}
