import Layout from '../../components/Layout';
import ChannelsSidebar from './ChannelsSidebar';
import MessageBox from './MessageBox';

const ChatPage = () => (
  <Layout>
    <div className="container h-100 my-4 overflow-hidden rounded shadow">
      <div className="row h-100 bg-white flex-md-row">
        <ChannelsSidebar />
        <MessageBox />
      </div>
    </div>
  </Layout>
);

export default ChatPage;
