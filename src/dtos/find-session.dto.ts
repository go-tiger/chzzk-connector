import { ApiProperty } from '@nestjs/swagger';

export class FindSessionDto {
  @ApiProperty({ example: 20, default: 20, description: '조회할 세션 개수. 최소 1 ~ 최대 50 요청 가능' })
  size: number;

  @ApiProperty({ example: 0, default: 0, description: '조회할 페이지. 0부터 조회 가능' })
  page: string;
}
