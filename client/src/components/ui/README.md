# shadcn/ui Components Library

Full shadcn/ui component library customized for Cosmic Watch dark theme.

## 🎨 Available Components

### Form Components
- **Button** - Primary, destructive, outline, secondary, ghost, link variants
- **Input** - Text input with focus states
- **Textarea** - Multi-line text input
- **Label** - Form labels
- **Select** - Dropdown select with search
- **Slider** - Range slider with smooth animations
- **Switch** - Toggle switch (iOS-style)
- **Checkbox** - Checkboxes with custom styling

### Layout Components
- **Card** - Container with header, content, footer
- **Separator** - Horizontal/vertical dividers
- **Tabs** - Tabbed interfaces
- **Dialog** - Modal dialogs
- **Dropdown Menu** - Context menus

### Feedback Components
- **Badge** - Status badges (default, destructive, warning, success)
- **Tooltip** - Hover tooltips

## 📦 Usage

### Import from centralized export:
```jsx
import { Button, Input, Label, Card } from './components/ui'
```

### Or import individually:
```jsx
import { Button } from './components/ui/button'
import { Input } from './components/ui/input'
```

## 🎯 Examples

### Button
```jsx
<Button>Default</Button>
<Button variant="destructive">Delete</Button>
<Button variant="outline">Cancel</Button>
<Button variant="ghost">Ghost</Button>
<Button size="sm">Small</Button>
<Button size="lg">Large</Button>
```

### Card
```jsx
<Card>
  <CardHeader>
    <CardTitle>Title</CardTitle>
    <CardDescription>Description</CardDescription>
  </CardHeader>
  <CardContent>
    Content here
  </CardContent>
  <CardFooter>
    Footer actions
  </CardFooter>
</Card>
```

### Select
```jsx
<Select value={value} onValueChange={setValue}>
  <SelectTrigger>
    <SelectValue placeholder="Choose..." />
  </SelectTrigger>
  <SelectContent>
    <SelectItem value="option1">Option 1</SelectItem>
    <SelectItem value="option2">Option 2</SelectItem>
  </SelectContent>
</Select>
```

### Switch
```jsx
<div className="flex items-center space-x-2">
  <Switch id="toggle" checked={enabled} onCheckedChange={setEnabled} />
  <Label htmlFor="toggle">Enable feature</Label>
</div>
```

### Slider
```jsx
<Slider
  value={[value]}
  onValueChange={(vals) => setValue(vals[0])}
  min={0}
  max={100}
  step={1}
/>
```

### Dialog
```jsx
<Dialog>
  <DialogTrigger asChild>
    <Button>Open Dialog</Button>
  </DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Title</DialogTitle>
      <DialogDescription>Description</DialogDescription>
    </DialogHeader>
    {/* Content */}
    <DialogFooter>
      <Button>Save</Button>
    </DialogFooter>
  </DialogContent>
</Dialog>
```

### Tabs
```jsx
<Tabs defaultValue="tab1">
  <TabsList>
    <TabsTrigger value="tab1">Tab 1</TabsTrigger>
    <TabsTrigger value="tab2">Tab 2</TabsTrigger>
  </TabsList>
  <TabsContent value="tab1">Content 1</TabsContent>
  <TabsContent value="tab2">Content 2</TabsContent>
</Tabs>
```

### Badge
```jsx
<Badge>Default</Badge>
<Badge variant="destructive">Critical</Badge>
<Badge variant="warning">Warning</Badge>
<Badge variant="success">Safe</Badge>
```

### Tooltip
```jsx
<TooltipProvider>
  <Tooltip>
    <TooltipTrigger>Hover me</TooltipTrigger>
    <TooltipContent>
      <p>Tooltip content</p>
    </TooltipContent>
  </Tooltip>
</TooltipProvider>
```

## 🎨 Theme Colors

All components use the Cosmic Watch color palette:
- **Primary**: `accent-purple` (#8b5cf6)
- **Background**: `space-950`, `space-900`
- **Borders**: `white/10`, `white/20`
- **Text**: `white`, `gray-400`, `gray-500`

## ✨ Features

- ✅ Full TypeScript support (via JSDoc)
- ✅ Accessible (ARIA labels, keyboard navigation)
- ✅ Responsive design
- ✅ Dark theme optimized
- ✅ Smooth animations
- ✅ Custom focus states
- ✅ Consistent spacing
- ✅ Glass morphism effects
