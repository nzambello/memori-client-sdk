import React from 'react';
import { Meta, Story } from '@storybook/react';
import ShareButton, { Props } from './ShareButton';
import { tenant } from '../../mocks/data';

import './ShareButton.css';

const meta: Meta = {
  title: 'Share Button',
  component: ShareButton,
  argTypes: {
    url: {
      control: {
        type: 'text',
      },
    },
    showQrCode: {
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

const Template: Story<Props> = args => <ShareButton {...args} />;
const TemplateRight: Story<Props> = args => (
  <div style={{ textAlign: 'right' }}>
    <ShareButton {...args} />
  </div>
);

export const Default = Template.bind({});
Default.args = {
  url: 'https://memori.ai',
  showQrCode: false,
  align: 'right',
};

export const Alignment = TemplateRight.bind({});
Alignment.args = {
  url: 'https://memori.ai',
  align: 'left',
};

export const WithQrCode = Template.bind({});
WithQrCode.args = {
  url: 'https://memori.ai',
  showQrCode: true,
  align: 'right',
};

export const WithQrCodeAndTenant = Template.bind({});
WithQrCodeAndTenant.args = {
  url: 'https://memori.ai',
  showQrCode: true,
  align: 'right',
  tenant: tenant,
};

export const WithQrCodeAndOtherTenant = Template.bind({});
WithQrCodeAndOtherTenant.args = {
  url: 'https://memori.ai',
  showQrCode: true,
  align: 'right',
  tenant: {
    ...tenant,
    theme: 'tailoor',
  },
};
