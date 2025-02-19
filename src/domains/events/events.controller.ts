import { Controller, Post, Param, Query, Delete } from '@nestjs/common';
import { EventsService } from './events.service';
import { SessionKeyDto } from 'src/dtos';

@Controller('events')
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}

  @Post(':id/chat')
  subscribeChat(@Param('id') id: string, @Query() query: SessionKeyDto) {
    return this.eventsService.subscribeChat(+id, query);
  }

  @Delete(':id/chat')
  unsubscribeChat(@Param('id') id: string, @Query() query: SessionKeyDto) {
    return this.eventsService.unsubscribeChat(+id, query);
  }

  @Post(':id/donation')
  subscribeDonation(@Param('id') id: string, @Query() query: SessionKeyDto) {
    return this.eventsService.subscribeDonation(+id, query);
  }

  @Delete(':id/donation')
  unsubscribeDonation(@Param('id') id: string, @Query() query: SessionKeyDto) {
    return this.eventsService.unsubscribeDonation(+id, query);
  }
}
