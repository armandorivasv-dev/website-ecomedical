import { useState } from 'react';
import {
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  Typography,
  useMediaQuery,
  Button,
  TextField,
  Stack,
  IconButton,
  Container,
  Grid,
} from '@mui/material';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
//import { toast } from 'react-hot-toast';
import CloseIcon from '@mui/icons-material/Close';

export const ContactForm = (props) => {
  const { open, handleClose } = props;
  const [submitState, setSubmitState] = useState(false);

  return (
    <>
      <Dialog
        open={open}
        onClose={handleClose}
      >
        <DialogTitle
          sx={{ m: 0, p: 2 }}
          id='contact-form-title'
          aria-label='title'
        >
          Formulario de Contacto
        </DialogTitle>
        <IconButton
          aria-label='close'
          onClick={handleClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            //color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
        {submitState ? (
          <DialogContent dividers>
            <Box
              sx={{
                '& .MuiTextField-root': { m: 1, width: '50ch' },
                // pl: align === 'vertical' ? 0 : 10,
                pb: 5,
                // border: '1px white solid',
                // borderRadius: '25px',
              }}
            >
              <Box
                sx={{
                  py: 2,
                }}
              />
              <Typography
                variant='h5'
                textAlign='center'
                sx={{ textTransform: 'uppercase' }}
              >
                Formulario enviado con éxito
              </Typography>
              <Typography
                variant='subtitle1'
                textAlign='center'
                sx={{ mt: 2 }}
              >
                Hemos recibido su mensaje con éxito, nuestro equipo revisará sus datos para ser contactado.
              </Typography>
            </Box>
          </DialogContent>
        ) : (
          <DialogContent dividers>
            <Box
              //minWidth={400}
              // sx={{
              //   '& .MuiTextField-root': { m: 1, width: '50ch' },
              //   mt: 0,
              // }}
              sx={{
                width: 400,
                maxWidth: '100%',
              }}
            >
              <Formik
                initialValues={{
                  nombre: '',
                  email: '',
                  telefono: '',
                  mensaje: '',
                }}
                validationSchema={Yup.object({
                  // nombre: Yup.string().max(255).required('Requerido'),
                  // email: Yup.string().max(255).email().required('Requerido'),
                  // telefono: Yup.string().max(255).required('Requerido'),
                })}
                onSubmit={async (values, helpers) => {
                  try {
                    const payload = {
                      data: {
                        nombre: values.nombre,
                        email: values.email,
                        telefono: values.telefono,
                        mensaje: values.mensaje,
                      },
                    };
                    //console.log("payload -> ",JSON.stringify(payload, null, 4));
                    // const response = await strapiContactFormController.postPublicContactForm({
                    //   payload: payload,
                    // });

                    //alert(JSON.stringify(payload, null ,4))
                    setSubmitState(true);
                    helpers.setStatus({ success: true });
                    helpers.setSubmitting(false);
                    //toast.success('¡Información Recibida!');
                  } catch (err) {
                    console.error(err);
                    //toast.error('¡Hubo un error! :(');
                    helpers.setStatus({ success: false });
                    helpers.setErrors({ submit: err.message });
                    helpers.setSubmitting(false);
                  }
                }}
              >
                {({
                  resetForm,
                  handleChange,
                  handleSubmit,
                  handleReset,
                  handleBlur,
                  setFieldValue,
                  values,
                  field,
                  touched,
                  errors,
                }) => (
                  <Form>
                    <Stack
                      direction='column'
                      spacing={2}
                    >
                      <TextField
                        id='name'
                        name='name'
                        label='Nombre'
                        variant='outlined'
                        size='small'
                        error={Boolean(touched.name && errors.name)}
                        fullWidth
                        helperText={touched.name && errors.name}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.name}
                        // sx={{
                        //   backgroundColor: '#fff',
                        //   //borderRadius: '10px',
                        //   //border: 'none',
                        // }}
                      />

                      <TextField
                        id='email'
                        name='email'
                        label='Email'
                        variant='outlined'
                        size='small'
                        error={Boolean(touched.email && errors.email)}
                        fullWidth
                        helperText={touched.email && errors.email}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.email}
                        // sx={{
                        //   backgroundColor: '#fff',
                        //   borderRadius: '10px',
                        //   border: 'none',
                        // }}
                      />

                      <TextField
                        id='phone'
                        name='phone'
                        label='Teléfono'
                        variant='outlined'
                        size='small'
                        error={Boolean(touched.phone && errors.phone)}
                        fullWidth
                        helperText={touched.phone && errors.phone}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.phone}
                        // sx={{
                        //   backgroundColor: '#fff',
                        //   borderRadius: '10px',
                        //   border: 'none',
                        // }}
                      />

                      <TextField
                        id='mesagge'
                        name='mesagge'
                        label='Mensaje'
                        variant='outlined'
                        size='small'
                        error={Boolean(touched.mesagge && errors.mesagge)}
                        fullWidth
                        helperText={touched.mesagge && errors.mesagge}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.mesagge}
                        multiline
                        rows={4}
                        // sx={{
                        //   backgroundColor: '#fff',
                        //   borderRadius: '10px',
                        //   border: 'none',
                        // }}
                      />
                    </Stack>

                    <Stack
                      direction='row'
                      justifyContent='center'
                      spacing={2}
                      sx={{ pt: 4, pb: 5 }}
                    >
                      <Button
                        variant='contained'
                        size='large'
                        // sx={{
                        //   //backgroundColor: '#2986cc',
                        //   //width: '400px',
                        //   //height: '80px',
                        //   '&:hover': {
                        //     backgroundColor: '#fff',
                        //     color: '#2986cc',
                        //   },
                        // }}
                        onClick={handleSubmit}
                      >
                        ENVIAR
                      </Button>
                    </Stack>
                  </Form>
                )}
              </Formik>
            </Box>
          </DialogContent>
        )}
      </Dialog>
    </>
  );
};
