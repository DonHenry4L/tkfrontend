import { Helmet, HelmetProvider } from "react-helmet-async";

const MetaComponent = ({
  title = "Royal KATD group of companies",
  description = "Royal KATD group of companies helps you grow",
}) => {
  return (
    <HelmetProvider>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
      </Helmet>
    </HelmetProvider>
  );
};

export default MetaComponent;
