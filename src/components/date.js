import { parseISO, format } from 'date-fns'

export default function Date({ dateString, formatDate }) {
  const date = parseISO(dateString)
  return <time dateTime={dateString}>{format(date, formatDate || 'yyyy-MM-dd')}</time>
}
