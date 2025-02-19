import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CHZZK_BASE_URLS } from 'src/configs/chzzk.config';
import { Session } from 'src/entities/session';
import { Repository } from 'typeorm';
import { DevelopersService } from '../developers/developers.service';
import { firstValueFrom } from 'rxjs';
import { SessionType } from 'src/enums/session-type.enum';
import { TokensService } from '../tokens/tokens.service';
import { FindSessionDto } from 'src/dtos';

@Injectable()
export class SessionsService {
  private readonly chzzkOpenApi: string = CHZZK_BASE_URLS.chzzkOpenApi;
  constructor(
    private readonly httpService: HttpService,
    private readonly developersService: DevelopersService,
    private readonly tokensService: TokensService,
    @InjectRepository(Session) private SessionRepository: Repository<Session>,
  ) {}

  async createSessionClient(id: number) {
    const developer = await this.developersService.findOne(id);

    const requestHeader = {
      'Client-Id': developer.clientId,
      'Client-Secret': developer.clientSecret,
      'Content-Type': 'application/json',
    };

    try {
      const { data } = await firstValueFrom(
        this.httpService.get(`${this.chzzkOpenApi}/open/v1/sessions/auth/client`, { headers: requestHeader }),
      );

      const session = this.SessionRepository.create({
        url: data.content.url,
        sessionType: SessionType.CLIENT,
        developer,
      });
      return await this.SessionRepository.save(session);
    } catch (e) {
      console.log('🚀 e:', e);
    }
  }

  async createSessionUser(id: number) {
    const token = await this.tokensService.findOneToken(id);

    const requestHeader = {
      Authorization: token.tokenType + ' ' + token.accessToken,
      'Content-Type': 'application/json',
    };

    try {
      const { data } = await firstValueFrom(
        this.httpService.get(`${this.chzzkOpenApi}/open/v1/sessions/auth`, { headers: requestHeader }),
      );

      const session = this.SessionRepository.create({
        url: data.content.url,
        sessionType: SessionType.USER,
      });
      return await this.SessionRepository.save(session);
    } catch (e) {
      console.log('🚀 e:', e);
    }
  }

  async findSessionClient(id: number, dto: FindSessionDto) {
    const developer = await this.developersService.findOne(id);

    const requestHeader = {
      'Client-Id': developer.clientId,
      'Client-Secret': developer.clientSecret,
      'Content-Type': 'application/json',
    };

    try {
      const { data } = await firstValueFrom(
        this.httpService.get(`${this.chzzkOpenApi}/open/v1/sessions/client`, {
          headers: requestHeader,
          params: { size: dto.size, page: dto.page },
        }),
      );
      return data;
    } catch (e) {
      console.log('🚀 e:', e);
    }
  }

  async findSessionUser(id: number, dto: FindSessionDto) {
    const token = await this.tokensService.findOneToken(id);

    const requestHeader = {
      Authorization: token.tokenType + ' ' + token.accessToken,
      'Content-Type': 'application/json',
    };

    try {
      const { data } = await firstValueFrom(
        this.httpService.get(`${this.chzzkOpenApi}/open/v1/sessions`, {
          headers: requestHeader,
          params: { size: dto.size, page: dto.page },
        }),
      );
      return data;
    } catch (e) {
      console.log('🚀 e:', e);
    }
  }
}
