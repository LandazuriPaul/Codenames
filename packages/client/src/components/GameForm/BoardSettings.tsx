import React, { ChangeEvent, FC, useContext, useState } from 'react';
import { Grid, MenuItem, Select, Slider, Typography } from '@material-ui/core';

import { AvailableLanguages } from '@codenames/domain';

import { gameSettingsContext } from '~/contexts';

export const BoardSettings: FC<{}> = () => {
  const {
    setSetting,
    settings: { board },
  } = useContext(gameSettingsContext);
  const [rudeRatio, setRudeRatio] = useState<number>(board.rudeRatio);

  function onLanguageChange(
    event: ChangeEvent<{ name?: string; value: unknown }>
  ): void {
    event.preventDefault();
    setSetting('board', {
      ...board,
      language: event.target.value as AvailableLanguages,
    });
  }

  function onRudeRatioChange(
    event: ChangeEvent<{}>,
    value: number | number[]
  ): void {
    event.preventDefault();
    const ratio = typeof value === 'number' ? value : value[0];
    setSetting('board', {
      ...board,
      rudeRatio: ratio,
    });
  }

  function onSliderChange(
    event: ChangeEvent<{}>,
    value: number | number[]
  ): void {
    event.preventDefault();
    const ratio = typeof value === 'number' ? value : value[0];
    setRudeRatio(ratio);
  }

  return (
    <Grid container spacing={4}>
      <Grid item container justify="center" alignItems="center" spacing={2}>
        <Grid item xs={6}>
          <Typography align="right">Language</Typography>
        </Grid>
        <Grid item xs={6}>
          <Select
            value={board.language}
            onChange={onLanguageChange}
            color="secondary"
          >
            <MenuItem value={AvailableLanguages.English}>English</MenuItem>
            <MenuItem value={AvailableLanguages.French}>French</MenuItem>
          </Select>
        </Grid>
      </Grid>
      <Grid item container justify="center" alignItems="center" spacing={2}>
        <Grid item xs={6}>
          <Typography align="right">Rude word ratio</Typography>
        </Grid>
        <Grid item xs={6}>
          <Slider
            value={rudeRatio}
            onChange={onSliderChange}
            onChangeCommitted={onRudeRatioChange}
            valueLabelDisplay="auto"
            color="secondary"
          />
        </Grid>
      </Grid>
    </Grid>
  );
};
