import { prefDict, formatDict, formatColorDict } from "../dict";
import { IEvent } from "../types";

import { Dialog, Transition } from "@headlessui/react";
import { Dispatch, FC, Fragment, SetStateAction } from "react";
import { useTranslation } from "react-i18next";

const Modal: FC<{
  openModal: boolean;
  setOpenModal: Dispatch<SetStateAction<boolean>>;
  modalContent: IEvent;
}> = ({ openModal, setOpenModal, modalContent }) => {
  const { t } = useTranslation();

  return (
    <Transition.Root show={openModal} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={setOpenModal}>
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
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all my-8 w-full max-w-lg">
                <div className="bg-white">
                  <div className="px-4 py-4 sm:px-6">
                    <Dialog.Title
                      as="h3"
                      className="text-lg font-medium leading-6 text-gray-900"
                    >
                      {modalContent.store}
                    </Dialog.Title>
                    <p className="mt-1 max-w-2xl text-sm text-gray-500">
                      {modalContent.name}
                    </p>
                  </div>
                  <div className="border-t border-gray-200">
                    <dl>
                      <div className="bg-gray-50 px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt className="text-sm font-medium text-gray-500">
                          {t("Time")}
                        </dt>
                        <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                          {new Date(modalContent.time).toLocaleString()}
                        </dd>
                      </div>
                      <div className="bg-white px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt className="text-sm font-medium text-gray-500">
                          {t("Prefecture")}
                        </dt>
                        <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                          {t(
                            prefDict[
                              modalContent.prefecture as keyof typeof prefDict
                            ]
                          )}
                        </dd>
                      </div>
                      <div className="bg-gray-50 px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt className="text-sm font-medium text-gray-500">
                          {t("Address")}
                        </dt>
                        <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                          <a
                            className="font-medium text-indigo-600 hover:text-indigo-500"
                            href={modalContent.map}
                            target="_blank"
                            rel="noreferrer"
                          >
                            {modalContent.address}
                          </a>
                        </dd>
                      </div>
                      <div className="bg-white px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt className="text-sm font-medium text-gray-500">
                          {t("Phone")}
                        </dt>
                        <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                          <a
                            className="font-medium text-indigo-600 hover:text-indigo-500"
                            href={`tel:${modalContent.tel}`}
                          >
                            {modalContent.tel}
                          </a>
                        </dd>
                      </div>
                      <div className="bg-gray-50 px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt className="text-sm font-medium text-gray-500">
                          {t("Format")}
                        </dt>
                        <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                          <span
                            style={{
                              marginRight: 8,
                              boxSizing: "content-box",
                              width: 0,
                              height: 0,
                              border: `2px solid ${
                                formatColorDict[
                                  modalContent.format as keyof typeof formatColorDict
                                ]
                              }`,
                              borderRadius: 2,
                            }}
                          />
                          {t(
                            formatDict[
                              modalContent.format as keyof typeof formatDict
                            ]
                          )}
                        </dd>
                      </div>
                    </dl>
                  </div>
                </div>
                <div className="bg-white px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                  <button
                    type="button"
                    className="inline-flex w-full justify-center rounded-md border border-transparent bg-gray-800 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm"
                    onClick={() => {
                      setOpenModal(false);
                      window
                        .open(
                          `https://mtg-jp.com${modalContent.link}`,
                          "_blank"
                        )
                        ?.focus();
                    }}
                  >
                    {t("More info")}
                  </button>
                  <button
                    type="button"
                    className="mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                    onClick={() => setOpenModal(false)}
                  >
                    {t("Cancel")}
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

export default Modal;
