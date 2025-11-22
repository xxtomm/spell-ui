import { Registry } from "./types";

export const getRegistry = async (): Promise<Registry> => {
  const registryData = await import("@/registry.json");
  const registry = registryData.default as Registry;
  return registry;
};

export const getRegistryItem = async (name: string) => {
  const registry = await getRegistry();
  return registry.items.find((item) => item.name === name);
};
