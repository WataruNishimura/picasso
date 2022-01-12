import "./scss/admin.scss"

import { render } from "@wordpress/element"

const GeneralPage = () => {
  return (
    <div className="wrap">
      <h1>オプション設定</h1>
    </div>
  )
}

render(<GeneralPage/>, document.getElementById("picasso-general-page"))