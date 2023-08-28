import {
  Column,
  Model,
  Table,
  DataType,
  Index,
  BelongsToMany,
  AllowNull,
  HasMany,
  BelongsTo,
} from 'sequelize-typescript';
import { Category } from './categories.model';
import { CourseCategory } from './course-categories';
import { CourseInstructor } from './course-instructors.model';
import { User } from '../../users/models/users.model';

@Table({
  tableName: 'courses',
  timestamps: true,
})
export class Course extends Model {
  @AllowNull(false)
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV1,
    primaryKey: true,
  })
  id: string;

  @AllowNull(false)
  @Column(DataType.STRING)
  name: string;

  @Column({
    type: DataType.STRING,
    field: 'short_description',
  })
  shortDescription: string;

  @Column(DataType.STRING)
  description: string;

  @Column(DataType.STRING)
  outcome: string;

  @Column({
    type: DataType.ENUM,
    values: ['one-on-one', 'group', 'self-paced'],
  })
  format: string;

  @Column({
    type: DataType.ENUM,
    values: ['beginner', 'intermediate', 'advanced'],
  })
  level: string;

  @AllowNull(false)
  @Column(DataType.DECIMAL(10, 2))
  price: number;

  @Column({
    type: DataType.STRING,
    defaultValue: process.env.DEFAULT_USER_IMAGE,
  })
  thumbnail: string;

  @Column({
    field: 'is_published',
    type: DataType.BOOLEAN,
    defaultValue: false,
  })
  isPublished: boolean;

  @Column({
    field: 'rating',
    type: DataType.DECIMAL(10, 2),
  })
  rating: number;

  @Column({
    field: 'created_at',
    type: DataType.DATE,
  })
  createdAt: Date;

  @Column({
    field: 'updated_at',
    type: DataType.DATE,
  })
  updatedAt: Date;

  @BelongsToMany(() => Category, () => CourseCategory)
  categories: Category[];

  @BelongsToMany(() => User, () => CourseInstructor)
  instructors: User[];

  @HasMany(() => CourseInstructor)
  course_instructors: CourseInstructor[];
}
