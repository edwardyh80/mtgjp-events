import { formatColorDict } from "../dict";
import { IEvent } from "../types";

import FullCalendar from "@fullcalendar/react"; // eslint-disable-line
import jaLocale from "@fullcalendar/core/locales/ja";
import dayGridPlugin from "@fullcalendar/daygrid";
import listPlugin from "@fullcalendar/list";
import { Dispatch, FC, SetStateAction, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { useWindowSize } from "usehooks-ts";

const Calendar: FC<{
  data: IEvent[];
  setOpenModal: Dispatch<SetStateAction<boolean>>;
  setModalContent: Dispatch<SetStateAction<IEvent | undefined>>;
}> = ({ data, setOpenModal, setModalContent }) => {
  const { i18n } = useTranslation();
  const isJa = i18n.language === "ja";
  const { width } = useWindowSize();
  const calendarRef = useRef<InstanceType<typeof FullCalendar>>(null);
  useEffect(() => {
    const calendarDom = calendarRef.current;
    const API = calendarDom?.getApi();
    API && API.changeView(width > 1024 ? "dayGridMonth" : "listMonth");
  }, [width]);

  return (
    <FullCalendar
      plugins={[dayGridPlugin, listPlugin]}
      initialView="dayGridMonth"
      locales={[jaLocale]}
      locale={isJa ? "ja" : "en"}
      events={data.map((e) => ({
        title: e.store,
        start: e.time,
        color: formatColorDict[e.format as keyof typeof formatColorDict],
        extendedProps: {
          ...e,
        },
      }))}
      eventClick={(i) => {
        setOpenModal(true);
        setModalContent(i.event.extendedProps as IEvent);
      }}
      titleFormat={{ year: "numeric", month: "short" }}
      ref={calendarRef}
    />
  );
};

export default Calendar;
