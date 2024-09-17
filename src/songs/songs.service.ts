import { Injectable } from '@nestjs/common';

@Injectable()
export class SongsService {
  // local db
  // local array

  private readonly songs = [];

  create(song) {
    // Save a new song to the db
    this.songs.push(song);
  }

  findAll() {
    // fetch all songs from the db
    return this.songs;
  }
}
