import {
  Column,
  Model,
  Table,
  DataType,
  Index,
  BelongsToMany,
  AllowNull,
} from 'sequelize-typescript';
import { Category } from './categories.model';
import { CourseCategory } from './course-categories';

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

  @Column(DataType.DECIMAL(10, 2))
  price: number;

  @Column(DataType.STRING)
  thumbnail: string;

  @Column({
    field: 'is_published',
    type: DataType.BOOLEAN,
  })
  isPublished: boolean;

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
}
