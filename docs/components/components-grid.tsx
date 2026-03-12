import { getDocSchema } from "@/lib/doc";
import Link from "next/link";

export async function ComponentsGrid() {
  const schema = await getDocSchema();
  const components = schema
    .filter((section) => section.title !== "Getting Started")
    .flatMap((section) => section.items);

  return (
    <div className="not-prose grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 md:gap-x-8 lg:gap-x-8 lg:gap-y-6">
      {components.map((component) => (
        <Link
          key={component.id}
          href={`/docs/${component.id}`}
          className="group block p-4 rounded-lg border border-border hover:border-foreground/20 transition-colors"
        >
          <h2 className="font-medium group-hover:text-foreground transition-colors">
            {component.title}
          </h2>
          <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
            {component.description}
          </p>
        </Link>
      ))}
    </div>
  );
}
