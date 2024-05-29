import { lazy, ReactNode, Suspense, JSX } from 'react';

import { loadComponent } from './utils/loadComponent';
import { IMicroService } from '../../types/microServices/IMicroService';
import { useDynamicScript } from '../../hooks/useDynamicScript';
import { ErrorBoundary } from '../../errors/ErrorBoundary/ErrorBoundary';

interface IBaseProps {
  error?: ReactNode;
  loader?: ReactNode;
  microService: IMicroService;
}

/**
 * Обертка динамической загрузки компонента, предоставляемого другим микросервисом
 * @param error - Компонент, отображаемый в случае ошибки загрузки сервиса
 * @param loader - Компонент, отображаемый в момент загрузки сервиса
 * @param microservice - Данные микросевиса
 * @param props - Пропсы загружаемого компонента
 * @constructor
 */
export const LazyComponent = <Props extends Record<string, unknown>>({
  microService,
  loader = <span>Загрузка скрипта: {microService.url}</span>,
  error = <span>Ошибка загрузки скрипта: {microService.url}</span>,
  ...props
}: IBaseProps & Props): JSX.Element => {
  const { ready, failed } = useDynamicScript(microService.url);

  if (failed) {
    return <>{error}</>;
  }

  if (!ready) {
    return <>{loader}</>;
  }

  const Component = lazy(loadComponent(microService.scope, microService.module));

  return (
    <ErrorBoundary>
      <Suspense fallback={loader}>
        <Component {...props} />
      </Suspense>
    </ErrorBoundary>
  );
};
