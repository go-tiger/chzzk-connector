import { ApiProperty, OmitType, PartialType, PickType } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class DeveloperDto {
  @ApiProperty({ example: 1 })
  @Expose()
  id: number;

  @ApiProperty({ description: '이메일' })
  @Expose()
  email: string;

  @ApiProperty({ description: '비밀번호' })
  password: string;

  @ApiProperty({ example: '12a7764f-0582-456f-a358-884fa70e5caa' })
  @Expose()
  clientId: string;

  @ApiProperty({ example: 'NwelrUQjkYmOuobj8OLrLGlWL5ElxrldhDeXB-PuGFs' })
  @Expose()
  clientSecret: string;
}

export class CreateDeveloperDto extends OmitType(DeveloperDto, ['id'] as const) {}

export class UpdateDeveloperDto extends PartialType(CreateDeveloperDto) {}

export class LoginDeveloperDto extends PickType(DeveloperDto, ['email', 'password'] as const) {}

export class DeveloperResDto extends OmitType(DeveloperDto, ['password'] as const) {}
