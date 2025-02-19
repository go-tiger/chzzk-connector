import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CHZZK_BASE_URLS } from 'src/configs/chzzk.config';
import { Session } from 'src/entities/session';
import { Repository } from 'typeorm';
import { DevelopersService } from '../developers/developers.service';
import { firstValueFrom } from 'rxjs';
import { SessionType } from 'src/enums/session-type.enum';

@Injectable()
export class SessionsService {
  private readonly chzzkOpenApi: string = CHZZK_BASE_URLS.chzzkOpenApi;
  constructor(
    private readonly httpService: HttpService,
    private readonly developersService: DevelopersService,
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
      await this.SessionRepository.save(session);
    } catch (e) {
      console.log('🚀 e:', e);
    }
  }
}
