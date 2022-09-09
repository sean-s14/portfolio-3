
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


const ArticleDetailPage = (props) => {

    const theme = useTheme();
    const api = useAxios();
    let { slug } = useParams();

    const [article, setArticle] = useState([]);
    const [errors, setErrors] = useState({});

    const getArticle = () => {
        api.get(`articles/${slug}`)
            .then( res => {
                console.log("Res?.data:", res?.data);
                // console.log("Text:", res?.data[0].text.match(/(```py)(\n.*)*(```)/g));
                const d = new Date(res?.data?.date_created)

                const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
                const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

                let day = d.getDay();
                let date = String(d.getDate());
                let month = d.getMonth();
                let year = d.getFullYear();
                let num = {
                    1: 'st',   2: 'nd',  3: 'rd',  4: 'th',
                    5: 'th',   6: 'th',  7: 'th',  8: 'th',
                    9: 'th',  10: 'th', 11: 'th', 12: 'th',
                    13: 'th', 14: 'th', 15: 'th', 16: 'th',
                    17: 'th', 18: 'th', 19: 'th', 20: 'th',
                    21: 'st', 22: 'nd', 23: 'rd', 24: 'th',
                    25: 'th', 26: 'th', 27: 'th', 28: 'th',
                    29: 'th', 30: 'th', 31: 'st',
                };

                let data = {...res?.data, date_created: `${days[day]} ${date}${num[date]}, ${months[month]} ${year}`}
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
                            console.log("Match:", match);
                            // console.log("Node:", node);
                            console.log("Class Name:", className);
                            // console.log("Is Inline:", inline);
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