import type { VisualizationSpec } from 'svelte-vega';

const reSadd = /^(f|m)_\d+_.+$/;
const reExtra = /^f_15_49$/;

export const transformData = (props) => {
  const data = [];
  for (const [key, people] of Object.entries(props)) {
    if (reSadd.test(key) && !reExtra.test(key)) {
      const vars = key.split('_');
      // const age = vars[2] !== 'plus' ? vars[1] + '-' + vars[2] : vars[1] + '+';
      data.push({ sex: vars[0], age: Number.parseInt(vars[1]), people });
    }
  }
  return data;
};

export const spec: VisualizationSpec = {
  $schema: 'https://vega.github.io/schema/vega-lite/v5.json',
  description: 'A population pyramid.',
  data: { name: 'table' },
  transform: [
    { calculate: "datum.sex == 'f' ? 'Female' : 'Male'", as: 'gender' },
  ],
  spacing: 0,
  hconcat: [
    {
      transform: [
        {
          filter: { field: 'gender', equal: 'Female' },
        },
      ],
      title: 'Female',
      mark: 'bar',
      encoding: {
        y: {
          field: 'age',
          axis: null,
          sort: 'descending',
        },
        x: {
          aggregate: 'sum',
          field: 'people',
          title: 'population',
          axis: { format: 's' },
          sort: 'descending',
        },
        color: {
          field: 'gender',
          scale: { range: ['#675193', '#ca8861'] },
          legend: null,
        },
      },
    },
    {
      width: 20,
      view: { stroke: null },
      mark: {
        type: 'text',
        align: 'center',
      },
      encoding: {
        y: { field: 'age', type: 'ordinal', axis: null, sort: 'descending' },
        text: { field: 'age', type: 'quantitative' },
      },
    },
    {
      transform: [
        {
          filter: { field: 'gender', equal: 'Male' },
        },
      ],
      title: 'Male',
      mark: 'bar',
      encoding: {
        y: {
          field: 'age',
          title: null,
          axis: null,
          sort: 'descending',
        },
        x: {
          aggregate: 'sum',
          field: 'people',
          title: 'population',
          axis: { format: 's' },
        },
        color: {
          field: 'gender',
          legend: null,
        },
      },
    },
  ],
  config: {
    view: { stroke: null },
    axis: { grid: false },
  },
};
