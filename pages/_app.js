
import "@/styles/globals.css";
import Layout from './compernent/Layout';
import { NotificationProvider } from './notificationcontext';
import Notifications from './component/notification';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export default function App({ Component, pageProps }) {

 return (
  <NotificationProvider>
  <Layout>
    <Notifications/>
    <Component {...pageProps} />
    <ToastContainer position="bottom-left" autoClose={5000} />
  </Layout>
</NotificationProvider>
 );
}
