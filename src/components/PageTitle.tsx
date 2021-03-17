import React from 'react';
import * as PropTypes from 'prop-types';
import { Helmet } from 'react-helmet-async';

interface IPageTitleProps {
    title: string
}

const PageTitle: React.FC<IPageTitleProps> = ({ title }) => {
    title = `${title} | PGallery`;
    return (
        <Helmet>
            <title>{title}</title>
        </Helmet>
    );
};

PageTitle.propTypes = {
    title: PropTypes.string.isRequired,
};

export default PageTitle;