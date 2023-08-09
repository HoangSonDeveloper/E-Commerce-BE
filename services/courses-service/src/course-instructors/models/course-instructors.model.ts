import {
  Model,
  Table,
  Column,
  DataType,
  ForeignKey,
} from 'sequelize-typescript';
import { Course } from 'src/courses/models/courses.model';

@Table({ tableName: 'user_roles', timestamps: false })
export class UserRole extends Model {
  @Column({
    field: 'course_id',
    type: DataType.STRING,
    primaryKey: true,
  })
  courseId: string;

  @ForeignKey(() => Course)
  @Column({
    field: 'instructor_id',
    type: DataType.STRING,
    primaryKey: true,
  })
  instructorId: number;
}
