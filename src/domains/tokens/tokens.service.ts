import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Token } from 'src/entities/token';
import { Repository } from 'typeorm';
import { GetCodeDto } from 'src/dtos';
import { CHZZK_BASE_URLS } from 'src/configs/chzzk.config';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { DevelopersService } from '../developers/developers.service';
import { GrantType } from 'src/enums/grant-type.enum';

@Injectable()
export class TokensService {
  private readonly chzzkTokenUrl: string = CHZZK_BASE_URLS.chzzkTokenUrl;
  constructor(
    private readonly httpService: HttpService,
    private readonly developersService: DevelopersService,
    @InjectRepository(Token) private TokenRepository: Repository<Token>,
  ) {}

  async issueToken(query: GetCodeDto) {
    const developer = await this.developersService.findOne(+query.state);
    try {
      const requestBody = {
        grantType: GrantType.AUTH,
        clientId: developer.clientId,
        clientSecret: developer.clientSecret,
        code: query.code,
        state: query.state,
      };

      const { data } = await firstValueFrom(this.httpService.post(this.chzzkTokenUrl, requestBody));

      console.log('🚀  응답 데이터:', data);

      const token = this.TokenRepository.create({
        code: data.code,
        message: data.message || 'null',
        accessToken: data.content.accessToken,
        refreshToken: data.content.refreshToken,
        tokenType: data.content.tokenType,
        expiresIn: data.content.expiresIn,
        scope: data.content.scope,
      });

      const savedToken = await this.TokenRepository.save(token);

      if (savedToken.createdAt && data.content.expiresIn) {
        savedToken.expiresAt = new Date(savedToken.createdAt.getTime() + data.content.expiresIn * 1000);
        await this.TokenRepository.save(savedToken);
      }

      return savedToken;
    } catch (e) {
      console.log('🚀  e:', e);
    }
  }
}
