export interface DocItem {
  id: string;
  title: string;
  description: string;
  meta?: {
    docs?: Array<{
      title: string;
      url: string;
    }>;
  };
}

export type DocSchema = Array<{
  title: string;
  items: DocItem[];
}>;

export interface RegistryItem {
  name: string;
  type: "registry:component" | "registry:hook" | "registry:lib";
  title: string;
  description: string;
  files: Array<{
    path: string;
    type: string;
  }>;
  dependencies?: string[];
  registryDependencies?: string[];
  meta?: {
    docs?: Array<{
      title: string;
      url: string;
    }>;
  };
}

export interface Registry {
  $schema?: string;
  name?: string;
  homepage?: string;
  author?: string;
  items: RegistryItem[];
}

export interface TableOfContents {
  items?: TocItem[];
}

export interface TocItem {
  title: string;
  url: string;
  items?: TocItem[];
}
