
import { Navigate, Route, Routes } from 'react-router-dom';

import { LoginPage } from '../auth';
import { CalendarPage } from '../calendar';
import { Configuracion } from '../calendar/components/Configuracion';
import { ChartPage } from '../charts/pages/ChartPage';
import { CheckingAuth } from '../ui/';
import { useCheckAuth } from '../hooks';


export const AppRouter = () => {

    const status  = useCheckAuth();

    if ( status === 'checking') {

        return <CheckingAuth />
    }

    return (
        <Routes>
             {
                ( status === 'not-authenticated')  
                    ? <Route path="/auth/*" element={ <LoginPage /> } />
                    : <Route path="/*" element={ <CalendarPage /> } />
             }

                <Route path="/chart" element={ <ChartPage /> } />
                <Route path="/config" element={ <Configuracion /> } />

                <Route path="/*" element={ <Navigate to="/auth/login" /> } />
        </Routes>
    )
}
