import React , { useState } from 'react';

const TroChoiDoanSo = () => {
	const [randomNumber, setRandomNumber] = useState(Math.floor(Math.random() * 100) + 1);
	const [guess, setGuess] = useState('');
	const [message, setMessage] = useState('');
	const [attempt, setAttempt] = useState(0);
	const [gameOver, setGameOver] = useState(false);
	const [error, setError] = useState('');

	// Setting game và lỗi khi nhập số
	const handleGuess = () => {
		// Xử lý khi người dùng đoán số
		if (gameOver) return;
		const guessNumber = parseInt(guess, 10); //Cho phép người chơi có 10 lần dự đoán

		//Lỗi không nhận số khi người chơi nhập số không thuộc 1-100
		setError('Hãy nhập số từ 1 đến 100');
		if (isNaN(guessNumber) || guessNumber < 1 || guessNumber > 100) {
			return;
		}

		setError('');
		setAttempt(attempt + 1);

		//Hệ thống so sánh số người chơi đoán với số ngẫu nhiên
		if (guessNumber === randomNumber) {
			setGameOver(true);
			setMessage('Chúc mừng! Bạn đã đoán đúng!');
		} else if (guessNumber < randomNumber) {
			setMessage('Bạn đoán quá thấp!');
		} else {
			setMessage('Bạn đoán quá cao!');
		}
		//Thông báo khi người chơi hết lượt đoán
		if (attempt >= 9 && guessNumber !== randomNumber) {
			setGameOver(true);
			setMessage(`Bạn đã hết lượt! Số đúng là ${randomNumber}`);
		}
	};
	//Reset game khi người chơi muốn chơi lại
	const handleReset = () => {
		setRandomNumber(Math.floor(Math.random() * 100) + 1);
		setGuess('');
		setMessage('');
		setAttempt(0);
		setGameOver(false);
	};

	// Giao diện trò chơi
	return (
		<div className='p-6 bg-gray-100 min-h-screen'>
			<h1 className='text-3xl font-bold text-center'>Trò Chơi Đoán Số</h1>
			<div className='flex justify-center my-4'>
				<input
					type='number'
					value={guess}
					onChange={(e) => setGuess(e.target.value)}
					className='px-4 py-2 border rounded w-full mr-6px'
					placeholder='Nhập số bạn đoán'
					disabled={gameOver}
				/>
				<button
					onClick={handleGuess}
					className='ml-2 px-4 py-2 #FF0000 text-white rounded ml-6px'
					disabled={gameOver}
				>
					Đoán
				</button>
			</div>
			{error && <p className='text-red-500 text-center'>{error}</p>} {/*Thông báo lỗi khi nhập số*/}
			<div className='text-center'>
				<p>{message}</p>
				{gameOver && (
					<button onClick={handleReset} className='mt-4 px-4 py-2 bg-green-500 text-white rounded'>
						Chơi lại
					</button>
				)}
			</div>
			<div className='text-center mt-4'>
				<p>Lượt đoán: {attempt}/10</p>
			</div>
		</div>
	);
};

export default TroChoiDoanSo;