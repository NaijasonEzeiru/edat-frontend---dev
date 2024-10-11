import { NavLink, Outlet } from "react-router-dom";
import {
  Home,
  User,
  ListPlus,
  Menu,
  Circle,
  StickyNote,
  Users,
  LineChart,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import Header from "../others/Header";
import { useSelector } from "react-redux";
import { useGetAccountByIdQuery } from "../../features/api/apiSlice";
import { useEffect, useState } from "react";

export function StudentLayout() {
  const userInfo = useSelector((state) => state.user.userInfo);
  const { data } = useGetAccountByIdQuery(userInfo?.accountId);
  const [openNav, setOpenNav] = useState(false);
  const { role } = userInfo;
  const [menus, setMenus] = useState([
    {
      id: 1,
      name: "Dashboard",
      href: `/${role}`,
      icon: <Home className="h-4 w-4" />,
      iconMobile: <Home className="h-5 w-5" />,
    },
  ]);

  useEffect(() => {
    if (role == "student") {
      setMenus([
        {
          id: 1,
          name: "Dashboard",
          href: `/student`,
          icon: <Home className="h-4 w-4" />,
          iconMobile: <Home className="h-5 w-5" />,
        },
        {
          id: 2,
          name: "Results",
          href: `/student/result`,
          icon: <StickyNote className="h-4 w-4" />,
          iconMobile: <StickyNote className="h-5 w-5" />,
        },
        {
          id: 3,
          name: "Classrooms",
          href: `/student/classrooms`,
          icon: <Users className="h-4 w-4" />,
          iconMobile: <Users className="h-5 w-5" />,
        },
        {
          id: 4,
          name: "Profile",
          href: `/profile`,
          icon: <User className="h-4 w-4" />,
          iconMobile: <User className="h-5 w-5" />,
        },
        {
          id: 5,
          name: "Study Plan",
          href: `/recommendation`,
          icon: <ListPlus className="h-4 w-4" />,
          iconMobile: <ListPlus className="h-5 w-5" />,
        },
        {
          id: 6,
          name: "Report",
          href: `/student/report`,
          icon: <LineChart className="h-4 w-4" />,
          iconMobile: <LineChart className="h-5 w-5" />,
        },
      ]);
    }
  }, [role]);

  return (
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      <div className="hidden border-r bg-primary md:block">
        <div className="flex h-full max-h-screen flex-col gap-2 fixed text-primary-foreground w-[220px] lg:w-[280px]">
          <div className="flex h-14 items-center border-b lg:h-[60px] border-muted-foreground bg-background">
            <span className="flex px-4  lg:px-6 w-full h-full items-center gap-2 font-semibold bg-muted/40 text-foreground">
              {/* <Circle className="h-6 w-6" /> */}
              <img className="h-8" src="/school.png" />
              <span>{data?.accountName}</span>
            </span>
          </div>
          <div className="flex-1 mt-4">
            <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
              {menus.map((menu) => (
                <NavLink
                  key={menu.id}
                  to={menu.href}
                  className={({ isActive }) =>
                    `flex items-center gap-3 rounded-lg px-3 py-2 transition-all ${
                      isActive
                        ? "bg-muted text-foreground hover:bg-slate-200"
                        : "text-primary-foreground hover:bg-blue-500"
                    }`
                  }
                >
                  {menu.icon}
                  {menu.name}
                </NavLink>
              ))}
            </nav>
          </div>
          <div className="mt-auto py-7 text-sm px-5 lg:px-7">
            <span className="flex gap-2 text-xs items-center">
              <img alt="" src="/edat_logo.png" className="w-12" />
              <p>All Rights Reserved ©2024</p>
            </span>
          </div>
        </div>
      </div>
      <div className="flex flex-col">
        <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
          <Sheet open={openNav} onOpenChange={setOpenNav}>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="shrink-0 md:hidden"
              >
                <Menu className="h-5 w-5" />

                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent
              side="left"
              className="flex flex-col bg-primary text-primary-foreground"
            >
              <nav className="grid gap-2 text-lg font-medium">
                <span className="flex items-center gap-2 text-lg font-semibold">
                  <Circle className="h-6 w-6" />
                  <span className="sr-only">Institution's logo</span>
                  <span>{data?.accountName}</span>
                </span>
                {menus.map((menu, index) => (
                  <NavLink
                    end={index == 0}
                    key={menu.id}
                    to={menu.href}
                    className={({ isActive }) =>
                      `mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 mt-4 ${
                        isActive
                          ? "bg-muted text-foreground hover:bg-slate-200"
                          : "text-primary-foreground hover:bg-blue-500"
                      }`
                    }
                  >
                    {menu.iconMobile}
                    {menu.href}
                  </NavLink>
                ))}
              </nav>
              <div className="mt-auto px-3">
                <p>EDAT</p>
                <p>All Rights Reserved ©2024</p>
              </div>
            </SheetContent>
          </Sheet>
          <Header />
        </header>
        <main className="flex-1 p-4 lg:gap-6 lg:p-6 overflow-y-auto bg-[#EBF0FC]">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
