import emailjs from '@emailjs/browser';

// Configuración de EmailJS
const EMAIL_CONFIG = {
  SERVICE_ID: import.meta.env.VITE_EMAILJS_SERVICE_ID || 'your_service_id',
  TEMPLATE_ID: import.meta.env.VITE_EMAILJS_TEMPLATE_SENDQUOTE_ID || 'your_template_id',
  TEMPLATE_PAYMENTLINK_ID: import.meta.env.VITE_EMAILJS_TEMPLATE_PAYMENTLINK_ID || 'your_payment_link_template_id',
  PUBLIC_KEY: import.meta.env.VITE_EMAILJS_PUBLIC_KEY || 'your_public_key',
  
};

export interface EmailTemplateParams {
  to_email: string;
  to_name: string;
  move_type: string;
  move_date: string;
  origin_address: string;
  destination_address: string;
  size_of_move: string;
  phone_number?: string;
  additional_info?: string;
  selected_services?: string;
  quote_id?: string;
  company_name?: string;
  company_email?: string;
  [key: string]: unknown;
}

export const sendQuoteConfirmationEmail = async (templateParams: EmailTemplateParams) => {
  try {
    // Verificar que las configuraciones estén disponibles
    if (!EMAIL_CONFIG.SERVICE_ID || !EMAIL_CONFIG.TEMPLATE_ID || !EMAIL_CONFIG.PUBLIC_KEY) {
      console.error('EmailJS configuration missing:', EMAIL_CONFIG);
      return { success: false, error: 'EmailJS configuration incomplete' };
    }

    console.log('Sending email with config:', {
      SERVICE_ID: EMAIL_CONFIG.SERVICE_ID,
      TEMPLATE_ID: EMAIL_CONFIG.TEMPLATE_ID,
      PUBLIC_KEY: EMAIL_CONFIG.PUBLIC_KEY?.substring(0, 8) + '...'
    });

    const response = await emailjs.send(
      EMAIL_CONFIG.SERVICE_ID,
      EMAIL_CONFIG.TEMPLATE_ID,
      templateParams,
      EMAIL_CONFIG.PUBLIC_KEY
    );
    
    console.log('Email sent successfully:', response.status, response.text);
    return { success: true, response };
  } catch (error) {
    console.error('Error sending email:', error);
    return { success: false, error };
  }
};

// Función helper para formatear servicios
export const formatSelectedServices = (services: string[]): string => {
  if (services.length === 0) return 'No additional services selected';
  
  const serviceLabels = {
    pack: 'Packing Service',
    wrap: 'Wrapping Service', 
    load: 'Loading Service',
    unload: 'Unloading Service',
    unpack: 'Unpacking Service',
    home_org: 'Home Organization Service'
  };
  
  return services
    .map(service => serviceLabels[service as keyof typeof serviceLabels] || service)
    .join(', ');
};

// Función helper para formatear fecha
export const formatDate = (date: Date | string): string => {
  if (!date) return 'Not specified';
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  return dateObj.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

// Añadir después de formatDate
export const sendPaymentLinkEmail = async (templateParams: Record<string, unknown>) => {

  try {
    if (!EMAIL_CONFIG.SERVICE_ID || !EMAIL_CONFIG.TEMPLATE_PAYMENTLINK_ID || !EMAIL_CONFIG.PUBLIC_KEY) {
      console.error('EmailJS configuration missing for payment link:', {
        SERVICE_ID: EMAIL_CONFIG.SERVICE_ID,
        TEMPLATE_ID: EMAIL_CONFIG.TEMPLATE_PAYMENTLINK_ID,
        PUBLIC_KEY: EMAIL_CONFIG.PUBLIC_KEY ? '***' : undefined,
      });
      return { success: false, error: 'EmailJS configuration incomplete' };
    }

    console.log('Sending payment link email with template:', EMAIL_CONFIG.TEMPLATE_PAYMENTLINK_ID);

    const response = await emailjs.send(
      EMAIL_CONFIG.SERVICE_ID,
      EMAIL_CONFIG.TEMPLATE_PAYMENTLINK_ID,
      templateParams,
      EMAIL_CONFIG.PUBLIC_KEY
    );

    console.log('Payment link email sent:', response.status, response.text);
    return { success: true, response };
  } catch (error) {
    console.error('Error sending payment link email:', error);
    return { success: false, error };
  }
};