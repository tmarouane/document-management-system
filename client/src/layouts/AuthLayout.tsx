import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Container, Box, Typography, Paper } from '@mui/material';
import { styled } from '@mui/material/styles';

import { selectAuth } from '../features/auth/authSlice';

const AuthContainer = styled(Container)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  minHeight: '100vh',
  padding: theme.spacing(2),
  backgroundColor: theme.palette.background.default,
}));

const AuthPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  borderRadius: '12px',
  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
  width: '100%',
  maxWidth: '450px',
}));

const LogoBox = styled(Box)(({ theme }) => ({
  marginBottom: theme.spacing(4),
  textAlign: 'center',
}));

const AuthLayout: React.FC = () => {
  const { isAuthenticated } = useSelector(selectAuth);

  // Redirect if already authenticated
  if (isAuthenticated) {
    return <Navigate to="/dashboard" />;
  }

  return (
    <AuthContainer maxWidth={false}>
      <AuthPaper elevation={3}>
        <LogoBox>
          <Typography variant="h4" component="h1" gutterBottom color="primary" sx={{ fontWeight: 'bold' }}>
            DOCUSPHERE
          </Typography>
          <Typography variant="subtitle1" color="textSecondary">
            Système de Gestion Documentaire
          </Typography>
        </LogoBox>
        
        <Outlet />
      </AuthPaper>
      
      <Typography variant="body2" color="textSecondary" sx={{ mt: 3, textAlign: 'center' }}>
        © {new Date().getFullYear()} DocuSphere. Tous droits réservés.
      </Typography>
    </AuthContainer>
  );
};

export default AuthLayout;
