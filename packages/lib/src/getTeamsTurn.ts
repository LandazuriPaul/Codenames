import { PlayingTeam, Team, Turn } from '@codenames/domain';

export function getTeamsTurn(currentTurn: Turn): PlayingTeam {
  if (currentTurn === Turn.AGuess || Turn.AHint) {
    return Team.A;
  }
  return Team.B;
}
