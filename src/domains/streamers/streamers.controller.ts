import { Controller, Get, Post, Param } from '@nestjs/common';
import { StreamersService } from './streamers.service';

@Controller('streamers')
export class StreamersController {
  constructor(private readonly streamersService: StreamersService) {}

  @Post(':id')
  createStreamer(@Param('id') id: string) {
    return this.streamersService.createStreamer(+id);
  }

  @Get(':id')
  findStreamer(@Param('id') id: string) {
    return this.streamersService.findStreamer(+id);
  }
}
