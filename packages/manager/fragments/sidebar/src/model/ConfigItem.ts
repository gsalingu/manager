export class ConfigItem {
  label: string;

  apiPath?: string;

  subitems?: ConfigItem[];

  constructor({
    label,
    apiPath,
    subitems,
  }: {
    label: string;
    apiPath?: string;
    subitems?: ConfigItem[];
  }) {
    this.label = label;
    this.apiPath = apiPath;
    this.subitems = subitems;
  }
}

export default {
  ConfigItem,
};
