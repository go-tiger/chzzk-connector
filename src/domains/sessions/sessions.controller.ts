import { Controller, Get, Param, Post, Query } from '@nestjs/common';
import { SessionsService } from './sessions.service';
import { FindSessionDto } from 'src/dtos';

@Controller('sessions')
export class SessionsController {
  constructor(private readonly sessionsService: SessionsService) {}

  @Post(':id/client')
  createSessionClient(@Param('id') id: string) {
    return this.sessionsService.createSessionClient(+id);
  }

  @Post(':id/user')
  createSessionUser(@Param('id') id: string) {
    return this.sessionsService.createSessionUser(+id);
  }

  @Get(':id/client')
  findSessionClient(@Param('id') id: string, @Query() dto: FindSessionDto) {
    return this.sessionsService.findSessionClient(+id, dto);
  }
}
