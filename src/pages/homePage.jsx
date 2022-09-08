
import { useTheme } from '@mui/material';
import { Link } from 'react-router-dom';
import { PageContainer } from "layout/pageContainer";
import { Devices, Article, Send } from '@mui/icons-material';
import { Stack, Paper, IconButton, InputBase, Divider,   } from '@mui/material';

const HomePage = () => {

    const theme = useTheme();


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
        <PageContainer style={{padding: 5, display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
            <h1 style={{marginBottom: '4rem'}}>Welcome!</h1>
            <Stack spacing={5}>
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

export { HomePage };