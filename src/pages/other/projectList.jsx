
import { useState, useEffect } from 'react';
import { useTheme } from '@mui/material/styles';
import Grid from '@mui/material/Unstable_Grid2';
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


import { PageContainer } from "layout/pageContainer";
import { useAxios } from 'hooks/exports';
import { useAuth } from 'contexts/exports';


const ProjectsPage = (props) => {

    const theme = useTheme();
	const styles = stylesheet(theme);
    const api = useAxios();
    const auth = useAuth();

    const [projects, setProjects] = useState([]);
    const [errors, setErrors] = useState({});

    const [project, setProject] = useState({});
    const [delOpen, setDelOpen] = useState(false);

    const handleDelOpen = () => setDelOpen(true);
    const handleDelClose = () => setDelOpen(false);

    const getProjects = () => {
        api.get("projects/")
            .then( res => {
                // console.log("Res?.data:", res?.data);
                setProjects(res?.data);
            })
            .catch( err => {
                if (!err?.response?.data) return;
                if (!err?.response?.status) return 
                setErrors( e => ({...e, ...err?.response?.data}) );
            });
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect( () =>  getProjects(), []);

    const deleteProject = () => {
        api.delete(`projects/delete/${project.slug}/`)
            .then( res => {
                getProjects();
            })
            .catch( err => {
                if (!err?.response?.data) return;
                if (!err?.response?.status) return 
                setErrors( e => ({...e, ...err?.response?.data}) );
            });
        handleDelClose()
    }
    
    useEffect( () => {  
        console.log("Projects:", projects)
    }, [projects]);

    return (
        <PageContainer
            style={styles.PageContainer}
        >
            <h1 style={{width: '100%', textAlign: 'center'}}>Projects</h1>

            <Grid 
                container 
                spacing={2}
                sx={{
                    justifyContent: 'inherit'
                }}
                wrap='wrap'
            >
                { !projects && errors && errors.map( (val, index) => (
                    <div>{val}</div>
                )) }
                { projects && projects.map(({id,title,slug,link,imageURI,description,date_created},index) => (
                    <Grid item xs={6} key={index} 
                        sx={styles.GridStyle}
                    >
                        <img 
                            alt={title}
                            src={imageURI}
                            style={styles.ProjectImg}
                            className={"project-img"}
                            loading="lazy"
                        />
                        <a 
                            href={link} 
                            target={"_blank"}
                            rel={"noreferrer"}
                            className={"project-img-cover"}
                            style={styles.ProjectLink}
                        >
                            <h2 sx={{}}>{title}</h2>
                            <div>{description}</div>
                        </a>
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
                                    <Link to={`/projects/edit/${slug}`} style={styles.LinkStyle}>
                                        <Edit sx={{color: theme.palette.primary.main}} />
                                    </Link>
                                </IconButton>
                                <IconButton 
                                    onClick={ () => {
                                        handleDelOpen();
                                        setProject({title: title, slug: slug});
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
                aria-labelledby="project-delete-dialog-title"
                aria-describedby="project-delete-dialog-description"
            >
                <DialogTitle id="project-delete-dialog-title">
                    {`Delete project titled "${project.title}"?`}
                </DialogTitle>
                <DialogActions sx={{justifyContent: 'center'}}>
                    <Button onClick={deleteProject}>Delete</Button>
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
        alignItems: 'center',
        justifyContent: 'center',
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
    ProjectLink: {
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
    ProjectImg: {
        height: 'auto',
        maxHeight: '250px',
        maxWidth: '90vw',
        borderRadius: '.8rem',
        border: '3px solid #333',
        boxSizing: 'border-box'
    }
})

export default ProjectsPage;