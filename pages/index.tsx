import Banner from "../components/Banner";
import Filter from "../components/Filter";
import Footer from "../components/Footer";
import Modal from "../components/Modal";
import Navbar from "../components/Navbar";
import Spinner from "../components/Spinner";
import {
  IEvent,
  IFilter,
  IEventsResponse,
  ILastUpdatedResponse,
} from "../types";

import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import dynamic from "next/dynamic";
import Head from "next/head";
import qs from "qs";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useLocalStorage } from "usehooks-ts";

import type { NextPage } from "next";
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
  const [firstVisit, setFirstVisit] = useLocalStorage("first_visit", true);
  const [isFirstVisit, setIsFirstVisit] = useState(false);
  useEffect(() => {
    setIsFirstVisit(firstVisit);
  }, [firstVisit]);
  const eventsQuery = useQuery(
    ["events", tab, filter],
    () =>
      axios
        .get<IEventsResponse>("/api/events", {
          params: {
            type: tab,
            ...filter,
          },
          paramsSerializer: (params) =>
            qs.stringify(params, { arrayFormat: "repeat" }),
        })
        .then((r) => r.data.events),
    {
      refetchOnMount: false,
      refetchOnReconnect: false,
      refetchOnWindowFocus: false,
    }
  );
  const lastUpdatedQuery = useQuery(
    ["last_updated"],
    () =>
      axios
        .get<ILastUpdatedResponse>("/api/last_updated")
        .then((r) => r.data.lastUpdated),
    {
      refetchOnMount: false,
      refetchOnReconnect: false,
      refetchOnWindowFocus: false,
    }
  );
  const { t } = useTranslation();
  const navigation = [
    { name: t("PWCS"), id: 0 },
    { name: t("Store Championship"), id: 2 },
  ];

  return (
    <div className="min-h-full">
      <Head>
        <title>{t("MTG-JP Event Calendar")}</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      {isFirstVisit && <Banner />}
      <Navbar
        tab={tab}
        setTab={setTab}
        setOpenFilter={setOpenFilter}
        navigation={navigation}
        isFirstVisit={isFirstVisit}
      />
      <header className="bg-white shadow">
        <div className="mx-auto max-w-7xl py-4 px-4 sm:py-6 sm:px-6 lg:px-8 flex justify-between">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">
            {navigation.find((n) => n.id === tab)?.name}
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
            <p className="text-gray-900 mt-2 mb-4">
              ※{" "}
              {t(
                "Before attending, please contact tournament organizers to verify event details and reservation methods."
              )}
            </p>
            <p className="text-gray-900">
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
      <Footer />
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
        setFirstVisit={setFirstVisit}
      />
    </div>
  );
};

export default Home;
