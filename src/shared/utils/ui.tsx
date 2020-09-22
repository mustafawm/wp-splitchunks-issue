/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { lazy, Suspense, ComponentType, FunctionComponent } from 'react';
import { CompanyLocProps } from 'shared/schemas/CompanyLocation';

/**
 * Lazy loads provided <Component/>,
 * if a FallbackComponent is provided: wraps it in <React.Suspense fallback={FallbackComponent}/>
 * else: return Component (user will take care of suspense callback)
 *
 * @param importCallback () => import('../relative/path/to/Component)
 * @param FallbackComponent (optional) <p>Loading...</p>
 */
export function lazyLoad(
  importCallback: () => Promise<{ default: ComponentType<any> }>,
  FallbackComponent = <p />,
): FunctionComponent {
  const Component = lazy(importCallback);

  return (props: unknown) =>
    FallbackComponent ? (
      <Suspense fallback={FallbackComponent}>
        <Component {...props} />
      </Suspense>
    ) : (
      <Component {...props} />
    );
}

export function getAddressString(
  loc?: Partial<CompanyLocProps> & {
    latitude: number;
    longitude: number;
  },
): string {
  return loc
    ? `${loc?.address1} ${loc?.area || ''} ${loc?.subArea || ''} ${
        loc?.zipCode || ''
      }`
    : '';
}

export function stopPropagation(e: { stopPropagation(): void }): void {
  e.stopPropagation();
}
