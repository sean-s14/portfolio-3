import { useState, useEffect } from 'react';
import { useTheme } from '@mui/material/styles';
import { useParams } from "react-router-dom";
import SyntaxHighlighter from 'react-syntax-highlighter';
import { 
//     vs, 
    vs2015, 
//     tomorrow, 
    tomorrowNightEighties
} from 'react-syntax-highlighter/dist/esm/styles/hljs';
// import { vscDarkPlus, okaidia } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { Box, Divider } from '@mui/material';
import { Interweave } from 'interweave';


import { PageContainer } from "layout/pageContainer";
import { useAxios } from 'hooks/exports';
import { convertDate } from 'utils/exports';
import { LoadingScreen } from 'pages/exports';


function transform(node, children) {
    if (node.tagName === 'CODE') {
        let nodeClass = node.getAttribute('class');
        let isJS = nodeClass === 'language-js' ;
        return (
            <SyntaxHighlighter 
                language={ isJS ? "js" : "py"} 
                style={ isJS ? tomorrowNightEighties : vs2015}
            >
                {children}
            </SyntaxHighlighter>
        )
    }
}

const ArticleDetailPage = (props) => {

    const theme = useTheme();
	const styles = stylesheet(theme);
    const api = useAxios();
    let { slug } = useParams();

    const [article, setArticle] = useState({});
    const [errors, setErrors] = useState({});

    const getArticle = () => {
        api.get(`articles/${slug}`)
            .then( res => {
                // console.log("Res?.data:", res?.data);
                let data = {...res?.data, date_created: convertDate(res?.data?.date_created)}
                setArticle(data);
            })
            .catch( err => {
                if (!err?.response?.data) return;
                if (!err?.response?.status) return 
                setErrors( e => ({...e, ...err?.response?.data}) );
            });
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect( () => getArticle(), []);
    
    // useEffect( () => {  
    //     console.log("Article:", article)
    // }, [article]);

    if (Object.keys(article).length === 0) return <LoadingScreen />

    return (
        <PageContainer style={styles.PageContainer}>

            { !article && errors && errors.map( (val, index) => (
                <div>{val}</div>
            )) }

            <Box elevation={4} sx={{p: 2, width: '600px', maxWidth: '95%'}}>
                <h1 style={{marginBottom: 0}}>{article && article.title}</h1>
                <div style={{fontSize: '0.85rem', color: theme.palette.text.disabled}}>
                    {article && article.date_created}
                </div>
                <Divider sx={{mt: '1rem', mb: '1rem'}} />
                
                <Interweave 
                    content={article.text}
                    transform={transform}
                />
            
            </Box>

        </PageContainer>
    )
}

const stylesheet = (theme) => ({
    PageContainer: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    ProjectLink: {
        borderRadius: '.4rem',
        padding: '.3rem',
        backgroundColor: 'rgba(0,0,0,0.3)',
        display: 'inline-block',
        textDecoration: 'none',
        color: theme.palette.common.white,
    },
    StackStyle: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        maxWidth: '600px',
    }
})

export default ArticleDetailPage;