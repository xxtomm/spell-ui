import { remark } from "remark";
import { toc } from "mdast-util-toc";
import type { Node } from "unist";

export interface TocItem {
  title: string;
  url: string;
  depth: number;
}

interface ListNode extends Node {
  type: "list";
  children: ListItemNode[];
}

interface ListItemNode extends Node {
  type: "listItem";
  children: Node[];
}

interface LinkNode extends Node {
  type: "link";
  url?: string;
  children: Node[];
}

interface TextNode extends Node {
  type: "text";
  value?: string;
}

interface ParagraphNode extends Node {
  type: "paragraph";
  children: Node[];
}

export async function getTableOfContents(
  content: string,
): Promise<TocItem[]> {
  const processor = remark().use(() => (tree) => {
    return tree;
  });

  const tree = processor.parse(content);
  const tocResult = toc(tree, {
    maxDepth: 3,
    tight: true,
  });

  if (!tocResult.map) {
    return [];
  }

  const items = extractItems(tocResult.map as ListNode, 2);
  return items;
}

function extractItems(node: ListNode, depth: number): TocItem[] {
  if (!node) return [];

  const items: TocItem[] = [];

  if (node.type === "list" && node.children) {
    for (const listItem of node.children) {
      if (listItem.type === "listItem") {
        const item = extractItemFromListItem(listItem, depth);
        if (item) {
          items.push(item);

          // Extract nested items
          for (const child of listItem.children) {
            if (child.type === "list") {
              const nestedItems = extractItems(child as ListNode, depth + 1);
              items.push(...nestedItems);
            }
          }
        }
      }
    }
  }

  return items;
}

function extractItemFromListItem(listItem: ListItemNode, depth: number): TocItem | null {
  if (!listItem.children || listItem.children.length === 0) return null;

  let title = "";
  let url = "";

  for (const child of listItem.children) {
    if (child.type === "paragraph") {
      const link = findLink(child as ParagraphNode);
      if (link) {
        title = extractText(link);
        url = link.url || "";
      }
    }
  }

  if (!title || !url) return null;

  return {
    title,
    url,
    depth,
  };
}

function findLink(node: Node): LinkNode | null {
  if (node.type === "link") {
    return node as LinkNode;
  }

  if ("children" in node && Array.isArray(node.children)) {
    for (const child of node.children) {
      const link = findLink(child);
      if (link) return link;
    }
  }

  return null;
}

function extractText(node: Node): string {
  if (node.type === "text") {
    return (node as TextNode).value || "";
  }

  if ("children" in node && Array.isArray(node.children)) {
    return node.children.map((child: Node) => extractText(child)).join("");
  }

  return "";
}
