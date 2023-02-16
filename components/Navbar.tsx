import { Disclosure } from "@headlessui/react";
import {
  Bars3Icon,
  FunnelIcon,
  LanguageIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { Dispatch, FC, SetStateAction } from "react";
import { useTranslation } from "react-i18next";

const classNames = (...classes: string[]) => {
  return classes.filter(Boolean).join(" ");
};

const Navbar: FC<{
  tab: number;
  setTab: Dispatch<SetStateAction<number>>;
  setOpenFilter: Dispatch<SetStateAction<boolean>>;
  navigation: { name: string; id: number }[];
  isFirstVisit: boolean;
}> = ({ tab, setTab, setOpenFilter, navigation, isFirstVisit }) => {
  const { i18n } = useTranslation();
  const isJa = i18n.language === "ja";
  const switchLanguage = () => void i18n.changeLanguage(isJa ? "en" : "ja");
  const openFilter = () => setOpenFilter(true);

  return (
    <Disclosure as="nav" className="bg-gray-800">
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex h-16 items-center justify-between">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <picture>
                    <img className="h-10 w-10" src="/mark.svg" alt="" />
                  </picture>
                </div>
                <div className="hidden md:block">
                  <div className="ml-10 flex items-baseline space-x-4">
                    {navigation.map(({ name, id }) => (
                      <a
                        key={name}
                        onClick={() => setTab(id)}
                        className={classNames(
                          tab === id
                            ? "bg-gray-900 text-white"
                            : "text-gray-300 hover:bg-gray-700 hover:text-white",
                          "px-3 py-2 rounded-md text-sm font-medium cursor-pointer"
                        )}
                      >
                        {name}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
              <div className="hidden md:block">
                <div className="ml-4 flex items-center md:ml-6 space-x-4">
                  <button
                    type="button"
                    className={
                      "rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800" +
                      (isFirstVisit ? " glow" : "")
                    }
                    onClick={openFilter}
                  >
                    <FunnelIcon className="h-6 w-6" />
                  </button>
                  <button
                    type="button"
                    className="rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                    onClick={switchLanguage}
                  >
                    <LanguageIcon className="h-6 w-6" />
                  </button>
                </div>
              </div>
              <div className="-mr-2 flex md:hidden">
                <div className="flex items-center px-4 space-x-4">
                  <button
                    type="button"
                    className={
                      "rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800" +
                      (isFirstVisit ? " glow" : "")
                    }
                    onClick={openFilter}
                  >
                    <FunnelIcon className="h-6 w-6" />
                  </button>
                  <button
                    type="button"
                    className="rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                    onClick={switchLanguage}
                  >
                    <LanguageIcon className="h-6 w-6" />
                  </button>
                </div>
                <Disclosure.Button className="inline-flex items-center justify-center rounded-md bg-gray-800 p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" />
                  )}
                </Disclosure.Button>
              </div>
            </div>
          </div>
          <Disclosure.Panel className="md:hidden">
            <div className="space-y-1 px-2 pt-2 pb-3 sm:px-3">
              {navigation.map(({ name, id }) => (
                <Disclosure.Button
                  key={name}
                  as="a"
                  onClick={() => setTab(id)}
                  className={classNames(
                    tab === id
                      ? "bg-gray-900 text-white"
                      : "text-gray-300 hover:bg-gray-700 hover:text-white",
                    "block px-3 py-2 rounded-md text-base font-medium cursor-pointer"
                  )}
                >
                  {name}
                </Disclosure.Button>
              ))}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
};

export default Navbar;
