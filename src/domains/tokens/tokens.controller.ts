import { Body, Controller, Delete, Get, Param, Patch, Query } from '@nestjs/common';
import { TokensService } from './tokens.service';
import { GetCodeDto, RefreshTokenDto, RevokeTokenDto } from 'src/dtos';

@Controller('tokens')
export class TokensController {
  constructor(private readonly tokensService: TokensService) {}

  @Get()
  issueToken(@Query() query: GetCodeDto) {
    return this.tokensService.issueToken(query);
  }

  @Get(':id')
  findOneToken(@Param('id') id: string) {
    return this.tokensService.findOneToken(+id);
  }

  @Patch(':id')
  refreshToken(@Param('id') id: string, @Body() dto: RefreshTokenDto) {
    return this.tokensService.refreshToken(+id, dto);
  }

  @Delete(':id')
  revokeToken(@Param('id') id: string, @Body() dto: RevokeTokenDto) {
    return this.tokensService.revokeToken(+id, dto);
  }
}
