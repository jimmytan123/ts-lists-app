import { Draggable } from '../models/drag-drop';
import { autobind } from '../decorators/autobind';
import Component from './base-components';
import { Project } from '../models/project';

// Project Item Class
export class ProjectItem
  extends Component<HTMLUListElement, HTMLLIElement>
  implements Draggable
{
  private project: Project;

  // a getter method to determine singular and plural
  get persons() {
    if (this.project.people === 1) {
      return 'Person';
    } else {
      return 'Persons';
    }
  }

  constructor(hostId: string, project: Project) {
    super('single-project', hostId, false, project.id);

    // store project obj into an variable called project
    this.project = project;

    this.configure();
    this.renderContent();
  }

  @autobind
  dragStartHandler(event: DragEvent) {
    // console.log(event);
    //dataTransfer property of the event --- you can attach data to the drag event and you'll later be able to extract that data upon a drop.
    event.dataTransfer!.setData('text/plain', this.project.id);
    event.dataTransfer!.effectAllowed = 'move';
  }

  dragEndHandler(_: DragEvent) {
    // console.log('end');
  }

  configure() {
    this.element.addEventListener('dragstart', this.dragStartHandler);
    this.element.addEventListener('dragend', this.dragEndHandler);
  }

  renderContent() {
    this.element.querySelector('h2')!.textContent = this.project.title;
    this.element.querySelector(
      'h3'
    )!.textContent = `${this.project.people} ${this.persons} Assigned`;
    this.element.querySelector('p')!.textContent = this.project.description;
  }
}
