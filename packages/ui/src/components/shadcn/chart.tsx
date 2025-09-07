import type * as React from 'react';

import { cn } from '../../lib/utils';

function ChartContainer({ className, children, ...props }: React.ComponentProps<'div'>) {
  return (
    <div data-slot="chart" className={cn('flex aspect-video justify-center text-xs', className)} {...props}>
      {children}
    </div>
  );
}

export { ChartContainer };
