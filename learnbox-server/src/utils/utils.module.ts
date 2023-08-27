import { Module } from '@nestjs/common';

import { QueryUtils } from './query.utils';
import { PasswordUtils } from './password.utils';
import { HelperUtils } from './helper.utils';

@Module({
  exports: [QueryUtils, PasswordUtils, HelperUtils],
  providers: [QueryUtils, PasswordUtils, HelperUtils],
})
export class UtilsModule {}
