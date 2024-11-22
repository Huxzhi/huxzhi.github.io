import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import isToday from 'dayjs/plugin/isToday';
import isYesterday from 'dayjs/plugin/isYesterday';

dayjs.extend(relativeTime);
dayjs.extend(isToday);
dayjs.extend(isYesterday);

export function formatSecond(timestamp: number) {
    const date = dayjs(timestamp);
    const today = dayjs();

    if (date.isToday()) {
        return 'Today';
    }

    if (date.isYesterday()) {
        return 'Yesterday';
    }

    const daysDiff = today.diff(date, 'day');

    if (daysDiff < 7) {
        return `${daysDiff} Days ago`;
    }

    if (today.year() === date.year()) {
        return date.format('MM/DD');
    }

    return date.format('YYYY/MM/DD');
}