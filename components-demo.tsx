import { Button } from '../packages/ui/src/components/shadcn/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '../packages/ui/src/components/shadcn/card';
import { Input } from '../packages/ui/src/components/shadcn/input';
import { Sidebar, SidebarHeader, SidebarContent, SidebarFooter, SidebarGroup, SidebarGroupLabel, SidebarGroupContent } from '../packages/ui/src/components/shadcn/sidebar';
import { ChartContainer } from '../packages/ui/src/components/shadcn/chart';
import { Drawer, DrawerTrigger, DrawerContent, DrawerHeader, DrawerTitle, DrawerDescription, DrawerFooter } from '../packages/ui/src/components/shadcn/drawer';

/**
 * Demo of stripped-down shadcn components
 * These components have been simplified to their basic structure and minimal styling,
 * making them easy to theme from scratch.
 */

export function ComponentsDemo() {
  return (
    <div className="p-8 space-y-8">
      <h1 className="text-3xl font-bold">Simplified shadcn Components</h1>
      
      {/* Button Examples */}
      <section>
        <h2 className="text-xl font-semibold mb-4">Button</h2>
        <div className="space-x-2">
          <Button variant="default">Default</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="link">Link</Button>
          <Button variant="destructive">Destructive</Button>
        </div>
        <div className="space-x-2 mt-2">
          <Button size="sm">Small</Button>
          <Button size="default">Default</Button>
          <Button size="lg">Large</Button>
          <Button size="icon">i</Button>
        </div>
      </section>

      {/* Input Examples */}
      <section>
        <h2 className="text-xl font-semibold mb-4">Input</h2>
        <div className="space-y-2 max-w-sm">
          <Input placeholder="Simple input..." />
          <Input type="email" placeholder="Email..." />
          <Input type="password" placeholder="Password..." />
          <Input disabled placeholder="Disabled input..." />
        </div>
      </section>

      {/* Card Examples */}
      <section>
        <h2 className="text-xl font-semibold mb-4">Card</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl">
          <Card>
            <CardHeader>
              <CardTitle>Simple Card</CardTitle>
              <CardDescription>Basic card with minimal styling</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Content goes here. The card structure is now simplified.</p>
            </CardContent>
            <CardFooter>
              <Button>Action</Button>
            </CardFooter>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Another Card</CardTitle>
              <CardDescription>Easy to theme from scratch</CardDescription>
            </CardHeader>
            <CardContent>
              <p>All complex grid layouts and custom styling have been removed.</p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Sidebar Example */}
      <section>
        <h2 className="text-xl font-semibold mb-4">Sidebar</h2>
        <div className="border rounded-lg h-64 flex">
          <Sidebar>
            <SidebarHeader>
              <h3 className="font-semibold">Navigation</h3>
            </SidebarHeader>
            <SidebarContent>
              <SidebarGroup>
                <SidebarGroupLabel>Main</SidebarGroupLabel>
                <SidebarGroupContent>
                  <div className="space-y-1">
                    <a href="#" className="block px-2 py-1 hover:bg-accent rounded">Dashboard</a>
                    <a href="#" className="block px-2 py-1 hover:bg-accent rounded">Projects</a>
                    <a href="#" className="block px-2 py-1 hover:bg-accent rounded">Tasks</a>
                  </div>
                </SidebarGroupContent>
              </SidebarGroup>
            </SidebarContent>
            <SidebarFooter>
              <Button variant="outline" size="sm">Settings</Button>
            </SidebarFooter>
          </Sidebar>
          <div className="flex-1 p-4">
            <p>Main content area. The sidebar is now a simple static layout without complex state management, mobile toggles, or keyboard shortcuts.</p>
          </div>
        </div>
      </section>

      {/* Chart Example */}
      <section>
        <h2 className="text-xl font-semibold mb-4">Chart Container</h2>
        <ChartContainer>
          <div className="w-full h-full flex items-center justify-center border-2 border-dashed border-muted-foreground/25 rounded">
            <p className="text-muted-foreground">Chart content goes here</p>
            <p className="text-xs text-muted-foreground ml-2">(No recharts integration, just a container)</p>
          </div>
        </ChartContainer>
      </section>

      {/* Drawer Example */}
      <section>
        <h2 className="text-xl font-semibold mb-4">Drawer</h2>
        <div className="space-y-4">
          <p className="text-sm text-muted-foreground">
            Drawer components are now simple styled divs without vaul integration
          </p>
          <Drawer>
            <DrawerTrigger>
              <Button>Open Drawer</Button>
            </DrawerTrigger>
            {/* Note: In a real app, you'd need to handle the open/close state */}
            <div className="hidden">
              <DrawerContent>
                <DrawerHeader>
                  <DrawerTitle>Drawer Title</DrawerTitle>
                  <DrawerDescription>This is a simplified drawer component</DrawerDescription>
                </DrawerHeader>
                <div className="p-4">
                  <p>Drawer content here</p>
                </div>
                <DrawerFooter>
                  <Button>Save</Button>
                  <Button variant="outline">Cancel</Button>
                </DrawerFooter>
              </DrawerContent>
            </div>
          </Drawer>
        </div>
      </section>

      <section className="border-t pt-8">
        <h2 className="text-xl font-semibold mb-4">What Changed</h2>
        <div className="prose max-w-none">
          <ul className="space-y-2">
            <li><strong>Sidebar:</strong> Removed complex state management, mobile responsiveness, keyboard shortcuts, and cookie persistence. Now just layout containers.</li>
            <li><strong>Chart:</strong> Removed recharts integration and dynamic theming. Now just a simple container.</li>
            <li><strong>Drawer:</strong> Removed vaul integration and complex positioning. Now just styled divs.</li>
            <li><strong>Button:</strong> Simplified variants and removed excessive styling (shadows, complex focus states, icon handling).</li>
            <li><strong>Card:</strong> Removed complex grid layouts and container queries. Now simple flexbox layout.</li>
            <li><strong>Input:</strong> Simplified focus states and removed complex dark mode styling.</li>
            <li><strong>Theme:</strong> Removed sidebar, chart, and prose tokens. Reduced color palette to essentials.</li>
            <li><strong>Rich Text:</strong> Removed TipTap editor and React Markdown components entirely.</li>
          </ul>
          <p className="mt-4 text-sm text-muted-foreground">
            All components now have minimal baseline styling and can be easily themed from scratch using CSS custom properties or Tailwind classes.
          </p>
        </div>
      </section>
    </div>
  );
}

export default ComponentsDemo;