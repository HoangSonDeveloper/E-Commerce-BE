import {
  Model,
  Table,
  Column,
  DataType,
  ForeignKey,
  BelongsToMany,
  BelongsTo,
} from 'sequelize-typescript';
import { Course } from './courses.model';
import { CourseCategory } from './course-categories';

@Table({ tableName: 'categories', timestamps: false })
export class Category extends Model {
  @Column({ type: DataType.INTEGER, autoIncrement: true, primaryKey: true })
  id: number;

  @Column({ type: DataType.STRING(30), allowNull: false })
  name: string;

  @Column({ type: DataType.TEXT })
  description: string;

  @ForeignKey(() => Category)
  @Column({ type: DataType.INTEGER })
  parent: number;
}
