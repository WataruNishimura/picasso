
import "./scss/admin.scss"

import { render, useState } from "@wordpress/element"
import {
  ColorPicker
} from "@wordpress/components"

const GeneralPage = () => {
  const [textColor, setTextColor] = useState("#000000");
  const [backgroundColor, setBackgroundColor] = useState("#ffffff");
  return (
    <div className="wrap">
      <h1>基本設定</h1>
      <div>
        <h2>文字の色</h2>
        <ColorPicker label="文字の色" defaultValue="#000000" color={textColor} onChangeComplete={setTextColor}></ColorPicker>
      </div>
      <div>
        <h2>背景の色</h2>
        <ColorPicker label="背景の色" defaultValue="#ffffff" color={backgroundColor} onChangeComplete={setBackgroundColor} />
      </div>
    </div>
  )
}

render(<GeneralPage />, document.getElementById("picasso-general-page"))