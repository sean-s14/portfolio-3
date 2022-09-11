
import { useState, useEffect, useRef } from 'react';
// import { useTheme } from '@mui/material/styles';
import { Box, Button } from '@mui/material';
import { useParams } from "react-router-dom";
import { Editor } from '@tinymce/tinymce-react';

import { PageContainer } from "layout/pageContainer";
import { useAxios } from 'hooks/exports';


const ArticleUpdatePage = (props) => {
    const editorRef = useRef(null);
    const [dirty, setDirty] = useState(false);
    useEffect(() => setDirty(false), []);

    // const theme = useTheme();
    const api = useAxios();
    let { slug } = useParams();

    const [article, setArticle] = useState({});
    const [errors, setErrors] = useState({});

    const getArticle = () => {
        api.get(`articles/${slug}`)
            .then( res => {
                setArticle(res?.data);
            })
            .catch( err => {
                if (!err?.response?.data) return;
                if (!err?.response?.status) return 
                setErrors( e => ({...e, ...err?.response?.data}) );
            });
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect( () =>  getArticle(), []);


    const update = () => {
      if (editorRef.current) {
        const content = editorRef.current.getContent();
        setDirty(false);
        editorRef.current.setDirty(false);
        // an application would save the editor content to the server here
        api.patch(`articles/edit/${slug}/`, {text: content})
            .then( res => {
            })
            .catch( err => {
                if (!err?.response?.data) return;
                if (!err?.response?.status) return 
                setErrors( e => ({...e, ...err?.response?.data}) );
            });
      }
    };

    return (
        <PageContainer
            style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
            }}
        >
            <Box sx={{width: '90%', pt: 5}}>
                { !article && errors && errors.map( (val, index) => (
                    <div>{val}</div>
                )) }
                
                <Editor
                    apiKey='xml55fdjmkrdq1yhz0j07so76ypn9oxz2juz6hwniq0geahd'
                    init={{
                        "width": "100%", 
                        "height": 600,
                        "theme": "silver",
                        "skin": 'oxide-dark',
                        "menubar": true,
                        "plugins": "code",
                        "toolbar": "code | undo redo | formatselect | "
                            + "bold italic backcolor | alignleft aligncenter "
                            + "alignright alignjustify | bullist numlist outdent indent | "
                            + "removeformat | help",
                    }}
                    initialValue={article && article.text}
                    onInit={(evt, editor) => editorRef.current = editor}
                    onDirty={() => setDirty(true)}
                />

                {dirty && <p>You have unsaved content!</p>}

                <Button 
                    variant="contained" 
                    onClick={ update }
                    disabled={!dirty}
                    sx={{
                        width: '100%',
                        mt: 1,
                        fontWeight: 900,
                    }}
                >
                    Update
                </Button>
            </Box>
        </PageContainer>
    )
}

export default ArticleUpdatePage;