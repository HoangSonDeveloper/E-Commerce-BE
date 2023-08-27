import { IsEmail, IsNotEmpty } from 'class-validator';

export class EnrollmentDto {
  @IsNotEmpty()
  userId: string;

  @IsNotEmpty()
  classId: string;
}
