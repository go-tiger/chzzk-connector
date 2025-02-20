import { Controller, Get, Post, Param, Delete } from '@nestjs/common';
import { StreamersService } from './streamers.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Streamers')
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

  @Delete(':id')
  removeStreamer(@Param('id') id: string) {
    return this.streamersService.removeStreamer(+id);
  }
}
