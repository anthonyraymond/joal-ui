// @flow

export const TORRENT_SEARCH_FILTER_TEXT_CHANGED = '@@ui/torrents-table/TORRENT_SEARCH_FILTER_TEXT_CHANGED';

export function changeSearchFilterText(text: string) {
  return {
    type: TORRENT_SEARCH_FILTER_TEXT_CHANGED,
    text
  };
}
