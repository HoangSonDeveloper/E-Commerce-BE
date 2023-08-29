import {
  Model,
  Table,
  Column,
  DataType,
  BelongsToMany,
} from 'sequelize-typescript';
import { User } from './users.model';
import { UserRole } from './user-roles.model';

@Table({ tableName: 'roles', timestamps: false })
export class Role extends Model {
  @Column({ type: DataType.INTEGER, autoIncrement: true, primaryKey: true })
  id: number;

  @Column({ type: DataType.STRING(30), allowNull: false })
  name: string;
}
