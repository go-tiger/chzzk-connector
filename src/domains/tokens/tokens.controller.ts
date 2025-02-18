import { Controller, Get, Param, Query } from '@nestjs/common';
import { TokensService } from './tokens.service';
import { GetCodeDto } from 'src/dtos';

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
}
