import Component from './base-components';
import * as Validation from '../util/validation';
import { autobind as Autobind } from '../decorators/autobind';
import { projectState } from '../state/project-state';

// Project Input Class
export class ProjectInput extends Component<HTMLDivElement, HTMLFormElement> {
  titleInputElement: HTMLInputElement;
  descriptionInputElement: HTMLInputElement;
  peopleInputElement: HTMLInputElement;

  constructor() {
    super('project-input', 'app', true, 'user-input');

    this.titleInputElement = this.element.querySelector(
      '#title'
    ) as HTMLInputElement;

    this.descriptionInputElement = this.element.querySelector(
      '#description'
    ) as HTMLInputElement;

    this.peopleInputElement = this.element.querySelector(
      '#people'
    ) as HTMLInputElement;

    this.configure();
  }

  // method to add event listener to form element
  configure() {
    this.element.addEventListener('submit', this.submitHandler);
  }

  renderContent() {}

  // private method to obtain input value with empty string error handling
  // return value is a tuple or void
  private gatherUserInput(): [string, string, number] | void {
    const enteredTitle = this.titleInputElement.value;
    const enteredDescription = this.descriptionInputElement.value;
    const enteredPeople = this.peopleInputElement.value;

    const titleValidatable: Validation.Validatable = {
      value: enteredTitle,
      required: true,
    };

    const descriptionValidatable: Validation.Validatable = {
      value: enteredDescription,
      required: true,
      minLength: 5,
    };

    const peopleValidatable: Validation.Validatable = {
      value: +enteredPeople, // convert into num with + symbol
      required: true,
      min: 1,
      max: 5,
    };

    if (
      !Validation.validate(titleValidatable) ||
      !Validation.validate(descriptionValidatable) ||
      !Validation.validate(peopleValidatable)
    ) {
      alert('Invalid input, please try again');
      return; // does not return any value --- undefinded
    } else {
      return [enteredTitle, enteredDescription, +enteredPeople];
    }
  }

  // private method to reset input value to empty
  private clearInputs() {
    this.titleInputElement.value = '';
    this.descriptionInputElement.value = '';
    this.peopleInputElement.value = '';
  }

  // private method to handle form submission
  // with autobind decorator
  @Autobind
  private submitHandler(event: Event) {
    event.preventDefault();
    const userInput = this.gatherUserInput();

    // if userInput is valid...
    // tuple is actually an array, so use isArray method to check
    if (Array.isArray(userInput)) {
      const [title, desc, people] = userInput;
      //console.log(title, desc, people);

      // call when the form is submit
      projectState.addProject(title, desc, people);

      // clear form once it is submitted
      this.clearInputs();
    }
  }
}
