import Container from 'react-bootstrap/Container';
import { Route } from 'wouter';
import DolarPage from './pages/DolarPage';
import { AppProvider } from './context/AppProvider';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@sweetalert2/theme-bootstrap-4/bootstrap-4.scss';

export default function App() {
  return (
    <div className="App">
      <AppProvider>
        <Container style={{ marginTop: '30px', marginBottom: '30px'}}>
          <Route path="/" component={DolarPage}/>
        </Container>
        <ToastContainer />
      </AppProvider>
    </div>
  );
}