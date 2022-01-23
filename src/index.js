import { PluginBlockSettingsMenuItem, PluginSidebar, PluginSidebarMoreMenuItem, } from '@wordpress/edit-post';
import { registerPlugin, PluginArea } from "@wordpress/plugins";
import { PanelBody, Button } from '@wordpress/components';
import { useCallback, Fragment } from "@wordpress/element"
import { addFilter, createHooks } from "@wordpress/hooks"
import { AsyncModeProvider, useSelect, select, subscribe, useDispatch, } from "@wordpress/data"

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


const postId = select("core/editor").getCurrentPostId()

function BlockCount() {

  return useSelect((select) => {
    return select("core/editor").getEditedPostAttribute("featured_media")
  }, []);
}

function App() {
  return (
    <AsyncModeProvider value={true}>
      <BlockCount />
    </AsyncModeProvider>
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