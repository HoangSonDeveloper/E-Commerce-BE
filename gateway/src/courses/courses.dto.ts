export class CourseDto {
  readonly id: string;
  readonly name: string;
  readonly shortDescription?: string;
  readonly description?: string;
  readonly outcome?: string;
  readonly level?: string;
  readonly price?: number;
  readonly thumbnail?: string;
  readonly isPublished?: boolean;
  readonly formatType?: string;
  readonly createdAt?: string;
  readonly updatedAt?: string;
}

export class CourseCategoriesDto {
  readonly courseId: string;
  readonly courseCategories: string[];
}