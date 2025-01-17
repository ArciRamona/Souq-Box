import React from 'react';
import { Helmet } from 'react-helmet';

const MetaData = ({ title }) => {
  return (
    <Helmet>
      <meta charSet="utf-8" />
      <title>{`${title} - SouqBox`}</title>
    </Helmet>
  );
};

export default MetaData;