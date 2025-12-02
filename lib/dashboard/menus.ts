export type DashboardMenu = {
  label: string;
  href: string;
};

export const DASHBOARD_MENUS: DashboardMenu[] = [
  {
    label: "Quiz",
    href: "/dashboard/quiz",
  },
  {
    label: "History",
    href: "/dashboard/history",
  },
  {
    label: "Literasi",
    href: "/dashboard/literasi",
  },
];
