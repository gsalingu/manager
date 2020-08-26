export class SidebarElement {
  label: string;

  subitems?: SidebarElement[];

  constructor({
    label,
    subitems,
  }: {
    label: string;
    subitems?: SidebarElement[];
  }) {
    this.label = label;
    this.subitems = subitems;
  }
}

export default SidebarElement;
