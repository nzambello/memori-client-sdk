import React from 'react';
import { Meta, Story } from '@storybook/react';
import { sessionID, memoryQuestion } from '../../mocks/data';
import I18nWrapper from '../../I18nWrapper';
import WhyThisAnswer, { Props } from './WhyThisAnswer';

import './WhyThisAnswer.css';
import { SearchMatches } from '@memori.ai/memori-api-client/dist/types';

const meta: Meta = {
  title: 'Why This Answer',
  component: WhyThisAnswer,
  argTypes: {
    visible: {
      control: {
        type: 'boolean',
      },
    },
  },
  parameters: {
    controls: { expanded: true },
  },
};

export default meta;

const Template: Story<Props> = args => (
  <I18nWrapper>
    <WhyThisAnswer
      {...args}
      apiURL="https://backend.memori.ai"
      sessionID={sessionID}
      message={{
        questionAnswered: 'Test message',
        text: 'This is a test content',
        date: '2021-01-01',
        placeName: 'Test Place',
        placeLatitude: 0,
        placeLongitude: 0,
        placeUncertaintyKm: 0,
        contextVars: {
          KEY: 'value',
        },
      }}
      closeDrawer={() => {}}
    />
  </I18nWrapper>
);

// By passing using the Args format for exported stories, you can control the props for a component for reuse in a test
// https://storybook.js.org/docs/react/workflows/unit-testing
export const Default = Template.bind({});
Default.args = {
  visible: true,
};

export const Loading = Template.bind({});
Loading.args = {
  visible: true,
  _TEST_loading: true,
};

export const WithData = Template.bind({});
WithData.args = {
  visible: true,
  initialMatches: [
    {
      confidence: 0.8,
      confidenceLevel: 'HIGH',
      memory: {
        ...memoryQuestion,
        title: 'This is the title of the content',
        titleVariants: [
          "This is a variant of the content's title",
          'This is a test content',
        ],
        answers: [
          {
            text: 'This is a test answer',
          },
        ],
        memoryID: '1',
      },
    } as SearchMatches,
    {
      confidence: 0.7,
      confidenceLevel: 'MEDIUM',
      memory: {
        ...memoryQuestion,
        memoryID: '2',
        title: 'This is a test title',
        titleVariants: undefined,
        answers: [
          {
            text: 'This is a an answer',
          },
          {
            text: 'This is another answer',
          },
        ],
      },
    } as SearchMatches,
    {
      confidence: 0.5,
      confidenceLevel: 'LOW',
      memory: {
        ...memoryQuestion,
        memoryID: '3',
        title: 'Content with a long answer',
        titleVariants: undefined,
        answers: [
          {
            text: 'Suspendisse a sodales nulla, sed semper nisi. Suspendisse a sodales nulla, sed semper nisi. Suspendisse a sodales nulla, sed semper nisi. Suspendisse a sodales nulla, sed semper nisi. Suspendisse a sodales nulla, sed semper nisi.',
          },
        ],
      },
    } as SearchMatches,
    {
      confidence: 0.5,
      confidenceLevel: 'LOW',
      memory: {
        ...memoryQuestion,
        memoryID: '4',
        title: 'Content with a source',
        titleVariants: undefined,
        answers: [
          {
            text: 'This is a test answer',
          },
        ],
        media: [
          {
            mediumID: '1',
            mimeType: 'text/plain',
            content:
              'This is a source. Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
          },
        ],
      },
    } as SearchMatches,
  ],
};
