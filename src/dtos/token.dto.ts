import { ApiProperty, PickType } from '@nestjs/swagger';

export class TokenDto {
  @ApiProperty({ example: 1, description: '토큰의 고유 ID' })
  id: number;

  @ApiProperty({ example: 'fefb6bbb-00c2-497c-afc2-XXXXXXXXXXXX', description: 'code' })
  code: string;

  @ApiProperty({ example: 'Success', description: '응답 메시지' })
  message: string;

  @ApiProperty({ example: 'eyJhbGciOiJIUzI1NiIsInR...', description: '액세스 토큰' })
  accessToken: string;

  @ApiProperty({ example: 'dGhpcyBpcyBhIHJlZnJlc2gtdG9rZW4', description: '리프레시 토큰' })
  refreshToken: string;

  @ApiProperty({ example: 'Bearer', description: '토큰 타입 (ex: Bearer)' })
  tokenType: string;

  @ApiProperty({ example: 86400, description: '토큰 유효 시간 (초)' })
  expiresIn: number;

  @ApiProperty({ example: '채팅 메시지 조회', description: '토큰 권한 범위' })
  scope: string;

  @ApiProperty({ example: '2025-02-17T12:00:00.000Z', description: '토큰 생성 시간' })
  createdAt: Date;

  @ApiProperty({ example: '2025-02-17T13:00:00.000Z', description: '토큰 만료 시간' })
  expiresAt: Date;
}

export class GetCodeDto extends PickType(TokenDto, ['code'] as const) {
  @ApiProperty({ example: 'zxclDasdfA25', description: 'state' })
  state: string;
}

export class RefreshTokenDto extends PickType(TokenDto, ['refreshToken'] as const) {}
