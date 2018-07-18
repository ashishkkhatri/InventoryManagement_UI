/**
 *
 * Asynchronously loads the component for AddInventory
 *
 */

import Loadable from 'react-loadable';

export default Loadable({
  loader: () => import('./index'),
  loading: () => null,
});
