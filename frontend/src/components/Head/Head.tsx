import { Helmet } from 'react-helmet';

type HeadProps = {
  title?: string;
  description?: string;
};

export const Head = ({ title = '', description = '' }: HeadProps = {}) => {
  return (
    <Helmet title={title ? `${title} | RADA.Charity` : undefined} defaultTitle="RADA.Charity">
      <meta name="description" content={description} />
    </Helmet>
  );
};
