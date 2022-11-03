import { MegaphoneIcon } from "@heroicons/react/24/outline";
import { useTranslation } from "react-i18next";

const Banner = () => {
  const { t } = useTranslation();

  return (
    <div className="bg-indigo-600">
      <div className="mx-auto max-w-7xl py-3 px-3 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-center justify-between">
          <div className="flex w-0 flex-1 items-center">
            <span className="flex rounded-lg bg-indigo-800 p-2">
              <MegaphoneIcon className="h-6 w-6 text-white" />
            </span>
            <p className="ml-3 truncate font-medium text-white">
              <span className="lg:hidden">
                {t("Please change filter settings.")}
              </span>
              <span className="hidden lg:inline">
                {t(
                  "Welcome to MTG Event Calendar! Please change filter settings."
                )}
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
