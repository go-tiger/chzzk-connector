import { ApiProperty, OmitType, PartialType } from '@nestjs/swagger';

export class DeveloperDto {
  @ApiProperty({ example: 1 })
  id: number;

  @ApiProperty({ description: '이메일' })
  email: string;

  @ApiProperty({ description: '비밀번호' })
  password: string;

  @ApiProperty({ example: '12a7764f-0582-456f-a358-884fa70e5caa' })
  clientId: string;

  @ApiProperty({ example: 'NwelrUQjkYmOuobj8OLrLGlWL5ElxrldhDeXB-PuGFs' })
  clientSecret: string;
}

export class CreateDeveloperDto extends OmitType(DeveloperDto, ['id'] as const) {}

export class UpdateDeveloperDto extends PartialType(CreateDeveloperDto) {}
