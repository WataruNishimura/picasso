import "./scss/admin.scss"

import { render } from "@wordpress/element"

import {
  ToggleControl,
  TextControl,
  RangeControl
} from "@wordpress/components"

const GeneralPage = () => {
  return (
    <div className="wrap">
      <h1>基本設定</h1>
      <ToggleControl
        label="広告を表示する"
      />
    </div>
  )
}

render(<GeneralPage/>, document.getElementById("picasso-general-page"))