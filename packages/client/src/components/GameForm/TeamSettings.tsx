import React, {
  FC,
  MouseEvent,
  ReactElement,
  useContext,
  useState,
} from 'react';
import {
  Card,
  Grid,
  IconButton,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
  Typography,
} from '@material-ui/core';
import { MyLocation } from '@material-ui/icons';
import {
  DragDropContext,
  DragStart,
  Draggable,
  DropResult,
  Droppable,
} from 'react-beautiful-dnd';

import { TeamSettings as ITeamSettings, Team } from '@codenames/domain';

import { gameSettingsContext } from '~/contexts';
import { getTeamColor } from '~/utils';

import { ColumnHeader, ListContainer } from './teamSettings.styles';

const FULL_USER_LIST = [
  'Marcel',
  'Robert',
  'Mimi',
  'Momo',
  'Mumu',
  'Mama',
  'Nana',
  'Paul',
  'Antoine',
  'Alexia',
];

// const DEMO_DATA = [
//   columns: {
//     [Team.A]: {
//       userList: []
//     },
//     [Team.Observer]: {
//       userList: DEMO_USER_LIST
//     },
//     [Team.B]: {
//       userList: [];
//     }
//   }
// ]

type ColumnEntries = Record<Team, { userList: string[] }>;

const COLUMN_ORDER = [Team.A, Team.Observer, Team.B];

export const TeamSettings: FC<{}> = () => {
  const [fromColumn, setFromColumn] = useState<Team | null>(null);
  const {
    setSetting,
    settings: { teams },
  } = useContext(gameSettingsContext);

  const columnEntries = formatToColumnEntries(teams);

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

  return (
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
  );
};

interface ColumnProps {
  sourceColumn: Team;
  team: Team;
  userList: string[];
}

const Column: FC<ColumnProps> = ({ sourceColumn, team, userList }) => {
  function generateTitle(): string {
    switch (team) {
      case Team.A:
        return 'Team A';
      case Team.B:
        return 'Team B';
      case Team.Observer:
      default:
        return 'Observers';
    }
  }

  return (
    <Card>
      <ColumnHeader
        teamColor={getTeamColor(team)}
        // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
        // @ts-ignore
        title={<Typography variant="button">{generateTitle()}</Typography>}
        subheader={
          <Typography variant="caption" component="p">
            {userList.length} people
          </Typography>
        }
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
    icon = (
      <ListItemSecondaryAction>
        {username === teams.spyA || username === teams.spyB ? (
          <MyLocation color={color} />
        ) : (
          <IconButton edge="end" aria-label="make-spy-master" onClick={setSpy}>
            <MyLocation color="disabled" />
          </IconButton>
        )}
      </ListItemSecondaryAction>
    );
  }

  return (
    <Draggable draggableId={username} index={index}>
      {provided => (
        <ListItem
          role="user"
          button
          innerRef={provided.innerRef}
          {...provided.draggableProps}
        >
          <ListItemText primary={username} {...provided.dragHandleProps} />
          {icon}
        </ListItem>
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

function formatToColumnEntries(teams: ITeamSettings): ColumnEntries {
  return {
    [Team.A]: {
      userList: teams.a,
    },
    [Team.Observer]: {
      userList: remainingUserList(FULL_USER_LIST, teams),
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
