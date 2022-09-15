
import { useState, useEffect } from 'react';
import { useTheme } from '@mui/material/styles';
import { useParams,useNavigate } from "react-router-dom";
import { 
    Avatar,
    Badge,
    IconButton,
    Input,
    InputLabel,
    // Box,
    Stack,
    Button,
    TextField,
} from '@mui/material';
import { ChangeCircle } from '@mui/icons-material';

import DefaultUser from 'static/images/default-user.jpg';
import { PageContainer } from "layout/pageContainer";
import { useAxios } from 'hooks/exports';


const ProjectUpdatePage = (props) => {

    const theme = useTheme();
	const styles = stylesheet(theme);

    const api = useAxios();
    const navigate = useNavigate();
    let { slug } = useParams();

    const [project, setProject] = useState({});
    const [errors, setErrors] = useState({});

    const [form, setForm] = useState({});

    const getProject = () => {
        api.get(`projects/${slug}`)
            .then( res => {
                setProject(res?.data);
            })
            .catch( err => {
                if (!err?.response?.data) return;
                if (!err?.response?.status) return 
                setErrors( e => ({...e, ...err?.response?.data}) );
            });
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect( () =>  getProject(), []);
    useEffect( () =>  console.log("Project:", project), [project]);


    const update = () => {
        api.patch(`projects/edit/${slug}/`, form)
            .then( res => {
                navigate("/projects", {replace: true});
            })
            .catch( err => {
                if (!err?.response?.data) return;
                if (!err?.response?.status) return 
                setErrors( e => ({...e, ...err?.response?.data}) );
            });
    };

    const handleTitle       = (e) => setForm({...form, title: e.target.value});
    const handleLink        = (e) => setForm({...form, link: e.target.value});
    const handleDescription = (e) => setForm({...form, description: e.target.value});
    const handlePhoto = (e) => {
        console.log('Handling Photo...');
        let file = e.target.files[0];
        // console.log("File:", file);
        function getBase64(file, cb) {
            let reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = function () {
                cb(reader.result)
            };
            reader.onerror = function (error) {
                console.log('Error: ', error);
            };
        }

        let res = '';
        getBase64(file, (result) => {
            // setProject( (u) => ({...u, imageURI: result}) )
            setForm( (u) => ({...u, imageURI: result}) )
        })
        console.log(res);
    };

    return (
        <PageContainer style={styles.PageContainer}>
            <h1>Project Update</h1>

            <Stack 
                spacing={3} 
                direction="column"
                sx={styles.FormStack}
            >
                <Badge
                    overlap="circular"
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                    sx={{display: 'flex', justifyContent: 'center'}}
                    badgeContent={
                        <IconButton>
                            <InputLabel 
                                htmlFor={"photo-upload"} 
                                sx={{
                                    width: '3rem',
                                    maxWidth: '3rem', 
                                    height: '3rem',
                                    maxHeight: '3rem',
                                }}
                            >
                                <ChangeCircle sx={{ fontSize: "3rem" }} />
                            </InputLabel>
                            <Input 
                                id={"photo-upload"}
                                type={"file"} 
                                hidden={true}
                                onChange={ e => handlePhoto(e) }
                                sx={{display: 'none'}}
                            >
                            </Input>
                        </IconButton>
                    }
                >    
                    <Avatar 
                        alt="Default User"
                        src={ form?.imageURI || project.imageURI || DefaultUser }
                        sx={{ 
                            width: 400,
                            maxWidth: 400,
                            height: 200,
                            maxHeight: 200,
                            border: '2px solid ' + theme.palette.primary.light,
                        }}
                        variant={"rounded"}
                    />
                </Badge>

                <TextField 
                    error={ !!errors?.title }
                    helperText={ errors?.title }
                    value={
                        form?.title 
                        // eslint-disable-next-line no-new-wrappers
                        || (form?.title === '' && new String(""))
                        || project.title 
                        || '' 
                    }
                    onChange={ handleTitle }
                    label={'title'}
                />
                <TextField 
                    error={ !!errors?.link }
                    helperText={ errors?.link }
                    value={
                        form?.link 
                        // eslint-disable-next-line no-new-wrappers
                        || (form?.link === '' && new String(""))
                        || project.link 
                        || '' 
                    }
                    onChange={ handleLink } 
                    label={'link'}
                />
                <TextField 
                    error={ !!errors?.description }
                    helperText={ errors?.description }
                    value={
                        form?.description 
                        // eslint-disable-next-line no-new-wrappers
                        || (form?.description === '' && new String(""))
                        || project.description 
                        || '' 
                    }
                    onChange={ handleDescription } 
                    label={'description'}
                    multiline={true}
                    rows={3}
                />
                <Button variant="contained" onClick={ update } disabled={Object.keys(form).length === 0} >
                    Update
                </Button>
            </Stack>
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
    FormStack: {
        width: '18rem',
        '& > button, & > div': {
            width: '100%',
            color: theme.palette.mode === 'dark' && theme.palette.primary.light,
            fontSize: '1rem',
            '& > input': {
                fontSize: '1.3rem',
            },
            '& > a': {
                color: 'inherit',
                fontSize: 'inherit',
                textDecoration: 'none',
            },
        }
    }
})

export default ProjectUpdatePage;