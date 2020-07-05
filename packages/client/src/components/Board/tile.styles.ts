import { styled } from '@material-ui/core/styles';
import { Paper, Theme } from '@material-ui/core';

import { CodenameStatus } from '@codenames/domain';

import { setTileBackground } from '~/utils';

export const CodenameContainer = styled('td')(({ theme }) => ({
  verticalAlign: 'middle',
  textAlign: 'center',
  width: '20%',
  padding: theme.spacing(2),

  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(),
  },
}));

export const TilePaper = styled(Paper)(
  ({ status, theme }: { status: CodenameStatus; theme: Theme }) => ({
    background: setTileBackground(status, theme),
    color: status === 'hidden' ? 'black' : 'white',
    padding: `${theme.spacing(2)}px 0`,
    cursor: 'pointer',

    [theme.breakpoints.down('sm')]: {
      padding: theme.spacing(1 / 2),
    },
  })
);
