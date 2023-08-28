import {
  IsUUID,
  IsNotEmpty,
  IsEnum,
  IsDecimal,
  IsBoolean,
  IsDateString,
  IsArray,
} from 'class-validator';

enum Format {
  OneOnOne = 'one-on-one',
  Group = 'group',
  SelfPaced = 'self-paced',
}

enum Level {
  Beginner = 'beginner',
  Intermediate = 'intermediate',
  Advanced = 'advanced',
}

export class CreateCourseDto {
  @IsNotEmpty()
  name: string;

  shortDescription: string;

  description: string;

  @IsNotEmpty()
  outcome: string;

  thumbnail: string;

  @IsNotEmpty()
  price: number;

  @IsNotEmpty()
  @IsEnum(Format)
  format: Format;

  @IsNotEmpty()
  @IsEnum(Level)
  level: Level;

  @IsNotEmpty()
  @IsBoolean()
  isPublished: boolean;

  @IsNotEmpty()
  @IsArray()
  categories: number[];

  @IsNotEmpty()
  @IsArray()
  instructors: string[];
}

export class EnrollmentDto {
  @IsNotEmpty()
  userId: string;

  @IsNotEmpty()
  classId: string;
}
