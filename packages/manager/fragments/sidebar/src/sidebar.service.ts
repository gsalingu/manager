import { groupBy } from 'lodash-es';
import { getConfig } from '@ovh-ux/manager-sidebar-config';
import { SidebarElement } from './model/SidebarElement';
import { Sidebar } from './model/Sidebar';
import { ConfigItem } from './model/ConfigItem';
import { Service } from './model/Service';

const getPaths = (config: ConfigItem[]): string[] => config.flatMap((item) => [
    ...(item.apiPath ? [item.apiPath] : []),
    ...(item.subitems ? getPaths(item.subitems) : []),
  ]);

export const getServices = async (
  paths: string[],
): Promise<Record<string, Array<Service>>> => {
  let services = null;
  try {
    services = await (
      await fetch(`/engine/apiv6/services?routes=${paths.join(',')}`, {
        headers: new Headers({
          'Content-Type': 'application/json;charset=utf-8',
          Accept: 'application/json',
          'X-Pagination-Mode': 'CachedObjectList-Pages',
          'X-Pagination-Size': '50000',
        }),
        credentials: 'same-origin',
      })
    ).json();
  } catch (error) {
    services = [];
  }

  return groupBy(services, (service: Service) =>
    service.route?.path.replace(/\/{.*/, ''),
  );
};

export const getItems = async (universe: string) => {
  const config: ConfigItem[] = await getConfig(universe);
  const paths: string[] = getPaths(config);
  const services: Record<string, Array<Service>> = await getServices(paths);

  // TODO: fetch routes
  const filterItems = (configuration: ConfigItem[]): SidebarElement[] => configuration.reduce((items: SidebarElement[], item: ConfigItem) => {
      const subitems = item.subitems ? filterItems(item.subitems) : [];
      const ownsServiceType = item.apiPath && services[item.apiPath];
      return [
        ...items,
        ...(subitems.length > 0 || ownsServiceType
          ? [{ ...item, subitems }]
          : []),
      ];
    }, []);

  return new Sidebar(filterItems(config));
};

export default {
  getServices,
  getItems,
};
