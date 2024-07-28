import { ArrowButton } from 'components/arrow-button';
import { Button } from 'components/button';
import { Select } from '../select';
import { Text } from '../text';
import { RadioGroup } from '../radio-group';
import { Separator } from '../separator';

import styles from './ArticleParamsForm.module.scss';

import { useEffect, useRef, useState } from 'react';
import clsx from 'clsx';
import {
	ArticleStateType,
	backgroundColors,
	contentWidthArr,
	fontColors,
	fontFamilyOptions,
	fontSizeOptions,
	OptionType,
} from 'src/constants/articleProps';

type ArticleParamsFormProps = {
	initialFormState: ArticleStateType;
	applyChangesCallback: (newState: ArticleStateType) => void;
};

export const ArticleParamsForm = (props: ArticleParamsFormProps) => {
	const { initialFormState, applyChangesCallback } = props;

	const [isOpen, setIsOpen] = useState<boolean>(false);
	const [formState, setFormState] = useState<ArticleStateType>(initialFormState);

	const rootRef = useRef<HTMLElement | null>(null);

	useEffect(() => {
		const handleClick = (e: MouseEvent) => {
			const { target } = e;
			if (
				target instanceof Node &&
				document.contains(target) &&
				!rootRef.current?.contains(target)
			) {
				isOpen && setIsOpen(false);
			}
		};
		window.addEventListener('click', handleClick);

		return () => {
			window.removeEventListener('click', handleClick);
		};
	}, [isOpen]);

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		applyChangesCallback(formState);
	};

	const handleReset = (e: React.FormEvent<HTMLFormElement>) => {
		setFormState(initialFormState);
		applyChangesCallback(initialFormState);
	};

	const openButtonClickHandler = (
		e: React.MouseEvent<HTMLDivElement, MouseEvent>
	) => {
		e.stopPropagation();
		setIsOpen(!isOpen);
	};

	const changeFormState = <T extends ArticleStateType, K extends keyof T>(
		propKey: K,
		propValue: T[K]
	) => {
		setFormState({
			...formState,
			[propKey]: propValue,
		});
	};

	const changeFontFamilyHandler = (selected: OptionType) => {
		changeFormState('fontFamilyOption', selected);
	};

	const changeFontSizeHandler = (value: OptionType) => {
		changeFormState('fontSizeOption', value);
	};

	const changeFontColorHandler = (selected: OptionType) => {
		changeFormState('fontColor', selected);
	};

	const changeBackgroundColorHandler = (selected: OptionType) => {
		changeFormState('backgroundColor', selected);
	};

	const changeFontSizeOption = (selected: OptionType) => {
		changeFormState('contentWidth', selected);
	};

	return (
		<>
			<ArrowButton onClick={openButtonClickHandler} isOpen={isOpen} />
			<aside
				ref={rootRef}
				className={clsx(styles.container, isOpen && styles.container_open)}>
				<form
					className={styles.form}
					onSubmit={handleSubmit}
					onReset={handleReset}>
					<Text size={31} weight={800} uppercase={true}>
						{'Задайте параметры'}
					</Text>
					<div className={styles.upperContainer}>
						<Select
							selected={formState.fontFamilyOption}
							options={fontFamilyOptions}
							onChange={changeFontFamilyHandler}
							title='Шрифт'
						/>
						<RadioGroup
							name='font-size-radio'
							options={fontSizeOptions}
							selected={formState.fontSizeOption}
							onChange={changeFontSizeHandler}
							title='Размер шрифта'
						/>
						<Select
							selected={formState.fontColor}
							options={fontColors}
							onChange={changeFontColorHandler}
							title='Цвет шрифта'
						/>
					</div>
					<Separator />
					<div className={styles.lowerContainer}>
						<Select
							selected={formState.backgroundColor}
							options={backgroundColors}
							onChange={changeBackgroundColorHandler}
							title='Цвет фона'
						/>
						<Select
							selected={formState.contentWidth}
							options={contentWidthArr}
							onChange={changeFontSizeOption}
							title='Ширина контента'
						/>
					</div>
					<div className={styles.bottomContainer}>
						<Button title='Сбросить' type='reset' />
						<Button title='Применить' type='submit' />
					</div>
				</form>
			</aside>
		</>
	);
};
