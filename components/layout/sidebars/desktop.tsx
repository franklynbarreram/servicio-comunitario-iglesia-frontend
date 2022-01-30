import React, { Fragment } from "react";
import clsx from "clsx";
import Link from "next/link";
import { Typography } from "components/common/typography";
import { useRouter } from "next/router";
import { navigation as menu } from "consts/navigation";
import { Icons } from "consts/icons";
import { signOut } from "next-auth/client";
import { Images } from "consts";
// import { appRouter } from "consts/router";
import { Icon } from "components/icon";

interface LayoutDashboardProps {}
export const SidebarDesktop: React.FC<LayoutDashboardProps> = () => {
  const [navigation, setNavigation] = React.useState(menu);
  const [updateShowSubMenu, setUpdateShowSubMenu] = React.useState(false);

  React.useEffect(() => {
    if (updateShowSubMenu) {
      // setNavigation()
      setUpdateShowSubMenu(false);
    }
  }, [updateShowSubMenu]);

  const showSubmenu = (item: any, positionMenu: any, positionSubMenu: any) => {
    let auxMenu = navigation;

    auxMenu[positionMenu].subNavigation[positionSubMenu].dropdownVisible =
      !auxMenu[positionMenu].subNavigation[positionSubMenu].dropdownVisible;

    console.log("sin: ", auxMenu);
    console.log("con: ", [...auxMenu]);

    return [...auxMenu];
  };
  return (
    <>
      {/*  Sidebar desktop */}
      <div className="hidden md:flex md:flex-shrink-0 bg-primary">
        <div className="flex flex-col flex-auto">
          {/* Sidebar component, swap this element with another sidebar if you like */}
          <div className="flex flex-col h-0 flex-1">
            <div className="flex-1 flex flex-col pt-8 pb-4 overflow-y-auto scroll-custom">
              <div className="flex items-center flex-shrink-0 px-7 justify-center">
                <Link href="/">
                  <a
                    className={clsx(
                      "cursor-pointer flex items-center justify-center"
                    )}
                  >
                    <img
                      className="max-w-[184px]"
                      src={Images.logoWithColor}
                      alt=""
                    />
                  </a>
                </Link>
              </div>
              <nav className="mt-5 flex-1 px-7">
                {navigation.map((item, positionMenu) => {
                  const router = useRouter();
                  return (
                    <Fragment key={"nav-desktop-" + item.id}>
                      <p className="text-white f-18 font-semibold px-3 pt-7">
                        {item.label}
                      </p>
                      {item?.subNavigation?.map((subItem, positionSubMenu) => {
                        // const active = router.pathname === subItem.href;
                        return (
                          <Fragment key={subItem.name}>
                            {subItem.dropdown ? (
                              <div
                                className={clsx(
                                  router.pathname.includes(subItem.href)
                                    ? "bg-active text-white font-bold opacity-100 "
                                    : "text-white hover:bg-active font-light  opacity-70",
                                  "group flex items-center px-3 pt-7 hover:opacity-90 text-base rounded-md f-18 cursor-pointer"
                                )}
                                // onClick={() =>
                                // 	showSubmenu(
                                // 		subItem,
                                // 		positionMenu,
                                // 		positionSubMenu
                                // 	)
                                // }
                                onClick={() =>
                                  setNavigation(
                                    showSubmenu(
                                      subItem,
                                      positionMenu,
                                      positionSubMenu
                                    )
                                  )
                                }
                                // onClick={() =>
                                //   setNavigation(() => {
                                //     let aux = menu;
                                //     aux[positionMenu].subNavigation[
                                //       positionSubMenu
                                //     ].dropdownVisible =
                                //       !aux[positionMenu].subNavigation[
                                //         positionSubMenu
                                //       ].dropdownVisible;
                                //     return [...aux];
                                //   })
                                // }
                              >
                                {/* <img
                                  src={subItem.icon}
                                  className="mr-4 flex-shrink-0 h-6 w-6 text-white"
                                  aria-hidden="true"
                                /> */}
                                <Icon
                                  src={subItem.icon}
                                  fill="var(--color-white)"
                                  className="mr-4 flex-shrink-0 h-7 w-7"
                                />
                                {subItem.label}
                              </div>
                            ) : (
                              <Link key={subItem.name} href={subItem.href}>
                                <a
                                  className={clsx(
                                    router.pathname.includes(subItem.href)
                                      ? "bg-active text-white font-bold opacity-100 "
                                      : "text-white hover:bg-active font-light  opacity-70",
                                    "group flex items-center px-3 pt-7 hover:opacity-90 text-base rounded-md f-18"
                                  )}
                                >
                                  {/* <img
                                    src={subItem.icon}
                                    className="mr-4 flex-shrink-0 h-6 w-6 text-white"
                                    aria-hidden="true"
                                  /> */}
                                  <Icon
                                    src={subItem.icon}
                                    fill="var(--color-white)"
                                    className="mr-5 flex-shrink-0 h-7 w-7"
                                  />
                                  {subItem.label}
                                </a>
                              </Link>
                            )}
                            {/* {console.log(subItem)} */}

                            {subItem.dropdown &&
                              subItem.dropdownVisible &&
                              subItem.dropdown.map((dropdown) => {
                                return (
                                  <Link
                                    key={dropdown.name}
                                    href={"/dashboard" + dropdown.href}
                                  >
                                    <a
                                      className={clsx(
                                        router.pathname.includes(dropdown.href)
                                          ? "bg-active text-yellow opacity-100 "
                                          : "text-white hover:bg-active font-light  opacity-70",
                                        "group flex items-center px-3 pt-3 hover:opacity-90 text-base rounded-md f-16"
                                      )}
                                    >
                                      <div
                                        className="mr-5 flex-shrink-0 h-6 w-6 text-white"
                                        aria-hidden="true"
                                      />
                                      {dropdown.label}
                                    </a>
                                  </Link>
                                );
                              })}
                          </Fragment>
                        );
                      })}
                      <div className="divider mx-3 mt-7"></div>
                    </Fragment>
                  );
                })}
              </nav>
            </div>
            <div className="flex-shrink-0 flex border-t border-white px-7 py-4">
              <div className="flex-1 flex items-center px-3 cursor-pointer">
                <div
                  className={clsx(
                    "inline-flex items-center w-9 h-9 overflow-hidden"
                  )}
                >
                  <img
                    src={Icons.logout}
                    className="mr-4 flex-shrink-0 h-6 w-6 text-white"
                    aria-hidden="true"
                  />
                </div>
                <Typography
                  type="span"
                  className="text-white font-semibold  f-18 "
                  onClick={() => {
                    signOut();
                  }}
                >
                  Salir del sistema
                </Typography>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
