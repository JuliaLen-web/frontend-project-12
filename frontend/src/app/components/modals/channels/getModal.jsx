import Add from './addChannelModal.jsx';
import Remove from './removeChannelModal.jsx';
import Rename from './renameChannelModal.jsx';

const modals = {
  adding: Add,
  removing: Remove,
  renaming: Rename,
};

export default (modalName) => modals[modalName];
