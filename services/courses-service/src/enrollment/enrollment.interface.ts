import { EnrollmentInputDto } from './enrollment.dto';
import { Enrollment } from './models/enrollment.model';

export interface IEnerollmentService {
  enroll(course: EnrollmentInputDto): Promise<Enrollment>;
}
