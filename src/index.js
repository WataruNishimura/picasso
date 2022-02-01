import { PluginBlockSettingsMenuItem, PluginSidebar, PluginSidebarMoreMenuItem, } from '@wordpress/edit-post';
import { registerPlugin, PluginArea } from "@wordpress/plugins";
import { PanelBody, Button, G } from '@wordpress/components';
import { useCallback, Fragment, useEffect } from "@wordpress/element"
import { addFilter, createHooks } from "@wordpress/hooks"
import { AsyncModeProvider, useSelect, select, subscribe, useDispatch, } from "@wordpress/data"
import apiFetch from "@wordpress/api-fetch"
import store from "@wordpress/core-data"

function wrapPostFeaturedImage(OriginalComponent) {
  return (
    <Fragment>
      Prepend Above
      <OriginalComponent />
      Append Below
    </Fragment>
  )
}
const globalhook = createHooks()

globalhook.addFilter(
  'editor.PostFeaturedImage',
  'picasso/wrap-post-featured-image',
  wrapPostFeaturedImage
);



function FeaturedImageFrame(mediaId) {
  const getMedia = async (mediaId) => {
    const response = await apiFetch({ path: `/wp/v2/media/${mediaId}` })
    return response;
  }
  const response = getMedia(mediaId)
  return (
    <div>
      {response}
    </div>
  )
}

function BlockCount() {
  const mediaId = useSelect((select) => {
    return select("core/editor").getEditedPostAttribute("featured_media")
  }, [])
  const media = useSelect((select) => {
    return select("core").getEntityRecord("root", "media", mediaId)
  })
  console.log(media)
  return (
    <div>
      <img src={media ? media.source_url : ""}></img>
    </div>
  )
}

function App() {
  return (

    <BlockCount />
  );
}



const PluginSidebarTest = () => {
  const { getEditedPostAttribute } = useSelect("core/editor")
  const mediaId = getEditedPostAttribute("featured_media")
  const { editPost } = useDispatch("core/editor")

  const changeFeaturedImage = useCallback(() => {
    const new_mediaId = 19
    editPost({ "featured_media": new_mediaId })
  })

  return (
    <PluginSidebar name="picasso-gutenberg-sidebar" title="Picasso">
      <PanelBody>
        <App />
        <Button isPrimary={true} onClick={changeFeaturedImage}>アイキャッチを自動生成</Button>
      </PanelBody>
    </PluginSidebar>
  )
}


registerPlugin("picasso-gutenberg-plugin", {
  render: PluginSidebarTest,
})