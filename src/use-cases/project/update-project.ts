import { UseCase } from "use-cases.types";
import { DecodedUser } from 'http-controller.types';

import { Project } from '../../domains';

import SystemError from '../../system-errors/system-error';
import { ProjectErrors } from '../../system-errors/error-codes';

import GithubRepoService from "../../services/github-service";

import ProjectDataBase from '../../db/project-db';


export default function CreateUpdateBusiness() {

  return class UpdateBusiness implements UseCase {
    async execute(id: string, user: DecodedUser): Promise<void | Error> {
      const githubRepoService = new GithubRepoService;
      const projectInId = await ProjectDataBase.findProjectById(id);

      if (!projectInId) {
        return new SystemError(`There is no project with id ${id}`, ProjectErrors.NOT_FOUD);
      }

      const projectInDb = Project.create(projectInId[0]);

      if (projectInDb instanceof SystemError) {
        return projectInDb;
      }

      if (projectInDb.getCreatedBy() !== user.id) {
        return new SystemError('User can update only his own project', ProjectErrors.FORBIDDEN);
      }
      
      const repoPath = projectInDb.url.toLowerCase().split('/repos/')[1];
      const repoData = await githubRepoService.fetchRepoInformation(repoPath);

      if (repoData instanceof SystemError) {
        return repoData;
      }

      await ProjectDataBase.updateProjectData(
        id,
        repoData.stargazers_count,
        repoData.forks,
        repoData.open_issues,
      );
    }
  };
}

