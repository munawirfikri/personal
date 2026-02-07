import { trackClick, trackFormSubmit, trackDownload } from '../services/analytics';

export const useAnalytics = () => {
  const trackButtonClick = (buttonName: string) => {
    trackClick(buttonName);
  };

  const trackLinkClick = (linkName: string) => {
    trackClick(`Link: ${linkName}`);
  };

  const trackSectionView = (sectionName: string) => {
    trackClick(`Section View: ${sectionName}`);
  };

  const trackFormSubmission = (formName: string) => {
    trackFormSubmit(formName);
  };

  const trackFileDownload = (fileName: string) => {
    trackDownload(fileName);
  };

  return {
    trackButtonClick,
    trackLinkClick,
    trackSectionView,
    trackFormSubmission,
    trackFileDownload,
  };
};
