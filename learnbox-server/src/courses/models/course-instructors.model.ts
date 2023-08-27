import {
  Model,
  Table,
  Column,
  DataType,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import { Course } from '../../courses/models/courses.model';
import { User } from '../../users/models/users.model';

@Table({ tableName: 'course_instructors', timestamps: false })
export class CourseInstructor extends Model {
  @ForeignKey(() => Course)
  @Column({
    field: 'course_id',
    type: DataType.STRING,
    primaryKey: true,
  })
  courseId: string;

  @ForeignKey(() => User)
  @Column({
    field: 'instructor_id',
    type: DataType.STRING,
    primaryKey: true,
  })
  instructorId: number;

  @BelongsTo(() => Course)
  course: Course;

  @BelongsTo(() => User)
  instructor: User;
}
