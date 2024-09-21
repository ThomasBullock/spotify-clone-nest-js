import { Module } from '@nestjs/common';
import { SongsController } from './songs.controller';
import { SongsService } from './songs.service';

const mockSongsService = {
  findAll() {
    return [{ id: 2, title: 'Elastic Heart', artists: ['Sia'] }];
  },
};

@Module({
  controllers: [SongsController],
  // providers can factories, services, helper functions, etc.
  providers: [
    //  SongsService
    // {
    //   // alt syntax
    //   // provide: SongsService,
    //   // useClass: SongsService,
    // },
    {
      provide: SongsService,
      useValue: mockSongsService,
    },
  ],
})
export class SongsModule {}
