import type { NextPage } from "next";
import Head from "next/head";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useQuery } from "@tanstack/react-query";
import { useLocalStorage } from "usehooks-ts";
import axios from "axios";
import qs from "qs";
import { BsGithub, BsTwitter } from "react-icons/bs";
import { SiVercel } from "react-icons/si";

import { IEvent, IFilter, IResponse } from "../types";
import Filter from "../components/Filter";
import Modal from "../components/Modal";
import Navbar from "../components/Navbar";
import Spinner from "../components/Spinner";

import dynamic from "next/dynamic";
const Calendar = dynamic(() => import("../components/Calendar"), {
  ssr: false,
});

const Home: NextPage = () => {
  const [openModal, setOpenModal] = useState(false);
  const [openFilter, setOpenFilter] = useState(false);
  const [modalContent, setModalContent] = useState<IEvent | undefined>(
    undefined
  );
  const [tab, setTab] = useState(0);
  const [filter, setFilter] = useLocalStorage<IFilter>("event_filter", {
    prefecture: [13, 14],
    format: [1],
  });
  const eventsQuery = useQuery(
    ["events", tab, filter],
    () =>
      axios
        .get<IResponse>("/api/events", {
          params: {
            type: tab,
            ...filter,
          },
          paramsSerializer: (params) =>
            qs.stringify(params, { arrayFormat: "repeat" }),
        })
        .then((r) => r.data.documents),
    {
      refetchOnMount: false,
      refetchOnReconnect: false,
      refetchOnWindowFocus: false,
    }
  );
  const lastUpdatedQuery = useQuery(
    ["last_updated"],
    () => axios.get("/api/last_updated").then((r) => r.data.documents[0]),
    {
      refetchOnMount: false,
      refetchOnReconnect: false,
      refetchOnWindowFocus: false,
    }
  );
  const { t } = useTranslation();
  const navigation = [
    { name: t("PWCS") },
    { name: t("Game Day") },
    { name: t("Store Championship") },
  ];

  return (
    <div className="min-h-full">
      <Head>
        <title>{t("MTG-JP Event Calendar")}</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Navbar
        tab={tab}
        setTab={setTab}
        setOpenFilter={setOpenFilter}
        navigation={navigation}
      />
      <header className="bg-white shadow">
        <div className="mx-auto max-w-7xl py-4 px-4 sm:px-6 lg:px-8 flex justify-between">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">
            {navigation[tab].name}
          </h1>
          {eventsQuery.isFetching && <Spinner />}
        </div>
      </header>
      <main>
        <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
          <div className="px-4 sm:px-0">
            <Calendar
              data={eventsQuery.data ?? []}
              setOpenModal={setOpenModal}
              setModalContent={setModalContent}
            />
            <p className="text-gray-900 mt-2">
              {t("Last updated")}:{" "}
              {lastUpdatedQuery.data?.time &&
                new Date(lastUpdatedQuery.data?.time).toLocaleString()}
            </p>
            <p className="text-gray-900">
              {t("Event count")}: {lastUpdatedQuery.data?.event_count}
            </p>
          </div>
        </div>
      </main>
      <footer className="text-sm leading-6 mt-16">
        <div className="mx-auto max-w-7xl pt-6 py-24 px-4 sm:px-6 lg:px-8 border-t border-slate-200 sm:flex justify-between text-slate-500 dark:border-slate-200/5">
          <div className="mb-6 sm:mb-0 sm:flex">
            <p>
              Powered by <SiVercel className="inline h-4 w-4" />
            </p>
            <p className="sm:ml-4 sm:pl-4 sm:border-l sm:border-slate-200 dark:sm:border-slate-200/5">
              Made with ❤️ by{" "}
              <a
                className="hover:text-slate-900 dark:hover:text-slate-400"
                href="https://twitter.com/asuka_mtg"
                target="_blank"
                rel="noreferrer"
              >
                @asuka_mtg
              </a>
            </p>
          </div>
          <div className="flex space-x-4 text-slate-400 dark:text-slate-500">
            <a
              className="hover:text-slate-500 dark:hover:text-slate-400 p-1"
              href="https://github.com/edwardyh80/mtgjp-events"
              target="_blank"
              rel="noreferrer"
            >
              <BsGithub className="h-6 w-6" />
            </a>
            <a
              className="hover:text-slate-500 dark:hover:text-slate-400 p-1"
              href="https://twitter.com/asuka_mtg"
              target="_blank"
              rel="noreferrer"
            >
              <BsTwitter className="h-6 w-6" />
            </a>
          </div>
        </div>
      </footer>
      {modalContent && (
        <Modal
          openModal={openModal}
          setOpenModal={setOpenModal}
          modalContent={modalContent}
        />
      )}
      <Filter
        openFilter={openFilter}
        setOpenFilter={setOpenFilter}
        filter={filter}
        setFilter={setFilter}
      />
    </div>
  );
};

export default Home;
