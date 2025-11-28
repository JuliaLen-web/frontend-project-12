import Layout from '../../components/Layout';
import ChannelsSidebar from './channels/ChannelsSidebar';
import MessageBox from './messages/MessageBox';

const ChatPage = () => (
  <Layout>
    <div className="container h-100 my-4 overflow-hidden rounded shadow">
      <div className="row h-100 bg-white position-relative">
        <ChannelsSidebar />
        <MessageBox />
      </div>
    </div>
  </Layout>
);

export default ChatPage;
