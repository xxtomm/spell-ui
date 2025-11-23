import createMDX from "@next/mdx";
import codeImport from "remark-code-import";
import rehypeShiki from "@shikijs/rehype";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";

const nextConfig = {
  pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx"],
  rewrites: async () => {
    return [
      {
        source: "/docs/:slug.md",
        destination: "/docs/:slug/md",
      },
    ];
  },
};

const withMDX = createMDX({
  options: {
    remarkPlugins: [[codeImport, { cache: false }], remarkGfm],
    rehypePlugins: [
      rehypeSlug,
      [rehypeAutolinkHeadings, {
        behavior: "wrap",
        properties: {
          className: ["subheading-anchor"],
          ariaLabel: "Link to section",
        },
      }],
      [rehypeShiki, {
        themes: {
          light: "github-light",
          dark: "github-dark",
        },
        defaultColor: false,
      }],
    ],
  },
});

export default withMDX(nextConfig);
