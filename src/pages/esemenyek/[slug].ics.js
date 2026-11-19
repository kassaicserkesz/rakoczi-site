import { getAllEvents, eventIcs } from '../../lib/events.js';
export async function getStaticPaths() {
  return (await getAllEvents()).map((e) => ({ params: { slug: e.id }, props: { e } }));
}
export async function GET({ props }) {
  return new Response(eventIcs(props.e), { headers: { 'Content-Type': 'text/calendar; charset=utf-8' } });
}
