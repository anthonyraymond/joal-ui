// @flow

export const TORRENT_SEARCH_FILTER_TEXT_CHANGED = '@@ui/torrents-table/TORRENT_SEARCH_FILTER_TEXT_CHANGED';
export const TORRENT_SORT_CHANGED = '@@ui/torrents-table/TORRENT_SORT_CHANGED';

export function changeSearchFilterText(text: string) {
  return {
    type: TORRENT_SEARCH_FILTER_TEXT_CHANGED,
    text
  };
}

export function changeTorrentSort(sortProperty: string, sortDirection: string) {
  return {
    type: TORRENT_SORT_CHANGED,
    sortProperty,
    sortDirection
  };
}
