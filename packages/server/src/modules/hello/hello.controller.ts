import { Controller, Get } from '@nestjs/common';

import { getLastCommit } from '~/utils';

@Controller()
export class HelloController {
  @Get('/version')
  async getVersion(): Promise<{ commit: string }> {
    const lastCommit = await getLastCommit();
    return {
      commit: lastCommit.shortHash,
    };
  }
}
