import { IdService } from 'services.types';
import { ProjectData } from 'entities.types';
import { RegisterProjectDTO } from 'DTO.types';
import SystemError from '../system-errors/system-error';
import { ProjectErrors } from '../system-errors/error-codes';

export interface IProject extends ProjectData {
  getId: () => string;
  getUserId: () => string;
  getOwner: () => string;
  getName: () => string;
  getUrl: () => string;
  getStars: () => number;
  getForks: () => number;
  getIssues: () => number;
  getCreateDate: () => any;
  setStars: (amount: number) => void;
  setForks: (amount: number) => void;
  setIssues: (amount: number) => void;
}

export default function CreateProject(Id: IdService) {
  return class Project {
    
    readonly id: string;
    readonly user_id: string;
    readonly owner: string;
    readonly name: string;
    readonly url: string;
    stars: number;
    forks: number;
    issues: number;
    readonly create_date: any;

    constructor({
      id,
      user_id,
      owner,
      name,
      url,
      stars,
      forks,
      issues,
      create_date
    }: ProjectData | RegisterProjectDTO) {

      if (!id) {
        this.id = Id.makeId();
      } else {
        this.id = id;
      }

      this.name = name;
      this.user_id = user_id;
      this.owner = owner;
      this.url = url;
      this.stars = stars;
      this.forks = forks;
      this.issues = issues;
      this.create_date = create_date;
    }

    public static create(projectData: ProjectData | RegisterProjectDTO) {
      const { id } = projectData;

      if (id && !Id.isValidId(id)) {
        return new SystemError('Invalid id', ProjectErrors.INVALID_ID);
      }

      return new Project(projectData);
    }

    getId() {
      return this.id;
    }

    getUserId() {
      return this.user_id;
    }

    getOwner() {
      return this.owner;
    }

    getName() {
      return this.name;
    }

    getUrl() {
      return this.url;
    }

    getStars() {
      return this.stars;
    }

    getForks() {
      return this.forks;
    }

    getIssues() {
      return this.issues;
    }

    getCreateDate() {
      return this.create_date
    }

    setStars(amount: number): void {
      this.stars = amount;
    }

    setForks(amount: number): void {
      this.forks = amount;
    }

    setIssues(amount: number): void {
      this.issues = amount;
    }

    toObject() {
      return {
        id: this.getId(),
        user_id: this.getUserId(),
        owner: this.getOwner(),
        name: this.getName(),
        url: this.getUrl(),
        stars: this.getStars(),
        forks: this.getForks(),
        issues: this.getIssues(),
        create_date: this.getCreateDate()
      };
    }
  };
}
