import { basicDoc } from "@/basic-doc";
import { getRegistry } from "./registry";
import { DocItem, DocSchema, RegistryItem } from "./types";

const COMPONENTS_CATEGORIES = ["components", "other", "display"] as const;

const CATEGORY_LABELS: Record<string, string> = {
  animation: "Text Animations",
  input: "Inputs",
  button: "Buttons",
  feedback: "Feedback",
  background: "Backgrounds",
  interactive: "Interactive",
};

const CATEGORY_ORDER = [
  "animation",
  "button",
  "input",
  "feedback",
  "background",
  "interactive",
];

function toDocItem(item: RegistryItem): DocItem {
  return {
    id: item.name,
    title: item.title,
    description: item.description,
    meta: item.meta,
  };
}

function groupByCategory(items: RegistryItem[]) {
  const groups = new Map<string, DocItem[]>();
  for (const item of items) {
    const key = item.category ?? "other";
    const doc = toDocItem(item);
    groups.set(key, [...(groups.get(key) ?? []), doc]);
  }
  return groups;
}

export const getDocSchema = async () => {
  const { items } = await getRegistry();
  const components = items.filter((i) => i.type === "registry:component");
  const byCategory = groupByCategory(components);

  const componentsItems = COMPONENTS_CATEGORIES.flatMap(
    (key) => byCategory.get(key) ?? []
  );
  const orderedKeys = CATEGORY_ORDER.filter((k) => byCategory.has(k));
  const extraKeys = [...byCategory.keys()].filter(
    (k) =>
      !(COMPONENTS_CATEGORIES as readonly string[]).includes(k) &&
      !CATEGORY_ORDER.includes(k)
  );

  const componentGroups: DocSchema = [
    { title: "Components", items: componentsItems },
    ...orderedKeys
      .concat(extraKeys)
      .map((key) => ({
        title: CATEGORY_LABELS[key] ?? key,
        items: byCategory.get(key) ?? [],
      }))
      .filter((g) => g.items.length > 0),
  ];

  return [...basicDoc, ...componentGroups];
};

export const allDocItems = async () => {
  const schema = await getDocSchema();
  return schema.flatMap((section) => section.items);
};

export const getDoc = async (id: string) => {
  const allItems = await allDocItems();
  return allItems.find((item) => item.id === id);
};
