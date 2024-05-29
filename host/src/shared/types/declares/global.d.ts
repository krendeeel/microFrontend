declare global {
  /**
   * Инициализация доступности компонентов через ModuleFederationPlugin, scope - name компонента
   * в настройках ModuleFederationPlugin
   */
  const __webpack_init_sharing__: (scope: string) => Promise<void>;
  /**
   * Загрузка скриптов компонента, доступного через ModuleFederationPlugin
   * @param scope - указание типа экспорта расшаренного компонента (default,
   * если компонент экспортируется по умолчанию или указание конкретного имени компонента)
   */
  const __webpack_share_scopes__: {
    default: unknown;
  };

  interface Window {
    [key: string]: unknown;
  }
}

export {};
