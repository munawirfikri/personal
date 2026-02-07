import ReactGA from 'react-ga4';

const TRACKING_ID = import.meta.env.VITE_GA_TRACKING_ID || '';

export const initGA = () => {
  if (TRACKING_ID) {
    ReactGA.initialize(TRACKING_ID);
  }
};

export const trackPageView = (path: string) => {
  if (TRACKING_ID) {
    ReactGA.send({ hitType: 'pageview', page: path });
  }
};

export const trackEvent = (category: string, action: string, label?: string) => {
  if (TRACKING_ID) {
    ReactGA.event({
      category,
      action,
      label,
    });
  }
};

export const trackClick = (label: string) => {
  trackEvent('User Interaction', 'Click', label);
};

export const trackDownload = (fileName: string) => {
  trackEvent('Download', 'File', fileName);
};

export const trackFormSubmit = (formName: string) => {
  trackEvent('Form', 'Submit', formName);
};
