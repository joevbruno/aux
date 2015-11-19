import mixin from 'mixin-decorator';
import Aux from '../../../../aux';

export default function observe(stores) {
  const listenToStores = {
    componentDidMount() {
      Aux.Stores.listen(stores, this.onChange);
    }
  };

  const unlistenToStores = {
    componentWillUnMount() {
      Aux.Stores.unlisten(stores, this.onChange);
    }
  };

  return mixin(listenToStores, unlistenToStores);
}
