// Component Base Class
// make the class as an abstract class, since it should never directly instantiate it. Instead, it should always be used for inheritance.
// use generics T U
export default abstract class Component<T extends HTMLElement, U extends HTMLElement> {
  templateElement: HTMLTemplateElement;
  hostElement: T;
  element: U;

  constructor(
    templateId: string,
    hostElementId: string,
    insertAtStart: boolean,
    newElementId?: string
  ) {
    // use type casting here to tell TS it is the html template element
    this.templateElement = document.getElementById(
      templateId
    )! as HTMLTemplateElement;

    this.hostElement = document.getElementById(hostElementId)! as T;

    // importNode method - return a copy of node
    // first argument: pointer to the template element
    // second argument: deep is true
    const importedNode = document.importNode(
      this.templateElement.content,
      true
    );

    // store the target element into variable element and set its id
    this.element = importedNode.firstElementChild as U;
    if (newElementId) {
      this.element.id = newElementId;
    }

    this.attach(insertAtStart);
  }

  // method to insert template element into target host element
  private attach(insertAtBeginning: boolean) {
    this.hostElement.insertAdjacentElement(
      insertAtBeginning ? 'afterbegin' : 'beforeend',
      this.element
    );
  }

  // Force any class inheriting from component to add these two methods and to have them available
  abstract configure(): void;
  abstract renderContent(): void;
}
