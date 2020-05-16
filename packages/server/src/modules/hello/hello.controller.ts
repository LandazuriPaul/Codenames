import { Controller, Get } from '@nestjs/common';

import { getLastCommit } from '~/../../lib/src/getLastCommit';

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
