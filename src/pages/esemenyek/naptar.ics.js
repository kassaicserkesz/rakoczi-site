import { getAllEvents, feedIcs } from '../../lib/events.js';
export async function GET() {
  return new Response(feedIcs(await getAllEvents()), { headers: { 'Content-Type': 'text/calendar; charset=utf-8' } });
}
