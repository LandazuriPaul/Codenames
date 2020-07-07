import React, { FC, useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  LinearProgress,
  Tooltip,
  Typography,
} from '@material-ui/core';
import { GpsFixed, TrackChanges } from '@material-ui/icons';

import { CodenameType, Turn } from '@codenames/domain';

import { useStores } from '~/hooks';

import {
  IndicatorsContainer,
  TeamCount,
  TeamIndicator,
  TeamIndicatorContainer,
  TurnIndicator,
} from './indicators.styles';

export const Indicators: FC<{}> = observer(() => {
  const [isEndModalOpen, setIsEndModalOpen] = useState<boolean>(false);
  const {
    gameStore: {
      currentTurn,
      remainingTeamACount,
      remainingTeamBCount,
      teamACodenamesCount,
      teamBCodenamesCount,
      winnerTeam,
    },
  } = useStores();

  useEffect(() => {
    if (winnerTeam) {
      setIsEndModalOpen(true);
    }
  }, [winnerTeam]);

  function handleClose(): void {
    setIsEndModalOpen(false);
  }

  let turnTitle: string;
  switch (currentTurn) {
    case Turn.AHint:
      turnTitle = "Team A's Spy Master turn";
      break;
    case Turn.AGuess:
      turnTitle = "Team A's Guess turn";
      break;
    case Turn.BHint:
      turnTitle = "Team B's Spy Master turn";
      break;
    case Turn.BGuess:
      turnTitle = "Team B's Guess turn";
      break;
    default:
      throw new Error(`${currentTurn} is not a valid turn`);
  }

  return (
    <>
      <IndicatorsContainer>
        <Tooltip
          title={`${remainingTeamACount} codenames remaining`}
          placement="top"
        >
          <TeamIndicatorContainer>
            <TeamIndicator>
              <TeamCount>{remainingTeamACount}</TeamCount>
              <LinearProgress
                variant="determinate"
                value={(1 - remainingTeamACount / teamACodenamesCount) * 100}
                color="primary"
              />
            </TeamIndicator>
          </TeamIndicatorContainer>
        </Tooltip>
        <Tooltip placement="top" title={turnTitle}>
          <div>
            <TurnIndicator
              disabled
              turnColor={
                currentTurn === Turn.AHint || currentTurn === Turn.AGuess
                  ? 'primary'
                  : 'secondary'
              }
            >
              {currentTurn === Turn.AHint || currentTurn === Turn.BHint ? (
                <TrackChanges color="inherit" />
              ) : (
                <GpsFixed color="inherit" />
              )}
            </TurnIndicator>
          </div>
        </Tooltip>
        <Tooltip
          title={`${remainingTeamBCount} codenames remaining`}
          placement="top"
        >
          <TeamIndicatorContainer>
            <TeamIndicator isReversed>
              <TeamCount>{remainingTeamBCount}</TeamCount>
              <LinearProgress
                variant="determinate"
                value={(1 - remainingTeamBCount / teamBCodenamesCount) * 100}
                color="secondary"
              />
            </TeamIndicator>
          </TeamIndicatorContainer>
        </Tooltip>
      </IndicatorsContainer>
      <Dialog open={isEndModalOpen} onClose={handleClose}>
        <DialogContent>
          <DialogContentText>
            <Typography
              color={
                winnerTeam === CodenameType.TeamA ? 'primary' : 'secondary'
              }
              component="span"
            >
              {winnerTeam === CodenameType.TeamA ? 'Team A' : 'Team B'}
            </Typography>
            &nbsp;wins!
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleClose}
            color={winnerTeam === CodenameType.TeamA ? 'primary' : 'secondary'}
            autoFocus
          >
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
});
