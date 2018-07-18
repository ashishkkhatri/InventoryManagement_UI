/**
 *
 * Asynchronously loads the component for ListInventory
 *
 */

import Loadable from 'react-loadable';

export default Loadable({
  loader: () => import('./index'),
  loading: () => null,
});
