


export const convertEventsToDateEvents = ( events = [] ) => {
  
    return events.map( event => {

        event.end = event.end.toDate();
       
        event.start = event.start.toDate();

      



        return event;

    })


}
