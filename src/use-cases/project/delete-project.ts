import { UseCase } from "use-cases.types";
import { DecodedUser } from 'http-controller.types';
import { Project } from '../../domains';
import SystemError from '../../system-errors/system-error';
import { ProjectDeleteErrors, ServiceErrorCodes } from '../../system-errors/error-codes';

import ProjectDataBase from '../../db/project-db';

export default function CreateDeleteBusiness() {

  return class DeleteBusiness implements UseCase {
    async execute(id: string, user: DecodedUser): Promise<void | Error> {

      const projectInId = await ProjectDataBase.findProjectById(id);

      if (!projectInId) {
        return new SystemError(`There is no project with id ${id}`, ProjectDeleteErrors.NOTFOUND);
      }

      const projectInDb = Project.create(projectInId[0]);

      if (projectInDb instanceof SystemError) {
        return projectInDb;
      }

      if (projectInDb.getCreatedBy() !== user.id) {
        return new SystemError('User can update only his own business', ProjectDeleteErrors.FORBIDDEN);
      }

      const removed = await ProjectDataBase.deleteProject(projectInDb.getId());

      if (!removed) {
        return new SystemError('Something went wrong during removing', ServiceErrorCodes.INTERNAL);
      }
    }
  };
}