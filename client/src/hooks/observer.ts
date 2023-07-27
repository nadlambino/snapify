import { useState, useEffect } from 'react';

export default (selector: string, options: IntersectionObserverInit = {}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [elements, setElements] = useState<NodeListOf<Element>>();

  useEffect(() => {
    setElements(document.querySelectorAll(selector));
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      {
        rootMargin: '0px 0px 0px 0px',
        threshold: 1,
        ...options,
      }
    );

    if (elements) {
      elements.forEach((e) => {
        observer.observe(e);
      });
    }

    return () => {
      observer.disconnect();
    };
  }, [elements, isVisible]);

  return {
    isVisible,
    elements,
  };
};
