/**
 * Данные микросервиса
 */
export interface IMicroService {
  /**
   * Ссылка на скрипт (имя хоста + имя контейнера, например, http://localhost:3002/catalog.js)
   */
  url: string;
  /**
   * Параметр name, который указан в удаленном конфиге ModuleFederationPlugin
   */
  scope: string;
  /**
   * Имя компонента, например Catalog
   */
  module: string;
}
