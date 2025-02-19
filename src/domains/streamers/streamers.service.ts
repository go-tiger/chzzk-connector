import { Injectable } from '@nestjs/common';
import { TokensService } from '../tokens/tokens.service';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { CHZZK_BASE_URLS } from 'src/configs/chzzk.config';
import { InjectRepository } from '@nestjs/typeorm';
import { Streamer } from 'src/entities/streamer';
import { Repository } from 'typeorm';

@Injectable()
export class StreamersService {
  private readonly chzzkOpenApi: string = CHZZK_BASE_URLS.chzzkOpenApi;
  constructor(
    private readonly httpService: HttpService,
    private readonly tokensService: TokensService,
    @InjectRepository(Streamer) private StreamerRepository: Repository<Streamer>,
  ) {}

  async createStreamer(id: number) {
    const token = await this.tokensService.findOneToken(id);

    const requestHeader = {
      Authorization: token.tokenType + ' ' + token.accessToken,
      'Content-Type': 'application/json',
    };

    try {
      const { data } = await firstValueFrom(
        this.httpService.get(`${this.chzzkOpenApi}/open/v1/users/me`, { headers: requestHeader }),
      );

      const streamer = this.StreamerRepository.create({
        channel: data.content.channelId,
        name: data.content.channelName,
        token,
      });

      return await this.StreamerRepository.save(streamer);
    } catch (e) {
      console.log('🚀 e:', e);
    }
  }
}
