import { ComponentType } from 'react';

type TComponent = { default: ComponentType };

interface IContainer {
  init(sharedScope: unknown): Promise<void>;
  get(module: string): Promise<() => Promise<TComponent>>;
}

/**
 * Функция динамической загрузки микросервисов, предоставленных через ModuleFederationPlugin
 * @param scope - Параметр name, который указан в удаленном конфиге ModuleFederationPlugin
 * @param module - Имя компонента, например Catalog
 */
export const loadComponent = (scope: string, module: string): (() => Promise<TComponent>) => {
  return async (): Promise<TComponent> => {
    // инициализация скопа доступными через ModuleFederationPlugin удаленными компонентами
    await __webpack_init_sharing__('default');

    const container = window[scope] as IContainer | undefined;

    if (!container) {
      throw new Error(`Компонент ${scope} не доступен через ModuleFederationPlugin!`);
    }

    // инициализация контейнера доступными модулями
    await container.init(__webpack_share_scopes__.default);

    const factory = await container.get(module);

    // получение кода компонента
    return factory();
  };
};
