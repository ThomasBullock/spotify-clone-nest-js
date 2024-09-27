import {
  Entity,
  JoinColumn,
  ManyToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from '../users/user.entity';
import { Song } from 'src/songs/song.entity';

@Entity('artists')
export class Artist {
  @PrimaryGeneratedColumn()
  id: number;

  // A user can register as an artist
  // Each artist will have only a user profile

  // Utilize TypeORM’s @OneToOne decorator to specify the target relation type, which in this case is User.
  @OneToOne(() => User)
  // Include the @JoinColumn to ensure that the Artist entity possesses the relation ID or foreign key;
  // this will result in the Artist table having userId as a foreign key.
  @JoinColumn()
  user: User;

  // @ManyToMany relation in the Artist entity. The first argument specifies the target entity,
  // and the second argument represents the inverse side of the relationship.
  @ManyToMany(() => Song, (song) => song.artists)
  songs: Song[];
}
