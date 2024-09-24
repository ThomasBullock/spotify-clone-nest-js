import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Inject,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { SongsService } from './songs.service';
import { CreateSongDTO } from './dto/create-song-dto';
import { Connection } from 'src/common/constants/connection';
import { Song } from './song.entity';

@Controller('songs')
export class SongsController {
  constructor(
    private songsService: SongsService,
    @Inject('CONNECTION')
    private connection: Connection,
  ) {
    console.log(
      `THIS IS CONNNECTION STRING ${this.connection.CONNECTION_STRING}`,
    );
  }

  @Get()
  findAll(): Promise<Song[]> {
    try {
      return this.songsService.findAll();
    } catch (error) {
      throw new HttpException('Server Error', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Post()
  create(@Body() CreateSongDTO: CreateSongDTO) {
    return this.songsService.create(CreateSongDTO);
  }

  @Get(':id')
  findOne(
    // @Param('id', ParseIntPipe) option 1
    @Param(
      'id',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    ) // option 2 - custom error status code
    id: number,
  ) {
    console.log(this.connection.CONNECTION_STRING); // I have access cos this is injected
    return `fetch one song based on the id ${typeof id}`;
  }

  @Put(':id')
  update() {
    return 'update a song based on the id';
  }

  @Delete(':id')
  delete() {
    return 'delete a song based on the id';
  }
}
