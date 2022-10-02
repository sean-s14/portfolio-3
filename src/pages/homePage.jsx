
import { Devices, Article, Send } from '@mui/icons-material';
import { 
    useTheme,
    useMediaQuery,
    
    Stack, 
    Paper, 
    IconButton, 
    InputBase, 
    Divider,
    Typography,
    // Box,
} from '@mui/material';
import { Link } from 'react-router-dom';
import { PageContainer } from "layout/pageContainer";
import { useVariables } from 'hooks/exports';

const HomePage = () => {

    const theme = useTheme();
    const vars = useVariables();
    const mobile = useMediaQuery(`(min-width: ${vars.mobile})`)


    const linkStyle = {
        textDecoration: 'none',
        color: theme.palette.common.white,
        backgroundColor: theme.palette.primary.main,
        padding: 10,
        borderRadius: 4,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-around',
        width: '18rem',
        fontSize: '1.2rem',
        // marginBottom: 15,
    }

    return (
        <PageContainer 
            style={{
                padding: 5, 
                display: 'flex', 
                flexDirection: 'column', 
                alignItems: 'center'
            }}
        >
            {/* <h1 style={{marginBottom: '4rem'}}>Welcome!</h1> */}

            <Stack spacing={1} sx={{mt: mobile ? 4 : 0}}>
                <Typography
                    variant={"h6"}
                    sx={{
                        color: theme.palette.grey[500],
                        fontWeight: theme.typography.fontWeightLight
                    }}
                >
                    Welcome, my name is
                </Typography>

                <Typography
                    variant={mobile ? "h2" : "h3"}
                    sx={{
                        fontWeight: theme.typography.fontWeightBold
                    }}
                >
                    Sean Stocker
                </Typography>

                <Typography
                    variant={mobile ? "h3" : "h4"}
                    sx={{color: theme.palette.primary.main}}
                >
                    I build websites and mobile apps
                </Typography>
            </Stack>

            <Stack 
                spacing={5} 
                sx={{
                    mt: mobile ? 10 : 4,
                    // width: '100%',
                    // display: 'flex', 
                    // flexDirection: 'column', 
                    // alignItems: 'center'
                }}
            >
                <Paper
                    component="form"
                    elevation={4}
                    sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: '18rem', height: 60 }}
                >
                    <InputBase
                        sx={{ ml: 1, flex: 1, fontSize: '1.2rem' }}
                        placeholder="Enter email to subscribe"
                        inputProps={{ 'aria-label': 'email to subscribe' }}
                    />
                    <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
                    <IconButton color="primary" sx={{ p: '10px' }} aria-label="subscribe">
                        <Send />
                    </IconButton>
                </Paper>

                <Paper elevation={4}>
                    <Link
                        to={"projects"}
                        style={linkStyle}
                    >
                        View my Projects <Devices sx={{ fontSize: 30 }} />
                    </Link>
                </Paper>

                <Paper elevation={4}>
                    <Link
                        to={"articles"}
                        style={linkStyle}
                    >
                        View my Articles <Article sx={{ fontSize: 30 }} />
                    </Link>
                </Paper>
            </Stack>
        </PageContainer>
    );
};

export default HomePage;