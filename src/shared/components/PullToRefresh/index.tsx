// import React, { useState, useEffect, useRef } from 'react';
// import classNames from 'classnames';
// import Button from '../Button';

// export default function PullToRefresh() {
//   const positionRef = useRef({
//     start: { x: 0, y: 0 }, stop: { x: 0, y: 0 }
//   });
//   const [isShown, setIsShown] = useState(false);

//   useEffect(() => {
//     function swipeStart(evt) {
//       if (typeof evt['targetTouches'] !== 'undefined') {
//         const touch = evt.targetTouches[0];
//         positionRef.current.start.x = touch.screenX;
//         positionRef.current.start.y = touch.screenY;
//       } else {
//         positionRef.current.start.x = evt.screenX;
//         positionRef.current.start.y = evt.screenY;
//       }
//     }

//     function swipeEnd(evt) {
//       if (typeof evt['changedTouches'] !== 'undefined') {
//         const touch = evt.changedTouches[0];
//         positionRef.current.stop.x = touch.screenX;
//         positionRef.current.stop.y = touch.screenY;
//       } else {
//         positionRef.current.stop.x = evt.screenX;
//         positionRef.current.stop.y = evt.screenY;
//       }

//       swipeCheck();
//     }

//     function swipeCheck() {
//       const changeY = positionRef.current.start.y - positionRef.current.stop.y;
//       const changeX = positionRef.current.start.x - positionRef.current.stop.x;

//       if (isPullDown(changeY, changeX)) {
//         setIsShown(true);
//       }
//     }

//     function isPullDown(dY: number, dX: number) {
//       // methods of checking slope, length, direction of line created by swipe action
//       return (
//         dY < 0 &&
//         ((Math.abs(dX) <= 100 && Math.abs(dY) >= 300) ||
//           (Math.abs(dX) / Math.abs(dY) <= 0.3 && dY >= 60))
//       );
//     }

//     document.addEventListener('touchstart', swipeStart, false);
//     document.addEventListener('touchend', swipeEnd, false);

//     return () => {
//       document.removeEventListener('touchstart', swipeStart);
//       document.removeEventListener('touchend', swipeEnd);
//     };
//   }, []);

//   const className = classNames(
//     isShown ? '' : 'hidden',
//     'flex items-center justify-between bg-ice py-6 px-2 text-gray-900',
//   );

//   return (
//     <div role="alert" className={className} >
//       <span className="text-lg">
//         <span
//           role="img"
//           className="pr-1"
//           aria-label="refresh icon (two arrows heading opposite directions)"
//         >
//           🔄
//         </span>
//         Refresh Page?
//       </span>
//       <div>
//         <Button
//           color="blue"
//           text="Yes"
//           onClick={() => window.location.reload()}
//           className="py-px px-3 mr-3"
//         />
//         <Button
//           color="white"
//           text="Cancel"
//           onClick={() => setIsShown(false)}
//           className="p-1 text-gray-800 font-light underline"
//         />
//       </div>
//     </div>
//   );
// }
