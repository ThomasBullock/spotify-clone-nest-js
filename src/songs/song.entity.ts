import { Artist } from 'src/artists/artist.entity';
import { Playlist } from 'src/playlists/playlist.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('songs')
export class Song {
  //serves to automatically increment the primary key, a feature that may be specified either here or directly within the database.
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column('date')
  releasedDate: Date;

  // However, despite this type (date) declaration, the field will exclusively contain time information because the specific type has been set to time.
  @Column('time')
  duration: Date;

  // To accommodate a long string or text, the text type in Postgres is appropriate
  @Column('text')
  lyrics: string;

  // For shorter text varchar type is suitable
  // @Column('varchar', { array: true })
  // artists: string[];

  @ManyToMany(() => Artist, (artist) => artist.songs, { cascade: true })
  // Include @JoinTable() annotation, which is mandatory for @ManyToMany relationships. *
  @JoinTable({ name: 'song_artists' })
  artists: Artist[];

  /**
   * Many songs can belong to playlist for each unique user
   */
  @ManyToOne(() => Playlist, (playlist) => playlist.songs)
  playList: Playlist;
}

// * Optionally, rename the JoinTable to create a table named songs_artists in the database. This table will house the primary keys from both the songs and artists tables, functioning as foreign keys.
