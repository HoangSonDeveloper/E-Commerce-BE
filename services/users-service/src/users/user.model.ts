import { Column, Model, Table, DataType, Index } from 'sequelize-typescript';
// import { UserDto } from './user.dto';

@Table({
  modelName: 'user',
  tableName: 'users',
})
export class User extends Model {
  @Column({
    primaryKey: true,
    type: DataType.UUID,
    defaultValue: DataType.UUIDV1,
    comment: 'The identifier for the user record.',
  })
  id: string;

  @Index('user_name')
  @Column({
    type: DataType.TEXT,
    comment: "The user's name.",
  })
  name: string;

  @Index('user_email')
  @Column({
    type: DataType.TEXT,
    comment: "The user's email.",
  })
  email: string;

  @Column({
    type: DataType.TEXT,
    comment: "The user's password.",
  })
  password: string;

  // rename createdAt to created_at
  @Column({
    field: 'created_at',
    type: DataType.DATE,
    comment: 'The date and time when the record was created.',
  })
  createdAt: Date;

  // rename updatedAt to updated_at
  @Column({
    field: 'updated_at',
    type: DataType.DATE,
    comment: 'The date and time when the record was last updated.',
  })
  updatedAt: Date;
}
