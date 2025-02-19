import { Controller, Param, Post } from '@nestjs/common';
import { SessionsService } from './sessions.service';

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
}
