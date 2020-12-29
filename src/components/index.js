import tabBar from './tabBar'
import wadTag from './wadTag'
import navBar from './navBar'
import empty from './empty'
import navSearchBar from './navSearchBar'
import cell from './cell'
import numInput from './numInput'

const components = {
  tabBar,
  wadTag,
  navBar,
  navSearchBar,
  empty,
  cell,
  numInput,
}

components.install = function (Vue) {
  Object.keys(components).forEach(key => {
    key !== 'install' && Vue.component(components[key].name, components[key])
  })
}

export default components

export {
  tabBar,
  wadTag,
  navBar,
  navSearchBar,
  empty,
  cell,
  numInput,
}
