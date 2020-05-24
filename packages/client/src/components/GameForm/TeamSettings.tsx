import React, {
  FC,
  MouseEvent,
  ReactElement,
  useContext,
  useState,
} from 'react';
import {
  Button,
  Card,
  Fade,
  Grid,
  IconButton,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
  Tooltip,
  Typography,
} from '@material-ui/core';
import { Loop, MyLocation } from '@material-ui/icons';
import {
  DragDropContext,
  DragStart,
  Draggable,
  DropResult,
  Droppable,
} from 'react-beautiful-dnd';

import { TeamSettings as ITeamSettings, Team } from '@codenames/domain';
import { shuffleArray } from '@codenames/lib';

import { gameSettingsContext } from '~/contexts';
import { getTeamColor } from '~/utils';

import { HelperText } from './elements';
import {
  ColumnHeader,
  ColumnTitle,
  Instructions,
  ListContainer,
  UserText,
} from './teamSettings.styles';

const FULL_USER_LIST = [
  'Marcel',
  'Robert',
  'Mimi',
  'Momo',
  'Mumu',
  'Mama',
  'Nanawdfqsdfqsdfqsdfqsdfqsdfqdsfqsdf',
  'Paul',
  'Antoine',
];

type ColumnEntries = Record<Team, { userList: string[] }>;

const COLUMN_ORDER = [Team.A, Team.Observer, Team.B];

export const TeamSettings: FC<{}> = () => {
  const [fromColumn, setFromColumn] = useState<Team | null>(null);
  const {
    setSetting,
    settings: { teams },
  } = useContext(gameSettingsContext);

  const columnEntries = formatToColumnEntries(teams, FULL_USER_LIST);

  function onDragStart(start: DragStart): void {
    setFromColumn(start.source.droppableId as Team);
  }

  function onDragEnd(result: DropResult): void {
    setFromColumn(null);
    const { destination, draggableId, source } = result;

    if (!destination) {
      return;
    }

    if (destination.droppableId === source.droppableId) {
      return;
    }

    const sourceColumn = columnEntries[source.droppableId as Team];
    const destinationColumn = columnEntries[destination.droppableId as Team];

    const newSourceUserList = [...sourceColumn.userList];
    const newDestinationUserList = [...destinationColumn.userList];
    newSourceUserList.splice(source.index, 1);
    newDestinationUserList.splice(destination.index, 0, draggableId);

    const newTeams = formatToSettings(teams, {
      ...columnEntries,
      [source.droppableId]: { userList: newSourceUserList },
      [destination.droppableId]: { userList: newDestinationUserList },
    });
    setSetting('teams', newTeams);
  }

  function onShuffleClick(event: MouseEvent<HTMLButtonElement>): void {
    event.preventDefault();
    setSetting('teams', shuffleTeams(FULL_USER_LIST));
  }

  return (
    <>
      <Instructions>
        <HelperText>
          <ul>
            <li>
              You can drag and drop the players to the team columns. Or, you
              can&nbsp;
              <Button
                size="small"
                variant="contained"
                color="secondary"
                onClick={onShuffleClick}
              >
                Shuffle&nbsp;
                <Loop />
              </Button>
            </li>
            <li>
              Each team needs a Spy Master&nbsp;&laquo;&nbsp;
              <MyLocation fontSize="inherit" />
              &nbsp;&raquo;.
            </li>
          </ul>
        </HelperText>
      </Instructions>
      <DragDropContext onDragStart={onDragStart} onDragEnd={onDragEnd}>
        <Grid container spacing={2}>
          {COLUMN_ORDER.map((columnId, index) => {
            const column = columnEntries[columnId];
            return (
              <Grid key={index} item xs={4}>
                <Column
                  sourceColumn={fromColumn}
                  team={columnId}
                  userList={column.userList}
                />
              </Grid>
            );
          })}
        </Grid>
      </DragDropContext>
    </>
  );
};

interface ColumnProps {
  sourceColumn: Team;
  team: Team;
  userList: string[];
}

