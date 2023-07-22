import { useState, useEffect } from 'react';

type ClickPosition = 'left' | 'right';

const useClickOutside = (selector: string) => {
  const [clickPosition, setClickPosition] = useState<ClickPosition | null>(null);

  useEffect(() => {
    const handleDocumentClick = (event: MouseEvent) => {
      const { clientX } = event;
      const targetElement = document.querySelector(selector) as HTMLElement | null;

      // Check if the click occurred outside the specified element
      if (targetElement && !targetElement.contains(event.target as Node)) {
        const rect = targetElement.getBoundingClientRect();
        const elementWidth = rect.width;

        // Calculate the position of the click relative to the center of the element
        const distanceFromCenter = clientX - (rect.left + elementWidth / 2);

        // Determine whether the click is on the left or right side
        if (distanceFromCenter < 0) {
          setClickPosition('left');
        } else {
          setClickPosition('right');
        }
      }
    };

    document.addEventListener('click', handleDocumentClick);

    // Clean up event listener on unmount
    return () => {
      document.removeEventListener('click', handleDocumentClick);
    };
  }, [selector]);

  return clickPosition;
};

export default useClickOutside;
