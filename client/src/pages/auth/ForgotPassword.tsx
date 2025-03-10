import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import {
  TextField,
  Button,
  Typography,
  Box,
  Alert,
  CircularProgress
} from '@mui/material';

import { forgotPassword, selectAuth } from '../../features/auth/authSlice';

const ForgotPassword: React.FC = () => {
  const dispatch = useDispatch();
  const { loading, error } = useSelector(selectAuth);
  const [success, setSuccess] = useState(false);

  const formik = useFormik({
    initialValues: {
      email: ''
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email('Adresse e-mail invalide')
        .required('L\'adresse e-mail est requise')
    }),
    onSubmit: async (values) => {
      try {
        await dispatch(forgotPassword(values.email));
        setSuccess(true);
      } catch (error) {
        // Error will be handled by the slice
      }
    }
  });

  return (
    <Box sx={{ width: '100%' }}>
      <Typography variant="h5" component="h2" gutterBottom align="center">
        Réinitialisation du mot de passe
      </Typography>

      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}

      {success ? (
        <Box>
          <Alert severity="success" sx={{ mb: 3 }}>
            Un e-mail avec les instructions pour réinitialiser votre mot de passe a été envoyé à {formik.values.email}.
          </Alert>
          <Box sx={{ mt: 3, textAlign: 'center' }}>
            <Link to="/login" style={{ textDecoration: 'none' }}>
              <Button variant="contained" color="primary">
                Retour à la connexion
              </Button>
            </Link>
          </Box>
        </Box>
      ) : (
        <form onSubmit={formik.handleSubmit}>
          <Typography variant="body2" color="textSecondary" paragraph>
            Entrez votre adresse e-mail et nous vous enverrons un lien pour réinitialiser votre mot de passe.
          </Typography>

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

          <Button
            fullWidth
            variant="contained"
            color="primary"
            type="submit"
            disabled={loading}
            sx={{ mt: 3, mb: 2, py: 1.5, fontSize: '1rem' }}
          >
            {loading ? <CircularProgress size={24} /> : 'Envoyer le lien de réinitialisation'}
          </Button>

          <Box sx={{ mt: 3, textAlign: 'center' }}>
            <Link to="/login" style={{ textDecoration: 'none' }}>
              <Typography variant="body2" color="primary">
                Retour à la connexion
              </Typography>
            </Link>
          </Box>
        </form>
      )}
    </Box>
  );
};

export default ForgotPassword;
