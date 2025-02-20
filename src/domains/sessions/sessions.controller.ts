import { Controller, Get, Param, Post, Query, UseGuards } from '@nestjs/common';
import { SessionsService } from './sessions.service';
import { FindSessionDto } from 'src/dtos';
import { ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { GetDeveloperId } from 'src/commons/get-developer-id.decorator';

@Controller('sessions')
export class SessionsController {
  constructor(private readonly sessionsService: SessionsService) {}

  @Post('client')
  @ApiBearerAuth()
  @UseGuards(AuthGuard())
  createSessionClient(@GetDeveloperId() developerId: number) {
    return this.sessionsService.createSessionClient(developerId);
  }

  @Post(':id/user')
  createSessionUser(@Param('id') id: string) {
    return this.sessionsService.createSessionUser(+id);
  }

  @Get('client')
  @ApiBearerAuth()
  @UseGuards(AuthGuard())
  findSessionClient(@GetDeveloperId() developerId: number, @Query() dto: FindSessionDto) {
    return this.sessionsService.findSessionClient(developerId, dto);
  }

  @Get(':id/user')
  findSessionUser(@Param('id') id: string, @Query() dto: FindSessionDto) {
    return this.sessionsService.findSessionUser(+id, dto);
  }
}
