import React, { FC, MouseEvent, useState } from 'react';
import {
  Button,
  Card,
  CardHeader,
  Checkbox,
  Divider,
  Grid,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@material-ui/core';

export const TeamSettings: FC<{}> = () => {
  const [checked, setChecked] = useState<number[]>([]);
  const [left, setLeft] = useState<number[]>([0, 1, 2, 3]);
  const [right, setRight] = useState<number[]>([4, 5, 6, 7]);

  const leftChecked = intersection(checked, left);
  const rightChecked = intersection(checked, right);

  const handleToggle = (value: number) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  function numberOfChecked(items: number[]): number {
    return intersection(checked, items).length;
  }

  function handleToggleAll(items: number[]) {
    return () => {
      if (numberOfChecked(items) === items.length) {
        setChecked(not(checked, items));
      } else {
        setChecked(union(checked, items));
      }
    };
  }

  function handleCheckedRight(event: MouseEvent<HTMLButtonElement>): void {
    event.preventDefault();
    setRight(right.concat(leftChecked));
    setLeft(not(left, leftChecked));
    setChecked(not(checked, leftChecked));
  }

  function handleCheckedLeft(event: MouseEvent<HTMLButtonElement>): void {
    event.preventDefault();
    setLeft(left.concat(rightChecked));
    setRight(not(right, rightChecked));
    setChecked(not(checked, rightChecked));
  }

  function customList(title: React.ReactNode, items: number[]): JSX.Element {
    return (
      <Card>
        <CardHeader
          avatar={
            <Checkbox
              onClick={handleToggleAll(items)}
              checked={
                numberOfChecked(items) === items.length && items.length !== 0
              }
              indeterminate={
                numberOfChecked(items) !== items.length &&
                numberOfChecked(items) !== 0
              }
              disabled={items.length === 0}
              inputProps={{ 'aria-label': 'all items selected' }}
            />
          }
          title={title}
          subheader={`${numberOfChecked(items)}/${items.length} selected`}
        />
        <Divider />
        <List dense component="div" role="list">
          {items.map((value: number) => {
            const labelId = `transfer-list-all-item-${value}-label`;

            return (
              <ListItem
                key={value}
                role="listitem"
                button
                onClick={handleToggle(value)}
              >
                <ListItemIcon>
                  <Checkbox
                    checked={checked.indexOf(value) !== -1}
                    tabIndex={-1}
                    disableRipple
                    inputProps={{ 'aria-labelledby': labelId }}
                  />
                </ListItemIcon>
                <ListItemText id={labelId} primary={`List item ${value + 1}`} />
              </ListItem>
            );
          })}
          <ListItem />
        </List>
      </Card>
    );
  }

  return (
    <Grid container spacing={2} justify="center" alignItems="center">
      <Grid item>{customList('Team A', left)}</Grid>
      <Grid item>
        <Grid container direction="column" alignItems="center">
          <Button
            variant="outlined"
            size="small"
            onClick={handleCheckedRight}
            disabled={leftChecked.length === 0}
            aria-label="move selected right"
          >
            &gt;
          </Button>
          <Button
            variant="outlined"
            size="small"
            onClick={handleCheckedLeft}
            disabled={rightChecked.length === 0}
            aria-label="move selected left"
          >
            &lt;
          </Button>
        </Grid>
      </Grid>
      <Grid item>{customList('Team B', right)}</Grid>
    </Grid>
  );
};

function not(a: number[], b: number[]): number[] {
  return a.filter(value => b.indexOf(value) === -1);
}

function intersection(a: number[], b: number[]): number[] {
  return a.filter(value => b.indexOf(value) !== -1);
}

function union(a: number[], b: number[]): number[] {
  return [...a, ...not(b, a)];
}
