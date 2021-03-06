/* eslint-disable sonarjs/cognitive-complexity */
import {
  Accordion,
  AccordionPanel,
  Box,
  Button,
  Form,
  Heading,
  Text,
} from 'grommet';
import { Filter } from 'grommet-icons';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { filterSelectors } from 'state/filter';
import {
  clearFilters,
  filterByPriority,
  filterByStatus,
  FilterState,
} from 'state/filter';
import { PrioritySelection, StatusSelection } from '@ui';

const RichPanel = ({ children, label }: any) => {
  const [hovering, setHovering] = React.useState(false);

  const renderPanelTitle = () => (
    <Box direction="row" align="center" gap="small" pad="small">
      <Filter />
      <Heading level={4} color={hovering ? 'dark-1' : 'dark-3'}>
        {label}
      </Heading>
    </Box>
  );

  return (
    <AccordionPanel
      label={renderPanelTitle()}
      onMouseOver={() => setHovering(true)}
      onMouseOut={() => setHovering(false)}
      onFocus={() => setHovering(true)}
      onBlur={() => setHovering(false)}
    >
      {children}
    </AccordionPanel>
  );
};

const FilterPanel = () => {
  const filterValue: FilterState['filters'] = useSelector(
    filterSelectors.selectFilters,
  );
  const dispatch = useDispatch();

  const handleFilterChange = (nextValue: any) => {
    if (
      nextValue.filterPriority &&
      (!filterValue.priorities ||
        (filterValue.priorities &&
          filterValue.priorities[0] !== nextValue.filterPriority))
    ) {
      dispatch(filterByPriority([nextValue.filterPriority]));
    }
    if (
      nextValue.filterStatus &&
      (!filterValue.status ||
        (filterValue.status && filterValue.status !== nextValue.filterStatus))
    ) {
      dispatch(filterByStatus([nextValue.filterStatus]));
    }
  };

  const handleClear = () => {
    dispatch(clearFilters());
  };

  return (
    <Box width="medium" pad="medium">
      <Accordion multiple={false} background="light-3">
        <RichPanel label="Filters">
          <Box
            pad={{
              bottom: 'medium',
              horizontal: 'small',
              top: 'small',
            }}
            gap="medium"
          >
            <Form
              value={filterValue}
              onChange={(nextValue: any) => handleFilterChange(nextValue)}
            >
              <Text color="dark-1" margin="small" weight="bold">
                Priority
              </Text>
              <PrioritySelection
                name="filterPriority"
                value={filterValue.priorities && filterValue.priorities[0]}
              />
              <Text color="dark-1" margin="small" weight="bold">
                Status
              </Text>
              <StatusSelection
                name="filterStatus"
                value={filterValue.status && filterValue.status[0]}
              />
              <Button
                type="reset"
                label="Clear"
                secondary
                color="dark-1"
                margin="small"
                onClick={handleClear}
              />
            </Form>
          </Box>
        </RichPanel>
      </Accordion>
    </Box>
  );
};

export { FilterPanel };
