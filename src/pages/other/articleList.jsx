
import { useState, useEffect } from 'react';
import { useTheme } from '@mui/material/styles';
import { 
    IconButton, 
    Box, 
    Button,
    Dialog,
    DialogActions,
    DialogTitle,
} from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';
import { Link } from "react-router-dom";
import Grid from '@mui/material/Unstable_Grid2';

import { PageContainer } from "layout/pageContainer";
import { useAxios } from 'hooks/exports';
import { convertDate } from 'utils/exports';
import { LoadingScreen } from 'pages/exports';
import { useAuth } from 'contexts/exports';


const ArticlesPage = (props) => {

    const theme = useTheme();
	const styles = stylesheet(theme);
    const api = useAxios();
    const auth = useAuth();

    const [articles, setArticles] = useState([]);
    const [errors, setErrors] = useState({});

    const [article, setArticle] = useState({});
    const [delOpen, setDelOpen] = useState(false);

    const handleDelOpen = () => setDelOpen(true);
    const handleDelClose = () => setDelOpen(false);

    const getArticles = () => {
        api.get("articles/")
            .then( res => {
                console.log("Res?.data:", res?.data);
                setArticles(res?.data);
                // console.log("Text:", res?.data[0].text.match(/(```py)(\n.*)*(```)/g));
            })
            .catch( err => {
                if (!err?.response?.data) return;
                if (!err?.response?.status) return 
                setErrors( e => ({...e, ...err?.response?.data}) );
            });
    }

    const deleteArticle = () => {
        api.delete(`articles/delete/${article.slug}/`)
            .then( res => {
                getArticles();
            })
            .catch( err => {
                if (!err?.response?.data) return;
                if (!err?.response?.status) return 
                setErrors( e => ({...e, ...err?.response?.data}) );
            });
        handleDelClose()
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect( () =>  getArticles(), []);
    
    useEffect( () => {  
        console.log("Articles:", articles)
    }, [articles]);

    if (articles.length === 0) return <LoadingScreen />
    // if (!articles) return <div className={"loader"}></div>;

    return (
        <PageContainer style={styles.PageContainer}>
            <h1>Articles</h1>

            <Grid 
                container 
                spacing={2}
                sx={{ justifyContent: 'inherit' }}
                wrap='wrap'
            >
                { !articles && errors && errors.map( (val, index) => (
                    <div>{val}</div>
                )) }
                { articles && articles.map( ({slug, title, imageURI, date_created}, index) => (
                    <Grid item xs={6} key={index} sx={styles.GridStyle}>
                        <img 
                            alt={title}
                            src={imageURI}
                            style={styles.ArticleImg}
                            className={"project-img"}
                            loading="lazy"
                        />
                        <Link
                            to={slug} 
                            className={"project-img-cover"}
                            style={styles.ArticleLink}
                        >
                            <h2>{title}</h2>
                            <div>{convertDate(date_created)}</div>
                        </Link>
                        { !!auth?.tokens?.access &&
                            <Box 
                                sx={{
                                    display: 'flex',
                                    position: 'absolute',
                                    right: '10px',
                                    bottom: '10px',
                                }}
                            >
                                <IconButton sx={styles.IconButtonStyle}>
                                    <Link to={`/articles/edit/${slug}`} style={styles.LinkStyle}>
                                        <Edit sx={{color: theme.palette.primary.main}} />
                                    </Link>
                                </IconButton>
                                <IconButton 
                                    onClick={ () => {
                                        handleDelOpen();
                                        setArticle({title: title, slug: slug});
                                    }}
                                    sx={styles.IconButtonStyle}
                                >
                                    <Delete sx={{color: theme.palette.error.main}} />
                                </IconButton>
                            </Box>
                        }
                    </Grid>
                )) }
            </Grid>
            
            <Dialog
                open={delOpen}
                onClose={handleDelClose}
                aria-labelledby="article-delete-dialog-title"
                aria-describedby="article-delete-dialog-description"
            >
                <DialogTitle id="article-delete-dialog-title">
                    {`Delete article titled "${article.title}"?`}
                </DialogTitle>
                <DialogActions sx={{justifyContent: 'center'}}>
                    <Button onClick={deleteArticle}>Delete</Button>
                    <Button onClick={handleDelClose} autoFocus>
                        Cancel
                    </Button>
                </DialogActions>
            </Dialog>
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
        justifyContent: 'center'
    },
    GridStyle: {
        width: 'auto', 
        maxWidth: '500px',
        position: 'relative', 
        padding: 0,
        marginLeft: '1rem',
        marginRight: '1rem',
        marginBottom: '2rem',
        display: 'flex',
        flexDirection: 'column',
        height: 'auto',
    },
    LinkStyle: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        height: '100%',
    },
    IconButtonStyle: {
        width: '2.5rem',
        height: '2.5rem',
        mr: '.3rem',
        borderRadius: '5px',
        padding: 0,
        '&:hover': {bgcolor: 'rgba(0,0,0,0.8)'},
    },
    ArticleLink: {
        borderRadius: '.8rem',
        opacity: 0,
        backgroundColor: 'rgba(0,0,0,0.7)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        textDecoration: 'none',
        color: theme.palette.common.white,
        position: 'absolute',
        height: 'auto',
        maxHeight: '250px',
        width: 'inherit',
    },
    ArticleImg: {
        height: 'auto',
        maxHeight: '250px',
        maxWidth: '90vw',
        borderRadius: '.8rem',
        border: '3px solid #333',
        boxSizing: 'border-box'
    }
})

export default ArticlesPage;