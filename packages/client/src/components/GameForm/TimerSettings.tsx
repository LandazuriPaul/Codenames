import React, { ChangeEvent, FC, useContext, useState } from 'react';
import { Collapse, Grid, Slider, Switch, Tooltip } from '@material-ui/core';
import { Info } from '@material-ui/icons';

import { gameSettingsContext } from '~/contexts';

import { ExplainedField, HelperText, SliderWrapper } from './elements';

export const TimerSettings: FC<{}> = () => {
  const { setSetting, settings } = useContext(gameSettingsContext);
  const [hintTimer, setHintTimer] = useState<number>(settings.timer.hint || 30);
  const [isHintTimed, setIsHintTimed] = useState<boolean>(
    settings.timer.hint > 0
  );
  const [guessTimer, setGuessTimer] = useState<number>(
    settings.timer.guess || 30
  );
  const [isGuessTimed, setIsGuessTimed] = useState<boolean>(
    settings.timer.guess > 0
  );

  function onIsHintTimedChange(
    event: ChangeEvent<HTMLInputElement>,
    checked: boolean
  ): void {
    setIsHintTimed(checked);
    setSetting('timer', { ...settings.timer, hint: checked ? hintTimer : 0 });
  }

  function onHintTimerChange(
    event: ChangeEvent<{}>,
    value: number | number[]
  ): void {
    event.preventDefault();
    const timer = typeof value === 'number' ? value : value[0];
    setSetting('timer', { ...settings.timer, hint: timer });
  }

  function onHintSliderChange(
    event: ChangeEvent<{}>,
    value: number | number[]
  ): void {
    event.preventDefault();
    const timer = typeof value === 'number' ? value : value[0];
    setHintTimer(timer);
  }

  function onIsGuessTimedChange(
    event: ChangeEvent<HTMLInputElement>,
    checked: boolean
  ): void {
    setIsGuessTimed(checked);
    setSetting('timer', { ...settings.timer, guess: checked ? guessTimer : 0 });
  }

  function onGuessTimerChange(
    event: ChangeEvent<{}>,
    value: number | number[]
  ): void {
    event.preventDefault();
    const timer = typeof value === 'number' ? value : value[0];
    setSetting('timer', { ...settings.timer, guess: timer });
  }

  function onGuessSliderChange(
    event: ChangeEvent<{}>,
    value: number | number[]
  ): void {
    event.preventDefault();
    const timer = typeof value === 'number' ? value : value[0];
    setGuessTimer(timer);
  }

  return (
    <Grid container spacing={4}>
      <Grid item container justify="center" alignItems="center" spacing={2}>
        <Grid item xs={6}>
          <ExplainedField>
            <Tooltip
              disableFocusListener
              placement="left"
              title="Give a time limit to the Spy Masters' hint"
            >
              <Info fontSize="inherit" color="disabled" />
            </Tooltip>
            &nbsp;Spy Masters&apos; hint
          </ExplainedField>
        </Grid>
        <Grid item xs={6}>
          <Switch
            checked={isHintTimed}
            value={isHintTimed}
            onChange={onIsHintTimedChange}
            color="secondary"
          />
        </Grid>
        <Grid item xs={6}>
          <Collapse in={isHintTimed} collapsedHeight={0}>
            <HelperText align="right">Time in seconds</HelperText>
          </Collapse>
        </Grid>
        <Grid item xs={6}>
          <Collapse in={isHintTimed} collapsedHeight={0}>
            <SliderWrapper spacing={2}>
              <Slider
                value={hintTimer}
                onChange={onHintSliderChange}
                onChangeCommitted={onHintTimerChange}
                valueLabelDisplay="auto"
                color="secondary"
                min={30}
                max={300}
              />
            </SliderWrapper>
          </Collapse>
        </Grid>
      </Grid>
      <Grid item container justify="center" alignItems="center" spacing={2}>
        <Grid item xs={6}>
          <ExplainedField>
            <Tooltip
              disableFocusListener
              placement="left"
              title="Give a time limit to the Teams' Guess"
            >
              <Info fontSize="inherit" color="disabled" />
            </Tooltip>
            &nbsp;Teams&apos; guess
          </ExplainedField>
        </Grid>
        <Grid item xs={6}>
          <Switch
            checked={isGuessTimed}
            value={isGuessTimed}
            onChange={onIsGuessTimedChange}
            color="secondary"
          />
        </Grid>
        <Grid item xs={6}>
          <Collapse in={isGuessTimed} collapsedHeight={0}>
            <HelperText align="right">Time in seconds</HelperText>
          </Collapse>
        </Grid>
        <Grid item xs={6}>
          <Collapse in={isGuessTimed} collapsedHeight={0}>
            <SliderWrapper spacing={2}>
              <Slider
                value={guessTimer}
                onChange={onGuessSliderChange}
                onChangeCommitted={onGuessTimerChange}
                valueLabelDisplay="auto"
                color="secondary"
                min={30}
                max={300}
              />
            </SliderWrapper>
          </Collapse>
        </Grid>
      </Grid>
    </Grid>
  );
};
