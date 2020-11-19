interface TrackOptions {
  category: string;
  action: string;
  label: string;
  value: any  
}

export type Track = (options: TrackOptions) => void

export interface AnalyticsOptions {
  baidu: string | string[]
  google: string,
}
