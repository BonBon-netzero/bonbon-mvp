import { DATE_FORMAT, DAYJS_FULL_DATE_FORMAT } from "@/utils/config";
import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
import isoWeek from "dayjs/plugin/isoWeek";
import relativeTime from "dayjs/plugin/relativeTime";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";
import weekOfYear from "dayjs/plugin/weekOfYear";
dayjs.extend(relativeTime);
dayjs.extend(utc);
dayjs.extend(weekOfYear);
dayjs.extend(isoWeek);
dayjs.extend(duration);
dayjs.extend(timezone);
export function formatNumber(
  num?: number | string,
  maxDigit = 2,
  minDigit?: number
) {
  if (num == null) return "--";
  if (typeof num === "string") num = Number(num);
  if (
    (Math.abs(num) !== 0 && Math.abs(num) < 1 && maxDigit === 0) ||
    (Math.abs(num) < 0.1 && maxDigit === 1)
  ) {
    maxDigit = 2;
    minDigit = 2;
  }
  if (Math.abs(num) < 0.01 && (maxDigit === 2 || maxDigit === 1)) {
    maxDigit = 5;
  }
  // if (num > 1000000000) return t`${(num / 1000000000).toFixed(0)} tỷ`
  return `${num.toLocaleString("en-US", { minimumFractionDigits: minDigit, maximumFractionDigits: maxDigit })}`;
}

export function formatDuration(durationInSecond: number | undefined) {
  if (!durationInSecond) return "--";
  if (durationInSecond < 60) return `${formatNumber(durationInSecond, 0, 0)}s`;
  if (durationInSecond < 3600)
    return `${formatNumber(durationInSecond / 60, 1, 1)}m`;
  return `${formatNumber(durationInSecond / (60 * 60), 1, 1)}h`;
}

export const formatLocalRelativeDate = (date: string | number) =>
  dayjs.utc(date).local().fromNow();
export const formatLocalRelativeShortDate = (date: string | number) => {
  const arr = dayjs.utc(date).local().fromNow(true).split(" ");
  return `${arr[0] === "a" || arr[0] === "an" ? "1" : arr[0]}${arr[1].includes("month") ? "mo" : arr[1]?.charAt(0)}`;
};

export const formatRelativeDate = (date: string | number) =>
  dayjs.utc(date).fromNow();
export const formatRelativeShortDate = (date: string | number) => {
  const arr = dayjs.utc(date).fromNow(true).split(" ");
  return `${arr[0]}${arr[1]?.charAt(0)}`;
};

export const formatLocalDate = (
  date: string | number | undefined,
  format?: string
) => {
  if (!date) return "";

  return dayjs
    .utc(date)
    .local()
    .format(format ?? DATE_FORMAT);
};

export const formatDate = (
  date: string | number | undefined,
  format?: string
) => {
  if (!date) return "";

  return dayjs.utc(date).format(format ?? DAYJS_FULL_DATE_FORMAT);
};
