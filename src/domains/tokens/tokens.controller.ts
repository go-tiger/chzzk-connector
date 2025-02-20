import { Body, Controller, Delete, Get, Param, Patch, Query, UseGuards } from '@nestjs/common';
import { TokensService } from './tokens.service';
import { GetCodeDto, RefreshTokenDto, RevokeTokenDto } from 'src/dtos';
import { ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { GetDeveloperId } from 'src/commons/get-developer-id.decorator';

@Controller('tokens')
export class TokensController {
  constructor(private readonly tokensService: TokensService) {}

  @Get()
  issueToken(@Query() query: GetCodeDto) {
    return this.tokensService.issueToken(query);
  }

  @Get('dev')
  @ApiBearerAuth()
  @UseGuards(AuthGuard())
  getTokensByDeveloperId(@GetDeveloperId() developerId: number) {
    return this.tokensService.getTokensByDeveloperId(developerId);
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
