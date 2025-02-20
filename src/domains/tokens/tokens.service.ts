import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Token } from 'src/entities/token';
import { Repository } from 'typeorm';
import { GetCodeDto, RefreshTokenDto, RevokeTokenDto } from 'src/dtos';
import { CHZZK_BASE_URLS } from 'src/configs/chzzk.config';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { DevelopersService } from '../developers/developers.service';
import { GrantType } from 'src/enums/grant-type.enum';
import { TokenType } from 'src/enums/token-type.enum';
import { plainToInstance } from 'class-transformer';
import { StreamersService } from '../streamers/streamers.service';

@Injectable()
export class TokensService {
  private readonly chzzkTokenUrl: string = CHZZK_BASE_URLS.chzzkTokenUrl;
  constructor(
    private readonly httpService: HttpService,
    private readonly developersService: DevelopersService,
    private readonly streamersService: StreamersService,
    @InjectRepository(Token) private TokenRepository: Repository<Token>,
  ) {}

  async issueToken(query: GetCodeDto) {
    const developer = await this.developersService.findApplicationId(query.state);
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
        developer,
      });

      const savedToken = await this.TokenRepository.save(token);
      console.log('🚀 savedToken:', savedToken);

      if (savedToken.createdAt && data.content.expiresIn) {
        savedToken.expiresAt = new Date(savedToken.createdAt.getTime() + data.content.expiresIn * 1000);
        await this.TokenRepository.save(savedToken);
      }

      await this.streamersService.createStreamer(savedToken.id);

      return plainToInstance(Token, savedToken);
    } catch (e) {
      console.log('🚀  e:', e);
      return e.response.data;
    }
  }

  async getTokensByDeveloperId(id: number) {
    return this.TokenRepository.find({ where: { developer: { id } } });
  }

  async findOneToken(id: number) {
    try {
      return await this.TokenRepository.findOneByOrFail({ id });
    } catch {
      throw new NotFoundException('검색 결과 없음');
    }
  }

  async refreshToken(id: number, dto: RefreshTokenDto) {
    const developer = await this.developersService.findOne(id);

    const token = await this.TokenRepository.findOne({ where: { refreshToken: dto.refreshToken } });
    if (!token) throw new NotFoundException('검색 결과 없음');

    const requestBody = {
      grantType: GrantType.RE_AUTH,
      refreshToken: dto.refreshToken,
      clientId: developer.clientId,
      clientSecret: developer.clientSecret,
    };

    try {
      const { data } = await firstValueFrom(this.httpService.post(this.chzzkTokenUrl, requestBody));

      Object.assign(token, {
        accessToken: data.content.accessToken,
        refreshToken: data.content.refreshToken,
        createdAt: new Date(),
        expiresAt: new Date(Date.now() + data.content.expiresIn * 1000),
      });

      await this.TokenRepository.save(token);

      console.log('🚀  응답 데이터:', data);
    } catch (e) {
      console.log('🚀  e:', e);
    }
  }

  async revokeToken(id: number, dto: RevokeTokenDto) {
    console.log('🚀  id:', id);
    const developer = await this.developersService.findOne(id);

    const token = await this.TokenRepository.findOne({
      where: [{ accessToken: dto.token }, { refreshToken: dto.token }],
    });
    if (!token) throw new NotFoundException('검색 결과 없음');
    console.log('🚀  requestBody.dto.tokenType:', dto.tokenType);
    const tokenType = TokenType[dto.tokenType as unknown as keyof typeof TokenType];

    const requestBody = {
      clientId: developer.clientId,
      clientSecret: developer.clientSecret,
      token: dto.token,
      tokenTypeHint: tokenType,
    };

    try {
      const { data } = await firstValueFrom(this.httpService.post(`${this.chzzkTokenUrl}/revoke`, requestBody));

      if (tokenType === TokenType.ACCESS) {
        token.accessToken = 'null';
      } else if (tokenType === TokenType.REFRESH) {
        token.refreshToken = 'null';
      }

      await this.TokenRepository.save(token);

      console.log('🚀  응답 데이터:', data);
    } catch (e) {
      console.log('🚀  e:', e);
    }
  }
}
