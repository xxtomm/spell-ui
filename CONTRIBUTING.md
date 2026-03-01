# Contributing to Spell UI

Thank you for your interest in contributing to Spell UI! We appreciate your support and look forward to your contributions. This guide will help you understand the directory structure and provide detailed instructions on how to add a new component to Spell UI.

**You only need to change 4 files to add a new component.**

Once done, open a pull request from your forked repo to the main repo [here](https://github.com/xxtomm/spell-ui/compare).

## Getting Started

### Fork and Clone the Repository

1. **Fork this repository**
   Click [here](https://github.com/xxtomm/spell-ui/fork) to fork the repository.

2. **Clone your forked repository to your local machine**

   ```bash
   git clone https://github.com/<YOUR_USERNAME>/spell-ui.git
   ```

3. **Navigate to the project directory**

   ```bash
   cd spell-ui
   ```

4. **Create a new branch for your changes**

   ```bash
   git checkout -b my-new-component
   ```

5. **Install dependencies**

   ```bash
   pnpm i
   ```

6. **Run the project**

   ```bash
   pnpm dev
   ```

Open http://localhost:3000 to view the docs.

## Adding a New Component

To add a new component to Spell UI, you need to modify 4 files. The sidebar and doc schema are automatically generated from the registry.

### 1. Create Component

Create the main component in `registry/spell-ui/example-component.tsx`

```typescript
import React from "react";
import { cn } from "@/lib/utils";

export default function ExampleComponent({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("", className)} {...props}>
      {children}
    </div>
  );
}
```

### 2. Update Registry

Add your component to `registry.json` in the `items` array:

```json
{
  "name": "example-component",
  "type": "registry:component",
  "title": "Example Component",
  "description": "A versatile component for displaying various types of content.",
  "files": [
    {
      "path": "registry/spell-ui/example-component.tsx",
      "type": "registry:component"
    }
  ],
  "dependencies": [],
  "registryDependencies": [],
  "category": "display"
}
```

Add `dependencies` (e.g. `["motion"]`) and `registryDependencies` as needed for your component.

### 3. Create Docs Directory and Demo

Create `docs/example-component/demo.tsx`:

```typescript
import ExampleComponent from "@/registry/spell-ui/example-component";

export function Demo() {
  return (
    <div className="flex justify-center">
      <ExampleComponent>Your content here</ExampleComponent>
    </div>
  );
}
```

### 4. Create Documentation

Create `docs/example-component/doc.mdx`:

```mdx
import { Demo } from "./demo";

<DemoCanvas>
  <DemoPreview>
    <Demo />
  </DemoPreview>
  <DemoCode>
    ```tsx file=./demo.tsx
    ```
  </DemoCode>
</DemoCanvas>

## Installation

<InstallationTabs item="example-component">
```tsx file=../../registry/spell-ui/example-component.tsx
```
</InstallationTabs>

## Usage

```tsx
import ExampleComponent from "@/components/example-component";
```

```tsx
<ExampleComponent>Your content here</ExampleComponent>
```

## Props

<PropsTable
  data={[
    {
      name: "children",
      type: "React.ReactNode",
      nameDetails: "The content of the component"
    },
    {
      name: "className",
      type: "string",
      nameDetails: "Additional CSS classes"
    }
  ]}
/>
```

### 5. Build Registry

```bash
pnpm registry:build
```

This generates `public/r/example-component.json` for the CLI installation.

### Adding Multiple Examples

To add variant demos (e.g. sizes, colors), create additional demo files:

- `docs/example-component/demo-sizes.tsx`
- `docs/example-component/demo-colors.tsx`

Then add them to your doc.mdx:

```mdx
import { Demo } from "./demo";
import { Demo as DemoSizes } from "./demo-sizes";

<DemoCanvas>
  ...
</DemoCanvas>

### Size

<DemoCanvas>
  <DemoPreview>
    <DemoSizes />
  </DemoPreview>
  <DemoCode>
    ```tsx file=./demo-sizes.tsx
    ```
  </DemoCode>
</DemoCanvas>
```

## Component Guidelines

- Use TypeScript
- Follow existing patterns in `registry/spell-ui/`
- Use Tailwind CSS for styling
- Prefer `motion` (Framer Motion) for animations
- Use `cn()` from `@/lib/utils` for class merging

## Ask for Help

For any help or questions, please open a new [GitHub issue](https://github.com/xxtomm/spell-ui/issues).
