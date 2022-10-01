import React from "react";
import { useEffect, useState } from 'react';
import { useTheme } from '@mui/material/styles';
import { 
    Avatar,
    Card,
    CardHeader,
    // CardMedia,
    CardContent,
    Stack,
    IconButton,
    Collapse,
    Typography,
    Box,
    Divider,
} from '@mui/material';
import { KeyboardArrowDown, KeyboardArrowUp, OpenInNew } from '@mui/icons-material';

import { PageContainer } from "layout/pageContainer";
import { useAxios } from 'hooks/exports';
import { convertDate } from 'utils/exports';

import CSSLogo from 'static/images/about/css.png';
import SassLogo from 'static/images/about/sass.png';
import HTMLLogo from 'static/images/about/html.png';
import JSLogo from 'static/images/about/javascript.png';
import PythonLogo from 'static/images/about/python.png';
import ReactLogo from 'static/images/about/react.png';
import DjangoLogo from 'static/images/about/django.png';
import DjangoRestLogo from 'static/images/about/django-rest.png';
import Me from 'static/images/me.jpg';

const AboutPage = (props) => {

    const theme = useTheme();
	const styles = stylesheet(theme);
    const api = useAxios();
    const [errors, setErrors] = useState({});

    const [logos, setLogos] = useState([
        {
            title: "Javascript",
            abbr: "JS",
            src: JSLogo,
            expanded: false,
        },
        {
            title: "Python",
            abbr: "PY",
            src: PythonLogo,
            expanded: false,
        },
        {
            title: "React",
            abbr: "RC",
            src: ReactLogo,
            expanded: false,
        },
        {
            title: "React Native",
            abbr: "RCN",
            src: ReactLogo,
            expanded: false,
        },
        {
            title: "CSS",
            abbr: "CSS",
            src: CSSLogo,
            expanded: false,
        },
        {
            title: "HTML",
            abbr: "HTML",
            src: HTMLLogo,
            expanded: false,
        },
        {
            title: "Sass",
            abbr: "SASS",
            src: SassLogo,
            expanded: false,
        },
        {
            title: "Django",
            abbr: "DJ",
            src: DjangoLogo,
            expanded: false,
        },
        {
            title: "Django Rest",
            abbr: "DJR",
            src: DjangoRestLogo,
            expanded: false,
        },
    ]);

    const expandItem = (title) => {
        setLogos( prev => prev.map( (item) => (
            item.title === title 
                ? {...item, expanded: !item.expanded}
                : item
        )));
    }
    
    useEffect( () => {
        api.get("projects/")
            .then( res => {
                const projects = res?.data;
                setLogos( state => state.map( (item, index) => {
                    projects.forEach( project => {
                        if (project.category === item.abbr) {
                            if (Array.isArray(item?.projects)) {
                                let slugs = item.projects.map(({slug}) => slug)
                                if ( !slugs.includes(project.slug) ) {
                                    item.projects.push(project);
                                }
                            } else {
                                item.projects = [project]
                            }
                        }
                    });
                    return item;
                }))
            })
            .catch( err => {
                if (!err?.response?.data) return;
                if (!err?.response?.status) return 
                setErrors( e => ({...e, ...err?.response?.data}) );
            });
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    // useEffect( () => console.log("Logos:", logos), [logos]);

    return (
        <PageContainer style={styles.PageContainer}>
            
            <Stack 
                spacing={3}
                sx={styles.StackStyle}
            >
                { errors && Object.entries(errors).map( ({key, val}, index) => (
                    <div>{val}</div>
                )) }

                <Box 
                    sx={{
                        display: 'flex', 
                        justifyContent: 'space-between', 
                        minWidth: '95%', 
                        maxWidth: '95%',
                        mt: 3,
                    }}
                >
                    <Box 
                        sx={{
                            maxWidth: '65%', 
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'space-between',
                            mr: 1
                        }}
                    >
                        <Typography paragraph>
                            Hi, I'm Sean. I'm a Developer based in London, England.
                        </Typography>
                        
                        <Typography paragraph>
                            The languages I'm familiar with include Javascript and Python &#40;plus HTML &#38; CSS if you count those&#41;. And the frameworks I'm familiar with include Django Rest &#40;for backend&#41; and React and React Native &#40;for frontend&#41;
                        </Typography>
                        
                        <Typography paragraph sx={{mb: 0}}>
                            Down below is a list of projects I've completed grouped by Language/Framework
                        </Typography>
                    </Box>
                    <Avatar
                        aria-label={'title'} 
                        alt={'a picture of me'}
                        src={Me}
                        sx={{width: '11.5rem', height: 'auto', maxHeight: '15rem', ml: 0}}
                        variant="rounded"
                    />
                </Box>


                { logos && logos.map( ({title, src, expanded, projects}, index) => (
                    projects &&
                        <Card
                            key={index}
                            sx={{minWidth: '95%', maxWidth: '95%'}}
                            elevation={5}
                        >
                            <CardHeader
                                avatar={
                                    <Avatar
                                        aria-label={'title'} 
                                        key={index}
                                        alt={`${title} logo`}
                                        src={src}
                                        sx={{ width: '2.4rem', height: 'auto'}}
                                        variant="rounded"
                                    />
                                }
                                action={
                                    <IconButton
                                        aria-label="drop-down"
                                        onClick={() => expandItem(title)}
                                    >
                                        { expanded
                                            ? <KeyboardArrowUp />
                                            : <KeyboardArrowDown />
                                        }
                                    </IconButton>
                                }
                                title={title}
                                titleTypographyProps={{fontSize: '1.3rem', ml: 2}}
                            />
                            
                            <Collapse in={expanded} timeout="auto" unmountOnExit>
                                <CardContent>
                                    { projects && projects.map( ({title, link, description, date_created}, index) => (
                                        <React.Fragment key={index}>
                                            <Typography 
                                                variant={"h5"}
                                            >
                                                <a 
                                                    href={link} 
                                                    target={"_blank"}
                                                    rel={"noreferrer"}
                                                    className={"project-img-cover"}
                                                    style={styles.ProjectLink}
                                                >
                                                    {title}
                                                    <OpenInNew sx={{ml: 2}}/>
                                                </a>
                                            </Typography>

                                            <Typography 
                                                variant={"caption"}
                                                sx={{ml: 1, color: theme.palette.text.disabled}}
                                            >
                                                {convertDate(date_created)}
                                            </Typography>

                                            <Typography 
                                                paragraph
                                                sx={{mt: 1}}
                                            >
                                                {description}
                                            </Typography>
                                            { projects[index+1] && <Divider sx={{my: 2}}/> }
                                        </React.Fragment>
                                    ))}
                                </CardContent>
                            </Collapse>
                        </Card>
                ))}
            </Stack>
        </PageContainer>
    )
}

const stylesheet = (theme) => ({
    PageContainer: {
        // padding: '1rem',
        // px: '3rem',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        // justifyContent: 'center',
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

export default AboutPage;