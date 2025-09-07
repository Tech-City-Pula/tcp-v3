import type * as React from 'react';

import { cn } from '../../lib/utils';

function Sidebar({ className, children, ...props }: React.ComponentProps<'div'>) {
  return (
    <div data-slot="sidebar" className={cn('flex h-full w-64 flex-col bg-background border-r', className)} {...props}>
      {children}
    </div>
  );
}

function SidebarHeader({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div data-slot="sidebar-header" className={cn('flex flex-col gap-2 p-4', className)} {...props} />
  );
}

function SidebarContent({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div data-slot="sidebar-content" className={cn('flex min-h-0 flex-1 flex-col gap-2 overflow-auto', className)} {...props} />
  );
}

function SidebarFooter({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div data-slot="sidebar-footer" className={cn('flex flex-col gap-2 p-4', className)} {...props} />
  );
}

function SidebarGroup({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div data-slot="sidebar-group" className={cn('relative flex w-full min-w-0 flex-col p-2', className)} {...props} />
  );
}

function SidebarGroupLabel({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div data-slot="sidebar-group-label" className={cn('text-xs font-medium text-muted-foreground px-2 pb-1', className)} {...props} />
  );
}

function SidebarGroupContent({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div data-slot="sidebar-group-content" className={cn('flex flex-col gap-1', className)} {...props} />
  );
}

export {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
};