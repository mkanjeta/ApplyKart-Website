import { constants } from "crypto";
import Pubnub from "pubnub";

export const BASE_URL =
  process.env.NODE_ENV === "production"
    ? process.env.API_URL
    : "http://localhost:3000";
export const TimeSchedule = [
  { value: "00:00", name: "00:00 AM" },
  { value: "01:00", name: "01:00 AM" },
  { value: "02:00", name: "02:00 AM" },
  { value: "03:00", name: "03:00 AM" },
  { value: "04:00", name: "04:00 AM" },
  { value: "05:00", name: "05:00 AM" },
  { value: "06:00", name: "06:00 AM" },
  { value: "07:00", name: "07:00 AM" },
  { value: "08:00", name: "08:00 AM" },
  { value: "09:00", name: "09:00 AM" },
  { value: "10:00", name: "10:00 AM" },
  { value: "11:00", name: "11:00 AM" },
  { value: "12:00", name: "12:00 PM" },
  { value: "13:00", name: "01:00 PM" },
  { value: "14:00", name: "02:00 PM" },
  { value: "15:00", name: "03:00 PM" },
  { value: "16:00", name: "04:00 PM" },
  { value: "17:00", name: "05:00 PM" },
  { value: "18:00", name: "06:00 PM" },
  { value: "19:00", name: "07:00 PM" },
  { value: "20:00", name: "08:00 PM" },
  { value: "21:00", name: "09:00 PM" },
  { value: "22:00", name: "10:00 PM" },
  { value: "23:00", name: "11:00 PM" },
];
export const WeekSchedule = [
  { value: "monday", name: "Monday", checked: false },
  { value: "tuesday", name: "Tuesday", checked: false },
  { value: "wednesday", name: "Wednesday", checked: false },
  { value: "thursday", name: "Thursday", checked: false },
  { value: "friday", name: "Friday", checked: false },
  { value: "saturday", name: "Saturday", checked: false },
  { value: "sunday", name: "Sunday", checked: false },
];
export const corruptedDateFormat = '0001-01-01T00:00:00';
export const pubNubPublishKey = "pub-c-e140b95e-a477-49e5-be94-257c26150d26";
export const pubNubSubscribeKey = "sub-c-f43927fd-4464-4a04-a43a-96d2d9db9b29";
