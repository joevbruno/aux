import Aux from '../../../../aux';

const API = {
  init: () => {
    return Aux.actions.retrieve().retrievePostsBlog();
  }
};

export default API;

