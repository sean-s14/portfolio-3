
import { useState, useEffect } from 'react';
import { useTheme } from '@mui/material/styles';
import Grid from '@mui/material/Unstable_Grid2';
// import {
//     Paper,
// } from '@mui/material'


import { PageContainer } from "layout/pageContainer";
import { useAxios } from 'hooks/exports';


const ProjectsPage = (props) => {

    const theme = useTheme();
    const api = useAxios();

    const [projects, setProjects] = useState([]);
    const [errors, setErrors] = useState({});

    const getProjects = () => {
        api.get("projects/")
            .then( res => {
                console.log("Res?.data:", res?.data);
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
    
    useEffect( () => {  
        console.log("Projects:", projects)
    }, [projects]);

    return (
        <PageContainer
            style={{
                padding: '1rem',
                px: '3rem',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center'
            }}
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
                { projects && projects.map( ({id, title, link, imageURI, description, date_created}, index) => (
                    <Grid item xs={6} key={index} 
                        sx={{
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
                        }}
                    >
                        <img 
                            alt={title}
                            src={imageURI}
                            style={{
                                // height: '250px',
                                // display: 'flex',
                                height: 'auto',
                                maxHeight: '250px',
                                maxWidth: '90vw',
                                borderRadius: '.8rem',
                                border: '3px solid #333',
                                // border: '3px solid ' + theme.palette.primary.main,
                                boxSizing: 'border-box'
                            }}
                            className={"project-img"}
                            loading="lazy"
                        />
                        <a 
                            href={link} 
                            target={"_blank"}
                            rel={"noreferrer"}
                            className={"project-img-cover"}
                            style={{
                                borderRadius: '.8rem',
                                opacity: 0,
                                backgroundColor: 'rgba(0,0,0,0.7)',
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                // justifyContent: 'center',
                                top: 0,
                                left: 0,
                                right: 0,
                                bottom: 0,
                                textDecoration: 'none',
                                color: theme.palette.common.white,
                                position: 'absolute',
                                // height: '256px',
                                height: 'auto',
                                maxHeight: '250px',
                                width: 'inherit',
                                // border: '3px solid ' + theme.palette.primary.main,
                                // boxSizing: 'border-box'
                            }}
                        >
                            <h2 sx={{}}>{title}</h2>
                            <div>{description}</div>
                        </a>
                    </Grid>
                )) }
            </Grid>
        </PageContainer>
    )
}

export default ProjectsPage;