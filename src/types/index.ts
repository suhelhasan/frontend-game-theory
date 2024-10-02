export interface KeyMoment {
  time: number;
  description: string;
  start_time: number;
  end_time: number;
}
export interface MatchTypes {
  match_id: string;
  user: string;
  sport: string;
  match_type: string;
  video_url: string;
  key_moments: KeyMoment[];
  statistics: {
    [key: string]: number;
  };
}
