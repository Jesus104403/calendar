

export const CalendarEvent = ({ event }) => {

    
    const { amount, user } = event;

   

    return (
        <>
            <strong>{ amount  }</strong>
            <span> - { user.name }</span>
        </>
    )
}
