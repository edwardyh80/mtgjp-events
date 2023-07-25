import FilterForm from "./FilterForm";

import { prefDict, formatDict } from "../dict";
import { IFilter, IFilterForm } from "../types";

import { Dialog, Transition } from "@headlessui/react";
import { Dispatch, FC, Fragment, SetStateAction, useState } from "react";
import { useTranslation } from "react-i18next";

type numBoolDict = { [k: number]: boolean };
const [initPrefDictForm, initFormatDictForm] = [prefDict, formatDict].map((d) =>
  Object.keys(d)
    .map((n) => Number(n))
    .reduce((acc, n) => {
      acc[n] = false;
      return acc;
    }, {} as numBoolDict)
);

const Filter: FC<{
  openFilter: boolean;
  setOpenFilter: Dispatch<SetStateAction<boolean>>;
  filter: IFilter;
  setFilter: Dispatch<SetStateAction<IFilter>>;
  setFirstVisit: Dispatch<SetStateAction<boolean>>;
}> = ({ openFilter, setOpenFilter, filter, setFilter, setFirstVisit }) => {
  const { t } = useTranslation();
  const initFilterForm: IFilterForm = {
    prefecture: filter.prefecture.reduce((acc, n) => {
      acc[n] = true;
      return acc;
    }, initPrefDictForm),
    format: filter.format.reduce((acc, n) => {
      acc[n] = true;
      return acc;
    }, initFormatDictForm),
  };
  const [filterForm, setFilterForm] = useState(initFilterForm);
  const applyFilter = () => {
    setFirstVisit(false);
    setFilter({
      prefecture: Object.entries(filterForm.prefecture)
        .filter((n) => n[1] === true)
        .map((n) => Number(n[0])),
      format: Object.entries(filterForm.format)
        .filter((n) => n[1] === true)
        .map((n) => Number(n[0])),
    });
  };

  return (
    <Transition.Root show={openFilter} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
        onClose={() => {
          setOpenFilter(false);
          applyFilter();
        }}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>
        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative my-8 w-full max-w-lg transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all">
                <div className="bg-white">
                  <div className="px-4 py-4 sm:px-6">
                    <Dialog.Title
                      as="h3"
                      className="text-lg font-medium leading-6 text-gray-900"
                    >
                      {t("Filter")}
                    </Dialog.Title>
                  </div>
                  <div className="border-t border-gray-200">
                    <div className="px-4 sm:px-6">
                      <FilterForm
                        filterForm={filterForm}
                        setFilterForm={setFilterForm}
                      />
                    </div>
                  </div>
                </div>
                <div className="bg-white px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                  <button
                    type="button"
                    className="inline-flex w-full justify-center rounded-md border border-transparent bg-gray-800 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm"
                    onClick={() => {
                      setOpenFilter(false);
                      applyFilter();
                    }}
                  >
                    {t("Apply")}
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default Filter;
