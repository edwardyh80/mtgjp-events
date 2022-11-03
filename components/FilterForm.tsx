import { prefCat, prefDict, formatDict, formatColorDict } from "../dict";
import { IFilterForm } from "../types";

import { Disclosure } from "@headlessui/react";
import { MinusIcon, PlusIcon } from "@heroicons/react/20/solid";
import { Dispatch, FC, SetStateAction } from "react";
import { useTranslation } from "react-i18next";

const filters: { id: string; name: string; sections: [string, number[]][] }[] =
  [
    { id: "prefecture", name: "Prefecture", sections: Object.entries(prefCat) },
    {
      id: "format",
      name: "Format",
      sections: [["default", Object.keys(formatDict).map((n) => Number(n))]],
    },
  ];

const FilterForm: FC<{
  filterForm: IFilterForm;
  setFilterForm: Dispatch<SetStateAction<IFilterForm>>;
}> = ({ filterForm, setFilterForm }) => {
  const { t } = useTranslation();

  return (
    <form>
      {filters.map((filter) => (
        <Disclosure
          as="div"
          key={filter.id}
          className="border-b border-gray-200 py-6"
        >
          {({ open }) => (
            <>
              <h3 className="-my-3 flow-root">
                <Disclosure.Button className="flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500">
                  <div className="flex flex-col items-start">
                    <div className="font-medium text-gray-900">
                      {t(filter.name)}
                    </div>
                    <div className="flex flex-wrap space-x-1">
                      {Object.entries(
                        filterForm[filter.id as keyof typeof filterForm]
                      )
                        .filter((n) => n[1])
                        .map((n) => (
                          <div
                            key={n[0]}
                            className="flex justify-center items-center my-1 font-medium py-1 px-2 bg-gray-100 rounded-full text-gray-700 border border-gray-300"
                          >
                            <div className="text-xs font-normal leading-none max-w-full flex-initial">
                              {t(
                                filter.id === "prefecture"
                                  ? prefDict[
                                      Number(n[0]) as keyof typeof prefDict
                                    ]
                                  : formatDict[
                                      Number(n[0]) as keyof typeof formatDict
                                    ]
                              )}
                            </div>
                          </div>
                        ))}
                    </div>
                  </div>
                  <span className="ml-6 flex items-center">
                    {open ? (
                      <MinusIcon className="h-5 w-5" />
                    ) : (
                      <PlusIcon className="h-5 w-5" />
                    )}
                  </span>
                </Disclosure.Button>
              </h3>
              <Disclosure.Panel className="pt-6">
                {filter.sections.map((section) => (
                  <div key={section[0]}>
                    {filter.id === "prefecture" && (
                      <span className="text-sm font-medium text-gray-700">
                        {t(section[0])}
                      </span>
                    )}
                    <div className="flex flex-wrap my-2 gap-y-2">
                      {section[1].map((item) => (
                        <div
                          key={`filter-${filter.id}-${item}`}
                          className={`flex items-center ${
                            filter.id === "format" ? "basis-1/2" : "basis-1/3"
                          }`}
                        >
                          <input
                            id={`filter-${filter.id}-${item}`}
                            name={`filter-${filter.id}-${item}`}
                            defaultValue={item}
                            type="checkbox"
                            checked={
                              filterForm[filter.id as keyof typeof filterForm][
                                item
                              ]
                            }
                            onChange={(e) =>
                              setFilterForm((filterForm) => ({
                                ...filterForm,
                                [filter.id]: {
                                  ...filterForm[
                                    filter.id as keyof typeof filterForm
                                  ],
                                  [e.target.value]: e.target.checked,
                                },
                              }))
                            }
                            disabled={
                              filter.id === "prefecture" &&
                              !filterForm[filter.id as keyof typeof filterForm][
                                item
                              ] &&
                              Object.values(
                                filterForm[filter.id as keyof typeof filterForm]
                              ).filter((n) => n === true).length >= 5
                            }
                            className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 disabled:opacity-25 disabled:cursor-not-allowed"
                          />
                          <label
                            htmlFor={`filter-${filter.id}-${item}`}
                            className="ml-3 text-sm text-gray-500"
                          >
                            {filter.id === "format" && (
                              <span
                                style={{
                                  marginRight: 8,
                                  boxSizing: "content-box",
                                  width: 0,
                                  height: 0,
                                  border: `2px solid ${
                                    formatColorDict[
                                      item as keyof typeof formatColorDict
                                    ]
                                  }`,
                                  borderRadius: 2,
                                }}
                              />
                            )}
                            {t(
                              filter.id === "prefecture"
                                ? prefDict[item as keyof typeof prefDict]
                                : formatDict[item as keyof typeof formatDict]
                            )}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>
      ))}
    </form>
  );
};

export default FilterForm;
