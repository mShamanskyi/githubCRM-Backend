import rp from 'request-promise-native';

import { ProjectData } from 'entities.types';

import { GithubService } from 'services.types';
import SystemError from '../system-errors/system-error';
import { ServiceErrorCodes } from '../system-errors/error-codes';

export default class GithubRepoService implements GithubService {

  async fetchRepoInformation(repoPath: string) {
    if (!repoPath) {
      return new SystemError('Github service error', ServiceErrorCodes.GITHUB_PATH_REQUIRED);
    }

    if (repoPath) {
      const repoParts = repoPath.split('/');

      if ((repoParts.length !== 2) || (!repoParts[0] || !repoParts[1])) {
        return new SystemError('Github service error', ServiceErrorCodes.GITHUB_INVALID_PATH);
      }
    }

    try {
      const options = {
        uri: `https://api.github.com/repos/${repoPath}`,
        headers: {
          'Accept': 'application/vnd.github.v3+json',
          'User-Agent': 'Request-Promise'
        },
        json: true
      };
      
      const response = await rp(options);

      return response;

    } catch (error) {
      return new SystemError('Github service error', ServiceErrorCodes.OBSCURE_ERROR);
    }
  }
}