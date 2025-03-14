import * as Yup from 'yup';

const serviceValidationSchema = Yup.object({
  service_title: Yup.string()
    .min(5, 'Service title must be at least 5 characters')
    .max(100, 'Service title cannot exceed 100 characters')
    .required('Service title is required'),

  service_description: Yup.string()
    .min(20, 'Description must be at least 20 characters')
    .required('Service description is required'),

  service_thumbnail: Yup.string()
    .url('Please provide a valid URL')
    .required('Service thumbnail is required'),

  service_text: Yup.string()
    .min(20, 'Service text must be at least 20 characters')
    .required('Service text is required'),

  service_price: Yup.number()
    .positive('Price must be a positive number')
    .required('Service price is required')
});

export default serviceValidationSchema;
