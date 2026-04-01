import va from "@vercel/analytics"

type EventName =
  | "copy_install_command"
  | "copy_code"
  | "copy_page"
  | "open_in_v0"
  | "open_in_chatgpt"
  | "open_in_claude"
  | "search_query"
  | "select_package_manager"
  | "click_edit_page"
  | "view_markdown"

type EventProperties = Record<string, string | number | boolean | null>

export function trackEvent(
  name: EventName,
  properties?: EventProperties
): void {
  va.track(name, properties)
}
