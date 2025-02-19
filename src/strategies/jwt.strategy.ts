import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Developer } from 'src/entities/developer';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly configService: ConfigService,
    @InjectRepository(Developer) private readonly DevelopersRepository: Repository<Developer>,
  ) {
    super({
      secretOrKey: configService.get<string>('ENV_JWT_SECRET') || '4cheikjcCXrZUYweiorjjC2qk5tqero',
      ignoreExpiration: false,
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    });
  }

  async validate(payload) {
    const { id } = payload;
    const developer = await this.DevelopersRepository.findOneBy({ id });

    if (!developer) {
      throw new UnauthorizedException();
    }

    return developer;
  }
}
