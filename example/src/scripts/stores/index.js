import Aux from '../../../../aux';
const name = 'primary';
const Store = Aux.createStore(name);
const defaultEvent = 'CHANGE';

const storeMethods = {
  posts: {
    retrieve: (payload) => {
      Store.set('posts', payload);
      Store.send(defaultEvent);
    }
  }
};

Store.addPrivateMethods(storeMethods);
export default Store;
