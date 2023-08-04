import {
  Model,
  Table,
  Column,
  DataType,
  ForeignKey,
} from 'sequelize-typescript';
import { CourseClass } from '../../course-classes/models/course-classes.model';

@Table({
  tableName: 'enrollments',
  timestamps: false,
})
export class Enrollment extends Model {
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV1,
    primaryKey: true,
  })
  id: string;

  @Column({
    field: 'class_id',
    type: DataType.STRING,
  })
  classId: string;

  @Column({
    field: 'student_id',
    type: DataType.STRING,
  })
  studentId: string;

  @Column({
    field: 'enrollment_date',
    type: DataType.DATE,
    defaultValue: DataType.NOW,
  })
  enrollmentDate: Date;

  @Column({
    type: DataType.BOOLEAN,
    defaultValue: false,
  })
  cancelled: boolean;

  @Column({
    field: 'cancel_reason',
    type: DataType.STRING,
  })
  cancelReason: string;
}
