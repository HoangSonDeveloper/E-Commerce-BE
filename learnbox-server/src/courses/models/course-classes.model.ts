import {
  Model,
  Table,
  Column,
  DataType,
  ForeignKey,
} from 'sequelize-typescript';
import { Course } from '../../courses/models/courses.model';

@Table({
  tableName: 'classes',
  timestamps: false, // Set this to true if you have createdAt and updatedAt columns
})
export class CourseClass extends Model {
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV1,
    primaryKey: true,
  })
  id: string;

  @ForeignKey(() => Course) // Define the foreign key reference to the Course model
  @Column(DataType.STRING)
  course_id: string;

  @Column({
    field: 'start_date',
    type: DataType.DATE,
  })
  startDate: Date;

  @Column({
    field: 'end_date',
    type: DataType.DATE,
  })
  endDate: Date;

  @Column({
    field: 'registration_start',
    type: DataType.DATE,
  })
  registrationStart: Date;

  @Column({
    field: 'registration_end',
    type: DataType.DATE,
  })
  registrationEnd: Date;

  @Column({
    field: 'enrollment_limit',
    type: DataType.INTEGER,
  })
  enrollmentLimit: number;

  @Column(DataType.INTEGER)
  enrolled: number;
}
