import { Controller, Get, Post, Param, Delete, UseGuards } from '@nestjs/common';
import { StreamersService } from './streamers.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { GetDeveloperId } from 'src/commons/get-developer-id.decorator';

@ApiTags('Streamers')
@Controller('streamers')
export class StreamersController {
  constructor(private readonly streamersService: StreamersService) {}

  @Post(':id')
  createStreamer(@Param('id') id: string) {
    return this.streamersService.createStreamer(+id);
  }

  @Get(':id/id')
  findStreamer(@Param('id') id: string) {
    return this.streamersService.findStreamer(+id);
  }

  @Get('dev')
  @ApiBearerAuth()
  @UseGuards(AuthGuard())
  getStremersByDeveloperId(@GetDeveloperId() developerId: number) {
    return this.streamersService.getStremersByDeveloperId(developerId);
  }

  @Delete(':id')
  removeStreamer(@Param('id') id: string) {
    return this.streamersService.removeStreamer(+id);
  }
}
