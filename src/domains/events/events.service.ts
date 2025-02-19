import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CHZZK_BASE_URLS } from 'src/configs/chzzk.config';
import { Event } from 'src/entities/event';
import { Repository } from 'typeorm';
import { TokensService } from '../tokens/tokens.service';
import { SessionKeyDto } from 'src/dtos';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class EventsService {
  private readonly chzzkOpenApi: string = CHZZK_BASE_URLS.chzzkOpenApi;
  constructor(
    private readonly httpService: HttpService,
    private readonly tokensService: TokensService,
  ) {}

  async subscribeChat(id: number, query: SessionKeyDto) {
    const token = await this.tokensService.findOneToken(id);

    const requestHeader = {
      Authorization: token.tokenType + ' ' + token.accessToken,
      'Content-Type': 'application/json',
    };

    try {
      const { data } = await firstValueFrom(
        this.httpService.post(
          `${this.chzzkOpenApi}/open/v1/sessions/events/subscribe/chat`,
          {},
          { headers: requestHeader, params: { sessionKey: query.sessionKey } },
        ),
      );
      return data;
    } catch (e) {
      return e.response.data;
    }
  }

  async unsubscribeChat(id: number, query: SessionKeyDto) {
    const token = await this.tokensService.findOneToken(id);

    const requestHeader = {
      Authorization: token.tokenType + ' ' + token.accessToken,
      'Content-Type': 'application/json',
    };

    try {
      const { data } = await firstValueFrom(
        this.httpService.post(
          `${this.chzzkOpenApi}/open/v1/sessions/events/unsubscribe/chat`,
          {},
          { headers: requestHeader, params: { sessionKey: query.sessionKey } },
        ),
      );
      return data;
    } catch (e) {
      return e.response.data;
    }
  }

  async subscribeDonation(id: number, query: SessionKeyDto) {
    const token = await this.tokensService.findOneToken(id);

    const requestHeader = {
      Authorization: token.tokenType + ' ' + token.accessToken,
      'Content-Type': 'application/json',
    };

    try {
      const { data } = await firstValueFrom(
        this.httpService.post(
          `${this.chzzkOpenApi}/open/v1/sessions/events/subscribe/donation`,
          {},
          { headers: requestHeader, params: { sessionKey: query.sessionKey } },
        ),
      );
      return data;
    } catch (e) {
      return e.response.data;
    }
  }
}
