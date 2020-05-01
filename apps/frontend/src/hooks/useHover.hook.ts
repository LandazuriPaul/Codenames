import { MouseEvent, useState } from 'react';

export function useHover(
  initialHover = false
): [boolean, (e: MouseEvent) => void, (e: MouseEvent) => void] {
  const [isHover, setIsHover] = useState<boolean>(initialHover);

  function onEnter(): void {
    setIsHover(true);
  }

  function onLeave(): void {
    setIsHover(false);
  }
  return [isHover, onEnter, onLeave];
}
