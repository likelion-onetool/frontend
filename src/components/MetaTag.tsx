import { Helmet } from "react-helmet-async";

interface MetaTagProps {
  title?: string;
  description?: string;
  imgSrc?: string;
  url?: string;
}

const DEPLOY_URL = "www.onetool.co.kr";
const DEFAULT_TITLE = "OneTool";

export default function MetaTag(props: MetaTagProps) {
  const url = props.url ? `${DEPLOY_URL}${props.url}` : DEPLOY_URL;

  return (
    <Helmet>
      <title>
        {(props.title && `${DEFAULT_TITLE} - ${props.title}`) ||
          `${DEFAULT_TITLE}`}
      </title>
      <meta
        name="description"
        content={props.description || "default description"}
      />
      <meta property="og:type" content="website" />
      <meta property="og:title" content={props.title || `${DEFAULT_TITLE}`} />
      <meta property="og:site_name" content={`${DEFAULT_TITLE}`} />
      <meta
        property="og:description"
        content={props.description || "default description"}
      />
      <meta property="og:url" content={url} />
      <link rel="icon" type="image/png" href="favicon.ico" sizes="16x16" />
    </Helmet>
  );
}
