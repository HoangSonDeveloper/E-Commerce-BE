import {
  Column,
  Model,
  Table,
  DataType,
  Index,
  BelongsToMany,
  Association,
  addAssociation,
  HasOne,
} from 'sequelize-typescript';
import { Role } from './roles.model';
import { UserRole } from './user-roles.model';
import { CourseInstructor } from '../../courses/models/course-instructors.model';
import { Course } from '../../courses/models/courses.model';

@Table({
  tableName: 'users',
  timestamps: true,
})
export class User extends Model {
  @Column({
    primaryKey: true,
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    comment: 'The identifier for the user record.',
  })
  id: string;

  @Index('user_name')
  @Column({
    type: DataType.TEXT,
    comment: "The user's name.",
  })
  name: string;

  @Index('user_email')
  @Column({
    type: DataType.TEXT,
    allowNull: false,
    comment: "The user's email.",
  })
  email: string;

  @Column({
    type: DataType.TEXT,
    allowNull: false,
    comment: "The user's password.",
  })
  password: string;

  @Index('user_isVerified')
  @Column({
    type: DataType.BOOLEAN,
    defaultValue: false,
    allowNull: false,
    comment: "The user's verification status.",
  })
  isverified: string;

  @Index('user_birthday')
  @Column({
    type: DataType.DATE,
    comment: "The user's birthday.",
  })
  birthday: Date;

  @Index('user_avatar')
  @Column({
    type: DataType.TEXT,
    comment: "The user's avatar url.",
  })
  avatar: string;

  @Index('user_phone')
  @Column({
    type: DataType.TEXT,
    comment: "The user's phone number.",
  })
  phone: string;

  @Column({
    type: DataType.TEXT,
    comment: "The user's biography.",
  })
  title: string;

  @Column({
    type: DataType.TEXT,
    comment: "The user's biography.",
  })
  major: string;

  @Column({
    type: DataType.TEXT,
    comment: "The user's biography.",
  })
  description: string;

  @Column({
    type: DataType.FLOAT,
    comment: "The user's biography.",
  })
  rating: number;

  // rename createdAt to created_at
  @Column({
    field: 'created_at',
    type: DataType.DATE,
    comment: 'The date and time when the record was created.',
  })
  createdAt: Date;

  // rename updatedAt to updated_at
  @Column({
    field: 'updated_at',
    type: DataType.DATE,
    comment: 'The date and time when the record was last updated.',
  })
  updatedAt: Date;

  @BelongsToMany(() => Role, () => UserRole)
  role: Role;

  @BelongsToMany(() => Course, () => CourseInstructor)
  courses: Course[];
}
