
import "@/styles/globals.css";
import Layout from './compernent/Layout';
import { NotificationProvider } from './notificationcontext';
import Notifications from './component/notification';

export default function App({ Component, pageProps }) {

 return (
  <NotificationProvider>
  <Layout>
    <Notifications/>
    <Component {...pageProps} />
  </Layout>
</NotificationProvider>
 );
}
