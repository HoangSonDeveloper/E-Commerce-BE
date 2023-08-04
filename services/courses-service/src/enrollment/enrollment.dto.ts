export class EnrollmentDto {
  readonly id: string;
  readonly classId: string;
  readonly studentId: string;
  readonly enrollmentDate: Date;
  readonly cancelled: boolean;
  readonly cancelReason: string;
}

export class EnrollmentInputDto {
  readonly classId: string;
  readonly studentId: string[];
}
