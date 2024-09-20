// useFlowbite.js
import { useEffect } from 'react';

const useFlowbite = () => {
  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Import and initialize Flowbite or any necessary JavaScript
      
      import('flowbite');
    }
  }, []);
};

export default useFlowbite;
