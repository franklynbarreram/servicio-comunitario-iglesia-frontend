import { Menu, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { Typography } from "../../common/typography";
import { Icons } from "consts/icons";
import clsx from "clsx";
import Link from "next/dist/client/link";

interface DropdownProps {
  title: string;
  items: any;
  customButtonClassName?: string;
}

export const Dropdown = ({
  title,
  items,
  customButtonClassName,
}: DropdownProps) => {
  return (
    <>
      <div className="text-right">
        <Menu as="div" className="relative inline-block text-left">
          <div>
            <Menu.Button
              className={clsx(
                "inline-flex justify-center w-full px-4 py-2 text-sm font-medium text-white bg-primary focus:outline-none",
                customButtonClassName
              )}
            >
              <div
                className={clsx(
                  "flex justify-between items-center cursor-pointer gap-4"
                )}
              >
                <Typography
                  type="span"
                  className={clsx(
                    "ml-2 text-white",
                    "font-bold text-base hidden md:flex"
                  )}
                >
                  {title}
                </Typography>
                <img src={Icons.arrowDown} alt="" />
              </div>
            </Menu.Button>
          </div>
          <Transition
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Menu.Items className="absolute z-10 right-0 w-full md:mt-3 mt-2 origin-top-right bg-white divide-y divide-gray-100 shadow-lg  focus:outline-none">
              <div className="px-1 py-1">
                {items.map((item: any, index: number) => (
                  <Menu.Item key={index}>
                    {({ active }) => (
                      <button
                        onClick={item?.onClick}
                        className={`${
                          active ? "bg-transparent text-white" : "text-gray-500"
                        } group flex flex-1 rounded-md items-center w-full  py-3 justify-center text-gray-500 text-base font-normal hover:text-gray-800`}
                      >
                        {item?.href ? (
                          <Link href="/dashboard/profile">{item?.name}</Link>
                        ) : (
                          <p>{item?.name}</p>
                        )}
                      </button>
                    )}
                  </Menu.Item>
                ))}
              </div>
            </Menu.Items>
          </Transition>
        </Menu>
      </div>
    </>
  );
};
