import {
  Model,
  Table,
  Column,
  DataType,
  ForeignKey,
} from 'sequelize-typescript';
import { User } from './users.model';
import { Role } from './roles.model';
import { ROLES } from 'src/common/common.interface';

@Table({ tableName: 'user_roles', timestamps: false })
export class UserRole extends Model {
  @ForeignKey(() => User)
  @Column({ type: DataType.STRING(100), primaryKey: true })
  user_id: string;

  @ForeignKey(() => Role)
  @Column({
    type: DataType.INTEGER,
    defaultValue: ROLES.STUDENT,
    primaryKey: true,
  })
  role_id: number;
}
