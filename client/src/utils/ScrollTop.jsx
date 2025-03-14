/**
 * @author Tek Bam
 * @description ScrollTop component to handle scrolling to top of the page when load 
 * @version 2.0.0
 */

import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

export default ScrollToTop;
