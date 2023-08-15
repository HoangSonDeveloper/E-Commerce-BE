import {
  Model,
  Table,
  Column,
  DataType,
  ForeignKey,
} from 'sequelize-typescript';
import { Course } from '../../courses/models/courses.model';

@Table({ tableName: 'course_instructors', timestamps: false })
export class CourseInstructor extends Model {
  @ForeignKey(() => Course)
  @Column({
    field: 'course_id',
    type: DataType.STRING,
    primaryKey: true,
  })
  courseId: string;

  @Column({
    field: 'instructor_id',
    type: DataType.STRING,
    primaryKey: true,
  })
  instructorId: number;
}
