export interface IEvent {
  _id: string;
  time: string;
  prefecture: number;
  name: string;
  store: string;
  link: string;
  address: string;
  map: string;
  tel: string;
  format: number;
  type: number;
}

export interface ILastUpdated {
  _id: string;
  time: string;
  event_count: number;
}

export interface IEventsResponse {
  isSuccessful: boolean;
  message?: string;
  documents?: IEvent[];
}

export interface ILastUpdatedResponse {
  isSuccessful: boolean;
  message?: string;
  documents?: ILastUpdated[];
}

export interface IFilter {
  prefecture: number[];
  format: number[];
}

export interface IFilterForm {
  prefecture: { [k: number]: boolean };
  format: { [k: number]: boolean };
}
