import 'index.css';
import { useState, useEffect } from 'react';
import { useTheme } from '@mui/material/styles';

import { PageContainer } from "layout/pageContainer";
import { useAxios } from 'hooks/exports';
import { useAuthUpdate } from 'contexts/exports';


const LoadingScreen = (props) => {

    const theme = useTheme();
    const updateAuthData = useAuthUpdate();
    const api = useAxios();

    return (
        <PageContainer>
            <div className={"loader"}></div>
        </PageContainer>
    )
}

export default LoadingScreen;