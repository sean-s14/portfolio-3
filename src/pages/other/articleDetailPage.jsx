
import { useState, useEffect } from 'react';
import { useTheme } from '@mui/material/styles';
import { useParams } from "react-router-dom";
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm'
import SyntaxHighlighter from 'react-syntax-highlighter';
import { vs, vs2015, tomorrow, tomorrowNightEighties } from 'react-syntax-highlighter/dist/esm/styles/hljs';
// import { vscDarkPlus, okaidia } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { Box, Divider } from '@mui/material';

import { PageContainer } from "layout/pageContainer";
import { useAxios } from 'hooks/exports';
import { convertDate } from 'utils/exports';
import { LoadingScreen } from 'pages/exports';


const ArticleDetailPage = (props) => {

    const theme = useTheme();
    const api = useAxios();
    let { slug } = useParams();

    const [article, setArticle] = useState({});
    const [errors, setErrors] = useState({});

    const getArticle = () => {
        api.get(`articles/${slug}`)
            .then( res => {
                console.log("Res?.data:", res?.data);
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
    useEffect( () =>  getArticle(), []);
    
    useEffect( () => {  
        console.log("Article:", article)
    }, [article]);

    if (Object.keys(article).length === 0) return <LoadingScreen />

    return (
        <PageContainer style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
            { !article && errors && errors.map( (val, index) => (
                <div>{val}</div>
            )) }
            <Box elevation={4} sx={{p: 2, width: '500px', maxWidth: '95%'}}>
                <h1 style={{marginBottom: 0}}>{article && article.title}</h1>
                <div style={{fontSize: '0.85rem', color: theme.palette.text.disabled}}>{article && article.date_created}</div>
                <Divider sx={{mt: '1rem', mb: '1rem'}} />
                <ReactMarkdown
                    children={article && article.text}
                    remarkPlugins={[remarkGfm]}
                    components={{
                        code({node, inline, className, children, ...props}) {
                            const match = /language-(\w+)/.exec(className || '')
                            return <SyntaxHighlighter
                                        children={String(children)}
                                        language={ (match && match[1]) || 'js' }
                                        style={ 
                                            match && (match[1] === 'js') 
                                            ? tomorrowNightEighties
                                            : vs2015 
                                                // ? theme.mode === 'dark' 
                                                //     ? tomorrowNightEighties
                                                //     : tomorrow 
                                                // : theme.mode === 'dark' 
                                                //     ? vs2015 
                                                //     : vs
                                                // : vs2015 
                                        }
                                        PreTag={inline ? "span" : "div"}
                                        {...props}
                                    />
                            // return !inline && match ? (
                            //   <SyntaxHighlighter
                            //     children={String(children)}
                            //     // style={vs2015}
                            //     style={match[1] === 'js' ? tomorrowNightEighties : vs2015}
                            //     language={match[1]}
                            //     PreTag="div"
                            //     {...props}
                            //   />
                            // ) : (
                            //     // <code className={className} {...props}>
                            //     //   {children}
                            //     // </code>
                            //   <SyntaxHighlighter
                            //     children={String(children)}
                            //     style={tomorrowNightEighties}
                            //     language={"javascript"}
                            //     PreTag="div"
                            //     {...props}
                            //   />
                            // )
                        }
                    }}
                />
            </Box>
        </PageContainer>
    )
}

export default ArticleDetailPage;