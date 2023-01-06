import {Helmet, HelmetProvider} from "react-helmet-async"


const MetaComponent = ({title="Tksarl group of companies", description="We will help you grow"}) => {
    return (
        <HelmetProvider>
            <Helmet>
                <title>{title}</title>
                <meta name="description" content={description}/>
            </Helmet>
        </HelmetProvider>
    )
}

export default MetaComponent