//
// Overwriting the theme file to activate components
//

// Import the Bootstrap components we want to use.
// See https://github.com/twbs/bootstrap/blob/main/js/index.umd.js
// eslint-disable-next-line import/no-absolute-path
import Tab from '/js/bootstrap/src/tab'
// eslint-disable-next-line import/no-absolute-path
import Dropdown from '/js/bootstrap/src/dropdown'
// eslint-disable-next-line import/no-absolute-path
import Collapse from '/js/bootstrap/src/collapse'

export default {
  Tab,
  Dropdown,
  Collapse
}
