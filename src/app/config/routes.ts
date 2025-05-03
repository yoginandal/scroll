export interface Route {
  href: string;
  label: string;
  sectionId: string;
}

export const routes: Route[] = [
  {
    href: "/",
    label: "Home",
    sectionId: "home",
  },
  {
    href: "/about",
    label: "About",
    sectionId: "about",
  },
  {
    href: "/services",
    label: "Services",
    sectionId: "services",
  },
  {
    href: "/contact",
    label: "Contact",
    sectionId: "contact",
  },
];
