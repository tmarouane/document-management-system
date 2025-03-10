import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import {
  TextField,
  Button,
  Typography,
  Box,
  InputAdornment,
  IconButton,
  Alert,
  CircularProgress
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';

import { login, clearError, selectAuth } from '../../features/auth/authSlice';

const Login: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector(selectAuth);
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    return () => {
      // Clear any auth errors when component unmounts
      dispatch(clearError());
    };
  }, [dispatch]);

  const formik = useFormik({
    initialValues: {
      email: '',
      password: ''
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email('Adresse e-mail invalide')
        .required('L\'adresse e-mail est requise'),
      password: Yup.string()
        .required('Le mot de passe est requis')
    }),
    onSubmit: (values) => {
      dispatch(login(values));
    }
  });

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Typography variant="h5" component="h2" gutterBottom align="center">
        Connexion
      </Typography>

      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}

      <form onSubmit={formik.handleSubmit}>
        <TextField
          fullWidth
          id="email"
          name="email"
          label="Adresse e-mail"
          variant="outlined"
          margin="normal"
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.email && Boolean(formik.errors.email)}
          helperText={formik.touched.email && formik.errors.email}
          disabled={loading}
        />

        <TextField
          fullWidth
          id="password"
          name="password"
          label="Mot de passe"
          variant="outlined"
          margin="normal"
          type={showPassword ? 'text' : 'password'}
          value={formik.values.password}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.password && Boolean(formik.errors.password)}
          helperText={formik.touched.password && formik.errors.password}
          disabled={loading}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={toggleShowPassword}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            )
          }}
        />

        <Box sx={{ mt: 2, textAlign: 'right' }}>
          <Link to="/forgot-password" style={{ textDecoration: 'none' }}>
            <Typography variant="body2" color="primary">
              Mot de passe oublié ?
            </Typography>
          </Link>
        </Box>

        <Button
          fullWidth
          variant="contained"
          color="primary"
          type="submit"
          disabled={loading}
          sx={{ mt: 3, mb: 2, py: 1.5, fontSize: '1rem' }}
        >
          {loading ? <CircularProgress size={24} /> : 'Se connecter'}
        </Button>

        <Box sx={{ mt: 3, textAlign: 'center' }}>
          <Typography variant="body2">
            Vous n'avez pas de compte ?
            <Link to="/register" style={{ textDecoration: 'none', marginLeft: '8px' }}>
              <Typography component="span" variant="body2" color="primary">
                Créer un compte
              </Typography>
            </Link>
          </Typography>
        </Box>
      </form>

      {/* Demo accounts section */}
      <Box sx={{ mt: 4, pt: 4, borderTop: '1px solid #eee' }}>
        <Typography variant="body2" color="textSecondary" gutterBottom align="center">
          Comptes de démonstration :
        </Typography>
        <Box sx={{ mt: 1 }}>
          <Typography variant="body2" color="textSecondary" gutterBottom>
            <strong>Admin:</strong> admin@example.com / password
          </Typography>
          <Typography variant="body2" color="textSecondary" gutterBottom>
            <strong>Manager:</strong> manager@example.com / password
          </Typography>
          <Typography variant="body2" color="textSecondary" gutterBottom>
            <strong>Editor:</strong> editor@example.com / password
          </Typography>
          <Typography variant="body2" color="textSecondary" gutterBottom>
            <strong>Viewer:</strong> viewer@example.com / password
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default Login;
