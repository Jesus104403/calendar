

export const CalendarEvent = ({ event }) => {

    
    const { amount, user,notes } = event;

   

    return (
        <>
            <strong>{ amount  }</strong>
            <span>  { notes }</span>
        </>
    )
}
