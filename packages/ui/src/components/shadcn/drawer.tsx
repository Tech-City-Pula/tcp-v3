import type * as React from 'react';

import { cn } from '../../lib/utils';

function Drawer({ className, children, ...props }: React.ComponentProps<'div'>) {
  return (
    <div data-slot="drawer" className={cn('relative', className)} {...props}>
      {children}
    </div>
  );
}

function DrawerTrigger({ className, children, ...props }: React.ComponentProps<'button'>) {
  return (
    <button data-slot="drawer-trigger" className={cn('', className)} {...props}>
      {children}
    </button>
  );
}

function DrawerContent({ className, children, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="drawer-content"
      className={cn('fixed inset-x-0 bottom-0 z-50 flex h-auto flex-col bg-background border-t rounded-t-lg', className)}
      {...props}
    >
      <div className="mx-auto mt-4 h-2 w-[100px] rounded-full bg-muted" />
      {children}
    </div>
  );
}

function DrawerHeader({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div data-slot="drawer-header" className={cn('grid gap-1.5 p-4 text-center sm:text-left', className)} {...props} />
  );
}

function DrawerFooter({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div data-slot="drawer-footer" className={cn('mt-auto flex flex-col gap-2 p-4', className)} {...props} />
  );
}

function DrawerTitle({ className, ...props }: React.ComponentProps<'h2'>) {
  return (
    <h2 data-slot="drawer-title" className={cn('text-lg font-semibold leading-none tracking-tight', className)} {...props} />
  );
}

function DrawerDescription({ className, ...props }: React.ComponentProps<'p'>) {
  return (
    <p data-slot="drawer-description" className={cn('text-sm text-muted-foreground', className)} {...props} />
  );
}

export {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
};