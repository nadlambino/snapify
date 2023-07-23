import { useState, useEffect } from 'react';

export type SwipeDirection = 'left' | 'right' | 'up' | 'down' | null

const useSwipe = () => {
  const [swipeDirection, setSwipeDirection] = useState<SwipeDirection>(null);
  const [swipeDistance, setSwipeDistance] = useState(0);

  useEffect(() => {
    let initialX = 0;
    let initialY = 0;
    let deltaX = 0;
    let deltaY = 0;

    const handleTouchStart = (event: TouchEvent) => {
      const touch = event.touches[0];
      initialX = touch.clientX;
      initialY = touch.clientY;
    };

    const handleTouchMove = (event: TouchEvent) => {
      if (!initialX || !initialY) return;

      const touch = event.touches[0];
      deltaX = touch.clientX - initialX;
      deltaY = touch.clientY - initialY;

      setSwipeDistance(Math.sqrt(deltaX ** 2 + deltaY ** 2));

      // Detect the swipe direction based on the angle of the swipe
      const angle = (Math.atan2(deltaY, deltaX) * 180) / Math.PI;
      if (angle >= -45 && angle < 45) {
        setSwipeDirection('right');
      } else if (angle >= 45 && angle < 135) {
        setSwipeDirection('down');
      } else if (angle >= -135 && angle < -45) {
        setSwipeDirection('up');
      } else {
        setSwipeDirection('left');
      }
    };

    const handleTouchEnd = () => {
      setSwipeDirection(null);
      setSwipeDistance(0);
      initialX = 0;
      initialY = 0;
    };

    // Add event listeners for touch events
    document.addEventListener('touchstart', handleTouchStart);
    document.addEventListener('touchmove', handleTouchMove);
    document.addEventListener('touchend', handleTouchEnd);

    // Clean up event listeners on unmount
    return () => {
      document.removeEventListener('touchstart', handleTouchStart);
      document.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('touchend', handleTouchEnd);
    };
  }, [swipeDistance, swipeDirection]);

  return { swipeDirection, swipeDistance };
};

export default useSwipe;
