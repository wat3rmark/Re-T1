import styles from './App.module.css';
import { useState } from 'react';

function App() {
	const [value, setValue] = useState();
	const [list, setList] = useState([]);
	const [error, setError] = useState('');
	const [isValid, setIsValid] = useState(false);

	const onInputButtonClick = () => {
		const promptValue = prompt('Введите новое значение');

		if (promptValue && promptValue.length >= 3) {
			setValue(promptValue);
			setError('');
			setIsValid(true);
		} else {
			setError('Введенное значение должно содержать минимум 3 символа');
			setIsValid(false);
		}
	};

	const onAddButtonClick = () => {
		if (value.length >= 3) {
			setValue('');
			setError('');
			setIsValid(false);

			const date = new Date(Date.now());
			const dateText = `${date.getDate()}.${date.getMonth()}.${date.getFullYear()}`;
			const timeText = `${date.getHours()}.${date.getMinutes()}.${date.getSeconds()}`;

			console.log(dateText);

			setList([...list, { id: Date.now(), value: `${value} ${dateText} ${timeText}` }]);
		}
	};

	return (
		<div className={styles.app}>
			<h1 className={styles.pageHeading}>Ввод значения</h1>
			<p className={styles.noMarginText}>
				Текущее значение <code className={styles.currentValue}>value</code>: "
				<output className={styles.currentValue}>{value}</output>"
			</p>
			{error && <div className={styles.error}>{error}</div>}
			<div className={styles.buttonsContainer}>
				<button className={styles.button} onClick={onInputButtonClick}>
					Ввести новое
				</button>
				<button className={styles.button} onClick={onAddButtonClick} disabled={!isValid}>
					Добавить в список
				</button>
			</div>
			<div className={styles.listContainer}>
				<h2 className={styles.listHeading}>Список:</h2>
				<ul className={styles.list}>
					{list.length === 0 ? (
						<p className={styles.noMarginText} hidden={list.length > 0}>
							Нет добавленных элементов
						</p>
					) : (
						list.map((item) => (
							<li key={item.id} className={styles.listItem}>
								{item.value}
							</li>
						))
					)}
				</ul>
			</div>
		</div>
	);
}

export default App;
