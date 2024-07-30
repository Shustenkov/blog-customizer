import { CSSProperties, useState } from "react";
import { ArticleStateType, defaultArticleState } from "src/constants/articleProps";

import styles from './App.module.scss'
import { ArticleParamsForm } from "src/components/article-params-form";
import { Article } from "src/components/article";

export const App = () => {
	const [articleState, setArticleState] = useState<ArticleStateType>(defaultArticleState);

	const applyArticleChanges = (newState: ArticleStateType) => {
		setArticleState(newState);
	}
	
	return (
		<main
			className={styles.main}
			style={
				{
					'--font-family': articleState.fontFamilyOption.value,
					'--font-size': articleState.fontSizeOption.value,
					'--font-color': articleState.fontColor.value,
					'--container-width': articleState.contentWidth.value,
					'--bg-color': articleState.backgroundColor.value,
				} as CSSProperties
			}>
			<ArticleParamsForm
				initialFormState={defaultArticleState}
				applyChangesCallback={applyArticleChanges}
			/>
			<Article />
		</main>
	);
};