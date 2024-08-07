import type { Meta, StoryObj } from '@storybook/react';

import { ArrowButton } from './ArrowButton';
import { useState } from 'react';

const meta: Meta<typeof ArrowButton> = {
	component: ArrowButton,
};

export default meta;
type Story = StoryObj<typeof ArrowButton>;

const ArrowButtonWithState = () => {
	const [isOpen, setIsOpen] = useState<boolean>(false);

	return (<ArrowButton onClick={() => {setIsOpen(!isOpen)}} isOpen={isOpen} />);
};

export const ArrowButtonStory: Story = {
	render: () => {
		return (
			<>
				<ArrowButtonWithState />
			</>
		);
	},
};
