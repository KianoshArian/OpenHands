import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "#/store";
import { BrowserSnapshot } from "./browser-snapshot";
import { EmptyBrowserMessage } from "./empty-browser-message";
import { useConversationId } from "#/hooks/use-conversation-id";
import {
  initialState as browserInitialState,
  setUrl,
  setScreenshotSrc,
} from "#/state/browser-slice";

export function BrowserPanel() {
  const { url, screenshotSrc } = useSelector(
    (state: RootState) => state.browser,
  );
  const { conversationId } = useConversationId();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setUrl(browserInitialState.url));
    dispatch(setScreenshotSrc(browserInitialState.screenshotSrc));
  }, [conversationId]);

  const imgSrc =
    screenshotSrc && screenshotSrc.startsWith("data:image/png;base64,")
      ? screenshotSrc
      : `data:image/png;base64,${screenshotSrc || ""}`;

  return (
    <div className="h-full w-full flex flex-col text-neutral-400">
      <div className="w-full p-2 truncate border-b border-neutral-600">
        {url}
      </div>
      <div className="overflow-y-auto grow scrollbar-hide rounded-xl">
        {screenshotSrc ? (
          <BrowserSnapshot src={imgSrc} />
        ) : (
          <EmptyBrowserMessage />
        )}
      </div>
    </div>
  );
}
