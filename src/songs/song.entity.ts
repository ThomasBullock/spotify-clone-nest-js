import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('songs')
export class Song {
  //serves to automatically increment the primary key, a feature that may be specified either here or directly within the database.
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  // For shorter text varchar type is suitable
  @Column('varchar', { array: true })
  artists: string[];

  @Column('date')
  releasedDate: Date;

  // However, despite this type (date) declaration, the field will exclusively contain time information because the specific type has been set to time.
  @Column('time')
  duration: Date;

  // To accommodate a long string or text, the text type in Postgres is appropriate
  @Column('text')
  lyrics: string;
}
