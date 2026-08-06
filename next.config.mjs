/**
 * The site is exported as static files and served from
 * https://<owner>.github.io/<repo>/, so every asset needs the `/<repo>` prefix.
 *
 * GitHub Actions sets GITHUB_REPOSITORY to "<owner>/<repo>", so the prefix is
 * inferred at build time and nothing has to be renamed by hand. Set
 * NEXT_PUBLIC_BASE_PATH to override it (e.g. to preview the prefixed build
 * locally, or when serving from a custom domain, where it should be empty).
 *
 * @type {import('next').NextConfig}
 */
const [owner = "", repo = ""] = (process.env.GITHUB_REPOSITORY ?? "").split("/");

// A <owner>.github.io repository is served from the domain root, not a subpath.
const isUserSite = repo.toLowerCase() === `${owner.toLowerCase()}.github.io`;
const inferredBasePath = repo && !isUserSite ? `/${repo}` : "";
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? inferredBasePath;

const nextConfig = {
  output: "export",
  basePath,
  assetPrefix: basePath ? `${basePath}/` : undefined,
  images: { unoptimized: true },
  trailingSlash: true
};

export default nextConfig;
