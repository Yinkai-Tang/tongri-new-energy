/**
 * 公共资源路径拼接：自动携带部署 base。
 * 本地开发为 '/'；部署到 GitHub Pages 等子路径时为 '/tongri-new-energy/'。
 * 所有 public/ 下的图片引用（/images、/brand）都必须经过本函数，
 * 否则在子路径部署下会 404。
 */
export const asset = (path: string) =>
  `${import.meta.env.BASE_URL}${path.replace(/^\//, '')}`
