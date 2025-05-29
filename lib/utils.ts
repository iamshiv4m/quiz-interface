import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}




type RawResponse = {
  success: boolean;
  data: {
    overall: any;
    // if your backend returns matches differently, adjust here
  };
};

export function formatLeaderboardResponse(raw: any): {
  success: boolean;
  data: any;
} {
  const { overall } = raw.data;

  // figure out how many matches (sessions) we have by looking
  // at the longest sessionId array in overall[]
  const maxSessions = Math.max(
    ...overall.map((u: { sessionId: string | any[]; }) => u.sessionId.length)
  );

  // build an array of matches: [[MatchApiItem,...], [...], ...]
  const matches: any[][] = Array.from(
    { length: maxSessions },
    (_, matchIdx) =>
      overall
        .map((user: { sessionId: any[]; scores: any[]; userId: any; userName: any; }) => {
          const sid = user.sessionId[matchIdx];
          const score = user.scores[matchIdx];
          if (sid == null) return null;
          return {
            sessionId: sid,
            userId: user.userId,
            userName: user.userName,
            score: score!,
          };
        })
        .filter((m: null): m is any => m !== null)
  );

  // assemble the final data object
  const data: any = {
    overall,
    // assign match1, match2, ... up to match3 (or more if you like)
    match1: matches[0] ?? [],
    match2: matches[1] ?? [],
    match3: matches[2] ?? [],
    // if your component supports more matches add:
    // match4: matches[3] ?? [],
  };

  return { success: raw.success, data };
}
