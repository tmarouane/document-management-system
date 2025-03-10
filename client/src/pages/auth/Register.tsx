import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
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

import { register, clearError, selectAuth } from '../../features/auth/authSlice';

const Register: React.FC = () => {
  const dispatch = useDispatch();
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
      name: '',
      email: '',
      password: '',
      confirmPassword: ''
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .required('Le nom est requis'),
      email: Yup.string()
        .email('Adresse e-mail invalide')
        .required('L\'adresse e-mail est requise'),
      password: Yup.string()
        .min(8, 'Le mot de passe doit contenir au moins 8 caractères')
        .required('Le mot de passe est requis'),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref('password')], 'Les mots de passe ne correspondent pas')
        .required('Veuillez confirmer votre mot de passe')
    }),
    onSubmit: (values) => {
      dispatch(register({
        name: values.name,
        email: values.email,
        password: values.password
      }));
    }
  });

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Typography variant="h5" component="h2" gutterBottom align="center">
        Créer un compte
      </Typography>

      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}

      <form onSubmit={formik.handleSubmit}>
        <TextField
          fullWidth
          id="name"
          name="name"
          label="Nom complet"
          variant="outlined"
          margin="normal"
          value={formik.values.name}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.name && Boolean(formik.errors.name)}
          helperText={formik.touched.name && formik.errors.name}
          disabled={loading}
        />

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

        <TextField
          fullWidth
          id="confirmPassword"
          name="confirmPassword"
          label="Confirmer le mot de passe"
          variant="outlined"
          margin="normal"
          type={showPassword ? 'text' : 'password'}
          value={formik.values.confirmPassword}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.confirmPassword && Boolean(formik.errors.confirmPassword)}
          helperText={formik.touched.confirmPassword && formik.errors.confirmPassword}
          disabled={loading}
        />

        <Button
          fullWidth
          variant="contained"
          color="primary"
          type="submit"
          disabled={loading}
          sx={{ mt: 3, mb: 2, py: 1.5, fontSize: '1rem' }}
        >
          {loading ? <CircularProgress size={24} /> : 'S\'inscrire'}
        </Button>

        <Box sx={{ mt: 3, textAlign: 'center' }}>
          <Typography variant="body2">
            Vous avez déjà un compte ?
            <Link to="/login" style={{ textDecoration: 'none', marginLeft: '8px' }}>
              <Typography component="span" variant="body2" color="primary">
                Se connecter
              </Typography>
            </Link>
          </Typography>
        </Box>
      </form>
    </Box>
  );
};

export default Register;
