import { Entity, PrimaryColumn } from 'typeorm';

@Entity('users')
class User {
  @PrimaryColumn('uuid')
  id: String;
}

export { User };
