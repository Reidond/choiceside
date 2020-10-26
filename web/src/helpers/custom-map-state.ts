import { mapState } from 'vuex'

export function customMapState<
  S,
  Map extends { [key: string]: (t: any, s: S, g?: any) => any } = {}
>(map: Map) {
  return mapState(map)
}
