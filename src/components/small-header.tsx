import { useRef, useEffect, useState } from "react";
import SideMenu from "./side-menu";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [menuOpen]);

  return (
    <header>
      <nav className="flex h-[64px] w-full flex-shrink-0 items-start gap-6 px-6 text-white">
        <a
          href=""
          className="z-100 flex flex-1 flex-col items-start justify-center gap-[10px] self-stretch"
        >
          <img
            src="whitesmall.png"
            alt="Logo"
            className="flex w-6 h-5 items-center justify-center"
          />
        </a>
        <button
          className="z-100 flex flex-1 flex-col items-end justify-center gap-[10px] self-stretch"
          onClick={toggleMenu}
        >
          {menuOpen ? "CLOSE" : "MENU"}
        </button>
      </nav>
      <SideMenu open={menuOpen} onClose={toggleMenu} />
    </header>
  );
}

// import { useRef, useEffect, useState } from "react";
// import SideMenu from "./side-menu";

// export default function Header({
//   onLinkWidth,
// }: {
//   onLinkWidth?: (w: number) => void;
// }) {
//   const [menuOpen, setMenuOpen] = useState(false);
//   const elementRef = useRef<HTMLAnchorElement>(null);

//   const toggleMenu = () => {
//     setMenuOpen(!menuOpen);
//   };

//   useEffect(() => {
//     const updateWidth = () => {
//       if (elementRef.current && onLinkWidth) {
//         onLinkWidth(elementRef.current.offsetWidth);
//       }
//     };

//     updateWidth(); // initial call
//     window.addEventListener("resize", updateWidth);
//     return () => window.removeEventListener("resize", updateWidth);
//   }, [onLinkWidth]);

//   useEffect(() => {
//     if (menuOpen) {
//       document.body.style.overflow = "hidden";
//     } else {
//       document.body.style.overflow = "auto";
//     }
//   }, [menuOpen]);

//   return (
//     <header>
//       <nav className="flex h-[64px] w-full flex-shrink-0 items-start gap-6 px-6">
//         <a
//           href=""
//           className="z-100 flex flex-1 flex-col items-start justify-center gap-[10px] self-stretch"
//           ref={elementRef}
//         >
//           <img
//             src="whitefull.png"
//             alt="Logo"
//             className="flex h-auto w-[109px] items-center justify-center"
//           />
//         </a>
//         <button
//           className="z-100 flex flex-1 flex-col items-end justify-center gap-[10px] self-stretch"
//           onClick={toggleMenu}
//         >
//           {menuOpen ? "CLOSE" : "MENU"}
//         </button>
//       </nav>
//       <SideMenu open={menuOpen} onClose={toggleMenu} />
//     </header>
//   );
// }
