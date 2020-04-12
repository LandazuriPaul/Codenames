import React, { ChangeEvent, FC, FormEvent, MouseEvent, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import copy from 'clipboard-copy';
import {
  Button,
  DialogContent,
  FormControlLabel,
  IconButton,
  Input,
  InputAdornment,
  List,
  ListItem,
  MenuItem,
  Select,
  Switch,
  Tooltip,
  Typography,
} from '@material-ui/core';
import { Autorenew, ChevronRight, FileCopy } from '@material-ui/icons';

import { AvailableLanguages } from '~/domain';
import { useStores } from '~/hooks';

import { SettingsControl, Title } from './settings.styles';

interface SettingsProps {
  onClose: () => void;
}

export const Settings: FC<SettingsProps> = observer(({ onClose }) => {
  const { lang, seed } = useParams();
  const [newSeed, setNewSeed] = useState<string>(seed);
  const [newLang, setNewLang] = useState<AvailableLanguages>(
    lang as AvailableLanguages
  );
  const { gameStore } = useStores();
  const history = useHistory();

  const isSetupRoomChanged = seed !== newSeed || lang !== newLang;

  function handleLangChange(
    event: ChangeEvent<{
      value: AvailableLanguages;
    }>
  ) {
    setNewLang(event.target.value);
  }

  function handleCopyGameURL() {
    const url = `${window.location.origin}/${newLang}/${newSeed}`;
    copy(url);
  }

  function handleSeedChange(event: ChangeEvent<HTMLInputElement>) {
    setNewSeed(event.currentTarget.value);
  }

  function handleReset() {
    const generatedSeed = gameStore.getNewRandomSeed();
    setNewSeed(generatedSeed);
  }

  function onFormSubmit(
    event?: MouseEvent<HTMLAnchorElement, MouseEvent> | FormEvent
  ) {
    if (event) {
      event.preventDefault();
    }
    if (isSetupRoomChanged) {
      history.push(`/${newLang}/${newSeed}`);
      onClose();
    }
  }

  return (
    <>
      <Title>Settings</Title>
      <DialogContent>
        <List>
          <ListItem>
            <form onSubmit={onFormSubmit}>
              <SettingsControl component="div">
                <Tooltip title="Copy room URL to clipboard">
                  <IconButton
                    onClick={handleCopyGameURL}
                    size="small"
                    color={isSetupRoomChanged ? 'default' : 'primary'}
                  >
                    <FileCopy />
                  </IconButton>
                </Tooltip>
                {window.location.origin}
                &nbsp;&nbsp;/&nbsp;&nbsp;
                <Select value={newLang} onChange={handleLangChange}>
                  <MenuItem value={AvailableLanguages.English}>
                    English
                  </MenuItem>
                  <MenuItem value={AvailableLanguages.French}>French</MenuItem>
                </Select>
                &nbsp;&nbsp;/&nbsp;&nbsp;
                <Input
                  value={newSeed}
                  onChange={handleSeedChange}
                  style={{
                    maxWidth: '100px',
                  }}
                  endAdornment={
                    <InputAdornment position="end">
                      <Tooltip title="Generate new seed">
                        <IconButton size="small" onClick={handleReset}>
                          <Autorenew />
                        </IconButton>
                      </Tooltip>
                    </InputAdornment>
                  }
                />
              </SettingsControl>
              <Typography align="center">
                <Button
                  variant="contained"
                  disabled={!isSetupRoomChanged}
                  color={isSetupRoomChanged ? 'primary' : 'default'}
                  onClick={onFormSubmit}
                  size="small"
                  type="submit"
                >
                  Go to new game&nbsp;
                  <ChevronRight />
                </Button>
              </Typography>
            </form>
          </ListItem>
          <ListItem>
            <FormControlLabel
              control={
                <Switch
                  checked={gameStore.isMasterMode}
                  onChange={() => gameStore.toggleMasterMode()}
                  color="primary"
                />
              }
              label="Master mode"
            />
          </ListItem>
        </List>
      </DialogContent>
    </>
  );
});
