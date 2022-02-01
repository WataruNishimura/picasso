import { useState } from "@wordpress/element"
import api from "@wordpress/api"
import { ColorPicker } from "@wordpress/components"


const [textColor, setTextColor] = useState("#000000");

const BasicAdmin = () => {
  return (
    <ColorPicker color={textColor} onChangeComplete={(value) => setTextColor(value)} />
  )
}