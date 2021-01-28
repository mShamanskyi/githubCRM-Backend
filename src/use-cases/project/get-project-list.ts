import { UseCase } from "use-cases.types";
import { ProjectData } from "entities.types";

import ProjectDataBase from '../../db/project-db';

export default function CreateGetBusinessData() {
  return class GetUserData implements UseCase {
    async execute(id: string): Promise<Partial<ProjectData[]> | Error> {

      const userProjects = await ProjectDataBase.getUserProjects(id);

      return userProjects;
    }
  }
}