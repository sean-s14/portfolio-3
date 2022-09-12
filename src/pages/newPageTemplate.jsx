
import { useState, useEffect } from 'react';
import { useTheme } from '@mui/material/styles';

import { PageContainer } from "layout/pageContainer";
import { useAxios } from 'hooks/exports';
import { useAuthUpdate } from 'contexts/exports';


const NewPageTemplate = (props) => {

    const theme = useTheme();
	const styles = stylesheet(theme);
    const updateAuthData = useAuthUpdate();
    const api = useAxios();

    return (
        <PageContainer sx={styles.PageContainer}>
            <h1>New Page Template</h1>
        </PageContainer>
    )
}

const stylesheet = (theme) => ({
    PageContainer: {
        padding: '1rem',
        px: '3rem',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
    },
})

export default NewPageTemplate;