const Column: FC<ColumnProps> = ({ sourceColumn, team, userList }) => {
  function generateTitle(): ReactElement {
    let title: string;
    switch (team) {
      case Team.A:
        title = 'Team A';
        break;
      case Team.B:
        title = 'Team B';
        break;
      case Team.Observer:
      default:
        title = 'Observers';
        break;
    }
    return (
      <ColumnTitle>
        <span>{title}</span>
        <span>{`(${userList.length})`}</span>
      </ColumnTitle>
    );
  }

  return (
    <Card>
      <ColumnHeader
        teamColor={getTeamColor(team)}
        // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
        // @ts-ignore
        title={<Typography variant="button">{generateTitle()}</Typography>}
      />
      <Droppable droppableId={team} isDropDisabled={sourceColumn === team}>
        {provided => (
          <ListContainer
            teamColor={getTeamColor(team)}
            dense
            role="user-list"
            innerRef={provided.innerRef}
            {...provided.droppableProps}
          >
            {userList.map((user, index) => (
              <UserEntry key={user} team={team} username={user} index={index} />
            ))}
            {provided.placeholder}
          </ListContainer>
        )}
      </Droppable>
    </Card>
  );
};

interface UserEntryProps {
  index: number;
  team: Team;
  username: string;
}

const UserEntry: FC<UserEntryProps> = ({ index, team, username }) => {
  const {
    setSetting,
    settings: { teams },
  } = useContext(gameSettingsContext);

  function setSpy(event: MouseEvent<HTMLButtonElement>): void {
    let newSpy: 'spyA' | 'spyB';
    switch (team) {
      case Team.A:
      default:
        newSpy = 'spyA';
        break;
      case Team.B:
        newSpy = 'spyB';
        break;
    }
    event.preventDefault();
    setSetting('teams', {
      ...teams,
      [newSpy]: username,
    });
  }

  let icon: ReactElement = null;
  if (team === Team.A || team === Team.B) {
    const color = getTeamColor(team) as 'primary' | 'secondary';
    icon =
      username === teams.spyA || username === teams.spyB ? (
        <Tooltip placement="right" title={<i>Spy Master</i>}>
          <MyLocation color={color} />
        </Tooltip>
      ) : (
        <Tooltip placement="right" title="set as Spy Master">
          <IconButton
            size="small"
            aria-label="make-spy-master"
            onClick={setSpy}
          >
            <MyLocation fontSize="inherit" color="disabled" />
          </IconButton>
        </Tooltip>
      );
  }

  return (
    <Draggable draggableId={username} index={index}>
      {(provided, snapshot) => (
        <div ref={provided.innerRef} {...provided.draggableProps}>
          <ListItem role="user">
            <ListItemText
              primary={<UserText>{username}</UserText>}
              {...provided.dragHandleProps}
            />
            <Fade
              in={!snapshot.isDragging}
              timeout={{ appear: 0, enter: 200, exit: 0 }}
            >
              <ListItemSecondaryAction>{icon}</ListItemSecondaryAction>
            </Fade>
          </ListItem>
        </div>
      )}
    </Draggable>
  );
};

function remainingUserList(
  fullUserList: string[],
  { a, b }: ITeamSettings
): string[] {
  return fullUserList.filter(user => !a.includes(user) && !b.includes(user));
}

function formatToColumnEntries(
  teams: ITeamSettings,
  fullUserList: string[]
): ColumnEntries {
  return {
    [Team.A]: {
      userList: teams.a,
    },
    [Team.Observer]: {
      userList: remainingUserList(fullUserList, teams),
    },
    [Team.B]: {
      userList: teams.b,
    },
  };
}

function formatToSettings(
  oldTeams: ITeamSettings,
  columnEntries: ColumnEntries
): ITeamSettings {
  const newTeams = {
    ...oldTeams,
    [Team.A]: columnEntries[Team.A].userList,
    [Team.B]: columnEntries[Team.B].userList,
  };
  if (newTeams.spyA && !newTeams[Team.A].includes(newTeams.spyA)) {
    newTeams.spyA = '';
  }
  if (newTeams.spyB && !newTeams[Team.B].includes(newTeams.spyB)) {
    newTeams.spyB = '';
  }
  return newTeams;
}

function shuffleTeams(fullUserList: string[]): ITeamSettings {
  const shuffledUserList = shuffleArray(fullUserList);
  const limit = Math.floor(shuffledUserList.length / 2);
  const rand = Math.random();
  const teamA =
    rand > 0.5
      ? shuffledUserList.slice(0, limit)
      : shuffledUserList.slice(limit);
  const teamB =
    rand > 0.5
      ? shuffledUserList.slice(limit)
      : shuffledUserList.slice(0, limit);
  const spyA = shuffleArray(teamA)[0];
  const spyB = shuffleArray(teamB)[0];
  return {
    a: teamA,
    b: teamB,
    spyA,
    spyB,
  };
}
