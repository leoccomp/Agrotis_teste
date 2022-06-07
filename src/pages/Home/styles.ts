import styled from '@mui/system/styled'
import Box from '@mui/system/Box'
import { Button, Grid, Stack, TextField } from '@mui/material';

export const MainContainer = styled(Stack)({
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
});

export const HeaderContainer = styled(Box)({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100vw',
    height: '2.44rem',
    background: 'var(--white)',
    boxShadow: '0px 1px 3px rgba(0, 0, 0, 0.26)'
});

export const FormContainer = styled(Box)({
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: '80vw',
    height: '24.85rem',
    background: 'var(--white)',
    margin: '2rem 2.5rem'
});

export const FormHeader = styled(Box)({
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    height: '3.5rem',
    background: 'var(--green-500)',
    paddingLeft: '1rem',
    paddingRight: '2rem'
});

export const FormGridContainerStyled = styled(Grid)({
    display: 'flex',
    alignItems: 'center',
    width: '100%'
});

export const ButtonStyled = styled(Button)({
    color: '#fff',
    padding: '0.5rem 1rem',
    ":hover": {
        backgroundColor: '#009382',
    }
});