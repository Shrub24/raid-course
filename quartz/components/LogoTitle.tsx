import { pathToRoot } from "../util/path"
import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import { classNames } from "../util/lang"
import { i18n } from "../i18n"

interface Options {
  logoPath: string
  logoAlt?: string
  showTitle?: boolean
}

const defaultOptions: Options = {
  logoPath: "/static/logo.png",
  logoAlt: "Logo",
  showTitle: true,
}

export default ((userOpts?: Partial<Options>) => {
  const opts = { ...defaultOptions, ...userOpts }

  const LogoTitle: QuartzComponent = ({
    fileData,
    cfg,
    displayClass,
  }: QuartzComponentProps) => {
    const title = cfg?.pageTitle ?? i18n(cfg.locale).propertyDefaults.title
    const baseDir = pathToRoot(fileData.slug!)

    return (
      <h2 class={classNames(displayClass, "logo-title")}>
        <a href={baseDir}>
          <img src={baseDir + opts.logoPath} alt={opts.logoAlt} class="logo-image" />
          {opts.showTitle && <span class="title-text">{title}</span>}
        </a>
      </h2>
    )
  }

  LogoTitle.css = `
  .logo-title {
    font-size: 1.75rem;
    margin: 0;
    font-family: var(--titleFont);
  }

  .logo-title a {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    text-decoration: none;
  }

  .logo-title .logo-image {
    height: 2rem;
    width: auto;
    object-fit: contain;
  }

  .logo-title .title-text {
    color: var(--dark);
  }
  `

  return LogoTitle
}) satisfies QuartzComponentConstructor

