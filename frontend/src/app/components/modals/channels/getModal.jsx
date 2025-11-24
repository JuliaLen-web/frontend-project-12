import Add from './AddChannelModal.jsx';
import Remove from './RemoveChannelModal.jsx';
import Rename from './RenameChannelModal.jsx';

const modals = {
  adding: Add,
  removing: Remove,
  renaming: Rename,
};

export default (modalName) => modals[modalName];
