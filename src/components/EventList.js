// src/components/EventList.js

import Event from "./Event";

const EventList = ({ events }) => {
  return (
    <ul id="event-list">
      {events
        ? events.map((event) => {
            return <Event key={event.id} event={event} />;
          })
        : null}
    </ul>
  );
};

export default EventList;
