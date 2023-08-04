import {
  Model,
  Table,
  Column,
  DataType,
  ForeignKey,
  BelongsToMany,
} from 'sequelize-typescript';
import { Course } from './courses.model';
import { Category } from './categories.model';

@Table({ tableName: 'course_categories', timestamps: false })
export class CourseCategory extends Model {
  @ForeignKey(() => Category)
  @Column({ field: 'category_id', type: DataType.UUIDV1, primaryKey: true })
  categoryId: string;

  @ForeignKey(() => Course)
  @Column({
    field: 'course_id',
    type: DataType.INTEGER,
    primaryKey: true,
  })
  courseId: number;
}
