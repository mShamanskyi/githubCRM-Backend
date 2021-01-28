import { Project } from "../../domains";

import { UseCase } from "use-cases.types";
import { RegisterProjectDTO } from "DTO.types";
import { ProjectData } from 'entities.types';

import GithubRepoService from "../../services/github-service";

import SystemError from '../../system-errors/system-error';

import ProjectDataBase from '../../db/project-db';

export default function CreateRegisterBusiness() {
  return class RegisterProject implements UseCase {
    async execute(data: RegisterProjectDTO): Promise<ProjectData | SystemError> {
      const githubRepoService = new GithubRepoService;
      const repoData = await githubRepoService.fetchRepoInformation(data.repoPath);

      if (repoData instanceof SystemError) {
        return repoData;
      }

      const projectData = {
        user_id: data.createdBy,
        owner: repoData.owner.login,
        name: repoData.name,
        url: repoData.url,
        stars: repoData.stargazers_count,
        forks: repoData.forks,
        issues: repoData.open_issues,
        create_date: repoData.created_at
      }

      const project = Project.create(projectData);

      if (!(project instanceof Project)) {
        return project;
      }

      await ProjectDataBase.createProject(project);
      return project;
    }
  }
}