import { Project, ProjectStatus } from '../models/project.js';
// Project State Management

// custom type with generic type
type Listener<T> = (items: T[]) => void;

// State base class
class State<T> {
  // Protected means it still can't be accessed from outside the class, but it can be accessed from any class that inherits.
  protected listeners: Listener<T>[] = [];

  // add a new function inside listeners[] array every time it get called
  addListener(listenerFn: Listener<T>) {
    this.listeners.push(listenerFn);
  }
}

export class ProjectState extends State<Project> {
  private projects: Project[] = [];
  private static instance: ProjectState;

  // private constructor to guarantee it is singletion class
  private constructor() {
    super();
  }

  // only allow only one instance based on this class
  static getInstance() {
    if (this.instance) {
      return this.instance;
    }

    this.instance = new ProjectState();
    return this.instance;
  }

  addProject(title: string, description: string, numOfPeople: number) {
    // instantiate a new Project object
    const newProject = new Project(
      Math.random().toString(),
      title,
      description,
      numOfPeople,
      ProjectStatus.Active // adding a new project makes it an active class
    );

    this.projects.push(newProject);

    this.updateListeners();
  }

  moveProject(projectId: string, newStatus: ProjectStatus) {
    const project = this.projects.find((prj) => prj.id === projectId);

    if (project && project.status !== newStatus) {
      project.status = newStatus;
      this.updateListeners();
    }
  }

  private updateListeners() {
    // iterating through every functions inside listenerFn() and executing them by passing brand new array[] of projects.
    for (const listenerFn of this.listeners) {
      // slice is for copying to projects state array
      listenerFn(this.projects.slice());
    }
  }
}

// call the static method
// we're guaranteed to always work with the exact same object and will always only have one object of the type in the entire application
export const projectState = ProjectState.getInstance();
